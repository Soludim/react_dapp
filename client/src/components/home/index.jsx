import React, { Component } from 'react';
import NavBar from '../NavBar';
import b from './images/slider2.jpg';
import d from './images/logo_white.png';

import e from './images/speed.jpeg';
import f from './images/reliability.jpg';
import h from './images/safer.jpg';
import i from './images/trinity_logo.jpg';
import j from './images/maxim.png';


class Index extends Component {
    state = {}
    
    style = {
        height: "600px",
        width: "100%"
    }

    captionStyle = {
        position: 'absolute',
        bottom: '8px',
        left: '35%'
    }
    sponserStyle = {
        height: "120px",
        width: "200px",
        marginLeft: "20px",
        alignContent: "center"

    }

    con = {
        position: 'relative',
        textAlign: 'center',
        color: 'white'
    }

    render() {
        return (
            <React.Fragment>
                <NavBar home={true} />
                <div style={this.con}>
                    <img
                        style={this.style}
                        className="d-block w-100"
                        src={b}
                        alt="home"
                    />
                    <div style={this.captionStyle}>
                       <h3> Get All Your Musics Here</h3>
                            <p>Search for your favourite music here and download it offline</p>
                    </div>
                </div>

                <div className="intro-block">
                    <div className="container">
                        <div className="row" style={{postion: 'relative'}}>
                            <div className="col-lg-4">
                                <img className="image-responsive tpad" src={d} alt="Soludim" />
                            </div>
                            <div className="col-lg-8 lead" style={{margin: 'auto' ,postion: 'absolute'}}>
                                <p>
                                    Soludim is a decentralized app designed to help people download musics. Users can also upload their musics and get money(ether) when people download them.</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container padded">
                    <div className="row">
                        <div className="col-lg-12"><h2>THREE MODES</h2><hr /></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-4">
                            <img className="rounded-circle image-responsive" alt="Speed" src={e} height="200" width="200" />
                            <h3>Speed</h3>
                            <p>Get your favorite songs in a more faster and easy way, upload musics and get money(ether)  faster also.</p>
                        </div>
                        <div className="col-sm-6 col-md-4">
                            <img className="rounded-circle image-responsive" alt="Reliability" src={f} height="200" width="200" />
                            <h3>Reliability</h3>
                            <p>Soludim being a decentralized application which is running on multiple nodes makes it immmue to single points of value.</p>
                        </div>
                        <div className="clearfix hidden-md hidden-lg"></div>
                        <div className="col-sm-6 col-md-4">
                            <img className="rounded-circle image-responsive" alt="Safety" src={h} height="200" width="200" />
                            <h3>Security</h3>
                            <p>Soludim lacking centralization makes it more resilient, autonomous, and secure than traditional applications.</p>
                        </div>
                    </div>
                </div>


                <div className="ftr">
                    <div className="container">
                        <footer>
                            <hr />
                            <h2 style={{ alignContent: 'center' }}>Sponsers</h2>
                            <div>
                                <a href="https://trinitysoftwarecenter.com" title="Visit Trinity Software Center" rel="noopener noreferrer" target="_blank" style={{ marginRight: 100 }} >
                                    <img style={this.sponserStyle} className="image-responsive" src={i} alt="trinity software center" />
                                </a>
                                <a href="https://www.maximnyansa.com" title="Visit Maxim Nyansa IT Solution" rel="noopener noreferrer" target="_blank" style={{ marginLeft: 30 }}>
                                    <img style={this.sponserStyle} className="image-responsive" src={j} alt="trinity software center" />
                                </a>
                            </div>
                        </footer>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Index;