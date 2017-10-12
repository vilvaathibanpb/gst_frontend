import React from "react";
import ReactDOM from "react-dom";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import Button from 'react-bootstrap/lib/Button';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavbarToggle from 'react-bootstrap/lib/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/lib/NavbarCollapse';
import { NavbarBrand, ButtonToolbar, DropdownButton } from 'react-bootstrap/lib/';
import { Link, Router, Route, Switch } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { history } from '../../_helpers';

//Components

let userItem, userItemResult;
export default class HomeNavBar extends React.Component {
	constructor(props) {
		super(props);
		if (localStorage.getItem('user')) {
			userItem = JSON.parse(localStorage.getItem('user'));
			userItemResult = userItem["result"];
		}
		this.logout = this.logout.bind(this);
	}
	logout(){
		localStorage.removeItem("user");
		history.push('/');
	}
	render() {
		return (
			<Navbar inverse collapseOnSelect style={{ marginBottom: '0px', border: '0px', borderRadius: '0px' }} className="nav-bg">
				<Navbar.Header>
					<Navbar.Brand>
						<a href="https://www.dockettech.com/" className="logo-mobile"><img src="assets/img/logo.png" style={{ position: 'absolute', top: '-9%', left: '5%', height: 133, padding: 11, zIndex: 100 }} /></a>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight className="nav-color">
						<NavItem eventKey={1} href="#"><span className="nav-color">Home</span></NavItem>
						<NavItem eventKey={2} href="#"><span className="nav-color">About GST</span></NavItem>
						<NavItem eventKey={3} href="#"><span className="nav-color">Contact Us</span></NavItem>
						<NavItem eventKey={4} href="#">
							<Router history={history}>
								<Switch>
									{!localStorage.getItem('user') &&
										<Route>
											<LinkContainer to="/login"><span className="nav-color">Login</span></LinkContainer>
										</Route>
									}

									{localStorage.getItem('user') &&
										<Route>
											{/* <ButtonToolbar>
												<DropdownButton bsSize="large" title={userItemResult.hasOwnProperty("name") ? userItemResult['name']:''} id="dropdown-size-large">
													<MenuItem onClick={this.logout} eventKey="1">Logout</MenuItem>
												</DropdownButton>
											</ButtonToolbar> */}
											<LinkContainer onClick={this.logout} to="/" ><span className="nav-color">Logout</span></LinkContainer>
										</Route>
									}
								</Switch>
							</Router>
						</NavItem>
					</Nav>

				</Navbar.Collapse>
			</Navbar>
		);
	}
}
