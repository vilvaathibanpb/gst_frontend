import React from "react";
import ReactDOM from "react-dom";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem  from 'react-bootstrap/lib/MenuItem';
import NavbarToggle  from 'react-bootstrap/lib/NavbarToggle';
import NavbarCollapse  from 'react-bootstrap/lib/NavbarCollapse';
import NavbarBrand  from 'react-bootstrap/lib/NavbarBrand';
import { Router, Route, Link, IndexRoute, hashHistory } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';

//Components

export default class HomeNavBar extends React.Component {
  render() {
    return (
		<Navbar inverse collapseOnSelect style={{marginBottom : '0px' , border : '0px' , borderRadius: '0px'}} className="nav-bg">
			<Navbar.Header>
				<Navbar.Brand>
		 			<a href="https://www.dockettech.com/" className="logo-mobile"><img src="assets/img/logo.png" style={{position: 'absolute', top: '-9%', left: '5%', height: 133, padding: 11 , zIndex : 100}} /></a>					
				</Navbar.Brand>
				 <Navbar.Toggle /> 
			</Navbar.Header>
			 <Navbar.Collapse> 
				<Nav pullRight className="nav-color">
					<NavItem eventKey={1} href="#"><span className="nav-color">Home</span></NavItem>
					<NavItem eventKey={2} href="#"><span className="nav-color">About GST</span></NavItem>
					<NavItem eventKey={3} href="#"><span className="nav-color">Contact Us</span></NavItem>
					<NavItem eventKey={4} href="#"><span className="nav-color">Login</span></NavItem>
				</Nav>
			 </Navbar.Collapse> 
		</Navbar>
    );
  }
}
