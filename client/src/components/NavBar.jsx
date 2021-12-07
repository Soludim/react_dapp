import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './home/images/logo_white.png';

const NavBar = ({ home }) => {
    return (
        <div>
            {!home ?
                (<div><Navbar bg="dark" variant="dark" expand="lg" style={{ position: 'absolute', zIndex: 20, width: '100%' }}>
                    <Navbar.Brand>
                        <NavLink className="nav-item nav-link" to="/">
                            <img
                                src={logo}
                                width="50"
                                height="50"
                                className="d-inline-block align-top"
                                alt="Soludim"
                            />
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="nav-item nav-link" to="/songs" style={{fontWeight: 'bold'}}>Songs</NavLink>
                            <NavLink className="nav-item nav-link" to="/uploadSong" style={{fontWeight: 'bold'}}>Upload Song</NavLink>
                            <NavLink className="nav-item nav-link" to="/transactions" style={{fontWeight: 'bold'}}>My Transactions</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar><br/></div>)
                :
                (<Navbar expand="lg" variant="dark" style={{ position: 'absolute', top: 0, zIndex: 20, width: '100%', background: 'transparent', color: 'white', fontWeight: 'bold' }}>
                     <NavLink className="nav-item nav-link" to="/">
                            <img
                                src={logo}
                                width="70"
                                height="70"
                                className="d-inline-block align-top"
                                alt="Soludim"
                            />
                        </NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink className="nav-item nav-link" to="/songs" style={{fontWeight: 'bold'}}>Songs</NavLink>
                            <NavLink className="nav-item nav-link" to="/uploadSong" style={{fontWeight: 'bold'}}>Upload Song</NavLink>
                            <NavLink className="nav-item nav-link" to="/transactions" style={{fontWeight: 'bold'}}>My Transactions</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>)
            }

        </div>
    );
}

export default NavBar;