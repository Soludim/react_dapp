import React, { Component } from 'react';
import '../index.css';
import { setup } from '../setup';
import { getGenre } from '../services/genre';
import NavBar from './NavBar';
import { ProgressBar } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const basePrice = 10 ** 10;
class AddSongForm extends Component {

    state = {
        web3: null, address: '', value: '', accounts: [], contract: null, genres: [],
        title: '', artist: '', price: 0, priceInDollar: 0, genre: 1, uploading: false,
        file: null, uploadProgress: 0, waiting: false
    }

    componentWillMount = async () => {
        const { web3, accounts, instance } = await setup();
        const genres = [{ id: "", name: "Other" }, ...getGenre()];
        const address = accounts[0];
        this.setState({ web3, accounts, contract: instance, genres, address });
    }

    handleValueChange = ({ currentTarget: input }) => {
        switch (input.id) {
            case "songTitle":
                this.setState({ title: input.value });
                break;
            case "songArtist":
                this.setState({ artist: input.value });
                break;
            case "songPrice":
                this.setState({ price: input.value });
                let priceInDollar = input.value * 219.25;
                this.setState({ priceInDollar });
                break;
            case "songGenre":
                this.setState({ genre: input.value });
                break;
            case "address":
                this.setState({ address: input.value });
                break;
            default: ;
        }

    }
    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0];
        this.setState({ file });
    };

    uploadFile = () => {
        let xhr = new XMLHttpRequest();
        let fd = new FormData();
        fd.append('file', this.state.file);

        let that = this;
        const { title, artist, price, genre, address, contract } = this.state;
        xhr.upload.onprogress = function (e) {
            const uploadProgress = e.loaded * 100 / e.total;
            that.setState({ uploadProgress });
        };

        xhr.upload.onerror = function (e) {
            that.setState({ uploading: false });
            alert("An error occured while uploading file");
        }

        xhr.responseType = 'json';


        xhr.open('POST', 'https://ipfs.infura.io:5001/api/v0/add?pin=false', true);
        xhr.send(fd);
        xhr.onload = function () {

            that.setState({ waiting: true });
            let responseObj = xhr.response;
            if (responseObj.Hash) {
                let today = new Date();
                const date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();

                contract.methods.addSong(title, price * basePrice, date, responseObj.Hash, artist, genre)
                    .send({ from: address }).once('transactionHash', (hash) => {
                        that.setState({ uploading: false });
                        that.setState({ waiting: false });
                        that.props.history.replace({
                            pathname: '/songs',
                            state: { add: true }
                        });

                    }).on('error', (error) => {
                        toast.info('Adding song was unsuccessful');
                        console.log(error)
                        that.setState({ waiting: false });
                        that.setState({ uploading: false });
                    });
            }
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ uploading: true });
        this.uploadFile();
    }

    render() {
        if (!this.state.web3) {
            return (
                <div className="loading">Loading&#8230;</div>
            );
        }

        const { genres, title, artist, price, genre, address, uploading, priceInDollar, uploadProgress } = this.state;
        return (
            <React.Fragment>
                <ToastContainer />
                <NavBar home={false} />
                <br /><br /><br />
                <h2>Upload your song</h2>
                <br />
                {this.state.waiting ?
                    <div className="loading">Loading&#8230;</div> : null
                }
                <form className="container" onSubmit={this.handleSubmit} autoComplete="off">
                    <div className="form-border">
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" onChange={this.handleValueChange} className="form-control" id="address" value={address} readOnly />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <label htmlFor="songTitle">Title</label>
                            </div>
                            <div className="col-sm-6">
                                <input onChange={this.handleValueChange} value={title} type="text" required className="form-control" id="songTitle" placeholder="Song title..." />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <label htmlFor="songArtist">Artist</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" onChange={this.handleValueChange} value={artist} required className="form-control" id="songArtist" placeholder="Song artist..." />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <label htmlFor="songPrice">Price</label>
                            </div>
                            <div className="col-sm-3 input-group">
                                <input type="number" step="0.1" min="0" onChange={this.handleValueChange} value={price} required className="form-control" id="songPrice" />
                                <div className="input-group-append">
                                    <span className="input-group-text">Eth</span>
                                </div>
                            </div>
                            <div className="col-sm-3 input-group">
                                <input type="number" onChange={this.handleValueChange} disabled value={priceInDollar} required className="form-control" id="songPriceInDollar" />
                                <div className="input-group-append">
                                    <span className="input-group-text">US $</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <label htmlFor="songGenre">Genre</label>
                            </div>
                            <div className="col-sm-6">
                                <select className="form-control" id="songGenre" onChange={this.handleValueChange} value={genre}>
                                    {genres.map(genre =>
                                        <option key={genres.indexOf(genre)} value={genres.indexOf(genre)}>{genre.name}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-2">
                                <label htmlFor="songfile">Song</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="file" onChange={this.captureFile} required
                                    ref={ref => this.fileInput = ref} className="form-control-file"
                                    id="songfile" placeholder="Upload song here..." accept="audio/*" />
                            </div>
                        </div>
                        {uploading ? (
                            <div>
                                <div className="putCenter">
                                    <ProgressBar now={Math.ceil(uploadProgress)} label={`${Math.ceil(uploadProgress)}%`} />
                                    <p>Uploading File, please wait...</p>
                                </div>
                            </div>
                        ) : <button type="submit" className="btn btn-primary">Submit</button>}
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

export default AddSongForm;