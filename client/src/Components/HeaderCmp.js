import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import '../App.css';
import '../Hooks/MyScripts';
import SlideShow from '../Presenting_Content/Carousel';
import Login from './LoginFormCmp';
import Signup from './signupFormCmp';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { LoadingOverlay } from './LoadingCmp';

class Header extends Component {

	constructor(props) {
		super(props)

		this.state = {
			isNavOpen: false,
			isSignupOpen: false,
			isSignInOpen: false,
			showAlert: true
		}
		this.toggleNav = this.toggleNav.bind(this);
		this.toggleSignUp = this.toggleSignUp.bind(this);
		this.toggleSignIn = this.toggleSignIn.bind(this);
	}

	toggleNav() {
		this.setState({
			isNavOpen: !this.state.isNavOpen
		})
	}
	toggleSignIn() {
		this.setState({
			isSignInOpen: !this.state.isSignInOpen
		});
	};
	toggleSignUp() {
		this.setState({
			isSignupOpen: !this.state.isSignupOpen
		})
	}

	handleLogout = () => {

		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						<h3>Are you sure?</h3>
						<p>You want to logout?</p>
						<button onClick={onClose}>No, Cancel</button>
						<button
							onClick={() => {
								this.props.logoutUser();
								onClose();
							}}
						>
							Yes, Logout!
						</button>
					</div>
				);
			}
		});
	};

	render() {
		return (
			<React.Fragment>
				{
					this.props.authCheck.isLoading ?
						<LoadingOverlay />
					:
						null
				}

				<Navbar id="navArea" light expand="md">
					<NavbarBrand className="logo" href="/"><img src="../assets/images/logo.png" alt="Restaurant Logo" /></NavbarBrand>
					<Nav id="avatar-user" className="login-btn-nav d-block d-md-none" navbar>
						{
							this.props.authCheck.isAuthenticated ?
							<div className="nav-item avatar-mobile dropdown">
								<button data-toggle="dropdown" className="nav-link" style={{ color: "white" }}>
									<img src="/assets/feedback_images/(10).jpg" className="rounded-circle avatar" width="50px" height="50px" alt="Avatar" />
									{" "} {this.props.authCheck.user.username}
								</button>
								<div className="dropdown-menu ml-n5">
									<h6 className="dropdown-item"> {this.props.authCheck.user.firstname + " " + this.props.authCheck.user.lastname}  </h6>
									<button className="dropdown-item"><i className="fa fa-user-o"></i> Profile</button>
									<div className="dropdown-divider"></div>
									<button onClick={this.handleLogout} className="dropdown-item">
										{
											this.props.authCheck.isLoading ?
												<span className="fa fa-spinner fa-pulse fa-fw mr-1"></span>
												:
												<i className="fa fa-power-off mr-1"></i>
										}
										Logout
									</button>
								</div>
							</div>
						:
							null
						}
					</Nav>
					<NavbarToggler onClick={this.toggleNav} className="bg-primary" />
					
					<Collapse isOpen={this.state.isNavOpen} navbar>
						<Nav className="mx-auto" navbar>
							<NavItem className="btn-outline-success rounded" onClick={this.toggleNav} >
								<Link to="/home" className="nav-link"><span className="fa fa-home"></span> Home</Link>
							</NavItem>
							<NavItem className="btn-outline-success rounded" onClick={this.toggleNav}>
								<Link to="/about" className="nav-link"><span className="fa fa-info"></span> About</Link>
							</NavItem>
							<NavItem className="btn-outline-success rounded" onClick={this.toggleNav}>
								<Link to="/menu" className="nav-link"><span className="fa fa-list"></span> Menu</Link>
							</NavItem>
							<NavItem className="btn-outline-success rounded" onClick={this.toggleNav}>
								<Link to="/contact" className="nav-link"><span className="fa fa-envelope"></span> Contact</Link>
							</NavItem>
							<NavItem className="btn-outline-success rounded" onClick={this.toggleNav}>
								<Link to={this.props.authCheck.isAuthenticated ? "/mywishlist" : "/"} className={this.props.authCheck.isAuthenticated ? "nav-link" : "nav-link"} onClick={this.props.authCheck.isAuthenticated ? null : this.toggleSignIn} ><span className="fa fa-bookmark"></span> Wish List</Link>
							</NavItem>
						</Nav>
						<Nav id="avatar-user" className="login-btn-nav" navbar>
							{
								!this.props.authCheck.isAuthenticated ?
									<>
										<NavItem className="mr-2 order-12 order-md-1" onClick={this.toggleNav}>
											<Button className="d-none d-md-block" id="login-btn" outline color="success" onClick={this.toggleSignUp}>
												<span className="fa fa-chevron-up fa-lg"> Signup </span>
											</Button>
											<Link onClick={this.toggleSignUp} className="nav-link d-block d-md-none ml-0 py-1"><span className="fa fa-chevron-up fa-lg"></span> SignUp</Link>
										</NavItem>
										<NavItem className="order-1 order-md-12" onClick={this.toggleNav}>
											<Button className="d-none d-md-block" id="login-btn" outline color="primary" onClick={this.toggleSignIn}>
												{
													this.props.authCheck.isLoading ?
														<span className="fa fa-spinner fa-pulse fa-fw"></span>
														:
														<span className="fa fa-sign-in fa-lg"> SignIn </span>
												}
											</Button>
											<Link onClick={this.toggleSignIn} className="nav-link d-block d-md-none ml-0"><span className="fa fa-sign-in fa-lg"></span> SignIn</Link>
										</NavItem>
									</>
								:
									<div className="nav-item dropdown d-none d-md-block">
										<button data-toggle="dropdown" className="nav-link" style={{ color: "white" }}>
											<img src="/assets/feedback_images/(10).jpg" className="rounded-circle avatar" width="50px" height="50px" alt="Avatar" />
											{" "} {this.props.authCheck.user.username}
										</button>
										<div className="dropdown-menu ml-n5">
											<h6 className="dropdown-item"> {this.props.authCheck.user.firstname + " " + this.props.authCheck.user.lastname}  </h6>
											<button className="dropdown-item"><i className="fa fa-user-o"></i> Profile</button>
											<div className="dropdown-divider"></div>
											<button onClick={this.handleLogout} className="dropdown-item">
												{
													this.props.authCheck.isLoading ?
														<span className="fa fa-spinner fa-pulse fa-fw mr-1"></span>
														:
														<i className="fa fa-power-off mr-1"></i>
												}
												Logout
											</button>
										</div>
									</div>
							}
						</Nav>
					</Collapse>
				</Navbar>

				<div className="container-fluid pl-0 pr-0" style={{ paddingTop: "0px" }}>
					<SlideShow />
				</div>
				
				<Login isSignInOpen={this.state.isSignInOpen} toggleSignIn={this.toggleSignIn} login={this.props.loginUser} authCheck={this.props.authCheck} toggleSignUp={this.toggleSignUp} />
				<Signup isSignupOpen={this.state.isSignupOpen} toggleSignUp={this.toggleSignUp} signup={this.props.signupUser} />
			</React.Fragment>
		)
	}
}

export default Header;