import React, { Component } from 'react';
import Genre from "./common/genre";
import Pagination from './common/paginate';
import { paginate } from '../utils/paginate.js';
import { setup } from '../setup';
import web3Utils from 'web3-utils';
import Buy from './common/buysong';
import DownloadModal from './common/modal';
import { download } from '../download';
import SearchBox from './common/SearchBox';
import NavBar from './NavBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const basePrice = 10 ** 10;
class ListSong extends Component {

  state = {
    web3: null, value: '', accounts: [], contract: null, pageSize: 10, currentPage: 1,
    selectedGenre: null, genres: [], songs: [], showDownloadModal: false, selectedSong: null,
    searchQuery: '', addedSuccess: false
  };


  componentDidMount = async () => {
    const { web3, accounts, instance, genres } = await setup();

    this.setState({ web3, accounts, contract: instance, genres });

    const { location } = this.props;
    if (location.state) {
      if (location.state.add) {
        const stateCopy = { ...location.state };
        delete stateCopy.add;
        this.props.history.replace({ state: stateCopy });
        this.setState({ addedSuccess: true });
      }
    }
    this.state.contract.methods.getSongs().call()
      .then(result => {
        this.setState({ songs: result });
      }).catch(error => {
        console.log(error);
      });
  };


  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  }

  handleDownload = (song) => {
    this.setState({ selectedSong: song });
    this.setState({ showDownloadModal: true })
  }

  handleDownloadModalClose = () => {
    this.setState({ showDownloadModal: false });
  }

  handleDownloadModalContinue = () => {
    this.setState({ showDownloadModal: false });
    const { contract, selectedSong, accounts } = this.state;
    const val = web3Utils.toWei((selectedSong.Price.toNumber() / basePrice).toString());

    let today = new Date();
    const downloadDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate();
console.log()
    contract.methods.downloadSong(selectedSong, downloadDate).send({ from: accounts[0], value: val })
      .once('transactionHash', (hash) => {
        download("https://ipfs.infura.io/ipfs/" + selectedSong.ImageUrl, selectedSong.Title + " by " + selectedSong.SongArtist + ".mp3");
      }).on('error', (error) => {
        alert(error);
      });
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getData = () => {
    const { songs: allSongs, selectedGenre, pageSize, currentPage, searchQuery } = this.state;

    let filtered = allSongs;
    if (allSongs == null) {
      const totalCount = 0;
      return { totalCount, songs: [] }
    }
    if (this.state.searchQuery)
      filtered = allSongs.filter(m =>
        m.Title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allSongs.filter(m => m.genreId.toNumber() === selectedGenre._id);

    const data = paginate(filtered, currentPage, pageSize);
    const totalCount = filtered ? filtered.length : 0;

    return { totalCount, songs: data };
  }

  add = () => {
    this.setState({ addedSuccess: false });
    toast.info('Song will be added after it is mined.');
  }

  render() {
    if (!this.state.web3) {
      return (
        <div>
          <div className="loading">Loading&#8230;</div>
        </div>
      );
    }

    const { totalCount, songs } = this.getData();
    const { genres, showDownloadModal, selectedSong, searchQuery, addedSuccess } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar home={false} />
        <br /><br /><br />
        <div className="row my-2" style={{ marginLeft: '0px', marginRight: '0px' }}>
          {showDownloadModal ? <DownloadModal
            open={showDownloadModal}
            onModalClose={this.handleDownloadModalClose}
            onModalContinue={this.handleDownloadModalContinue}
            song={selectedSong} /> : null}
          {addedSuccess ? this.add() : null}

          <div className="col-sm-2 mx-2">
            <Genre
              items={this.state.genres}
              selectedGenre={this.state.selectedGenre}
              onGenreChange={this.handleGenreSelect}
            />
          </div>
          <div className="col-sm-8">
            <p>There are {totalCount} songs available</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Genre</th>
                  <th>Price(ETH)</th>
                  <th>Date Uploaded</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {songs.map(song =>
                  <tr key={songs.indexOf(song)}>
                    <td>{song.Title}</td>
                    <td>{song.SongArtist}</td>
                    {!genres.find(m => m._id === song.genreId.toNumber()) ?
                      <td>Other</td> :
                      <td>{(genres.find(m => m._id === song.genreId.toNumber())).name}</td>}
                    <td>{song.Price.toNumber() === 0 ? 'Free' : song.Price.toNumber() / basePrice}</td>
                    <td>{song.Date}</td>
                    <td><Buy song={song} onDownload={this.handleDownload} /></td>
                  </tr>)}
              </tbody>
            </table>
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

}

export default ListSong;