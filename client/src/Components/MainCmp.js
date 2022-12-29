import React, { useEffect } from 'react';
import Menu from './MenuCmp';
import DishDetail from './DishDetailCmp';
import Header from './HeaderCmp';
import Footer from './FooterCmp';
import Home from './HomeCmp';
import Contact from './ContactCmp';
import About from './AboutCmp';
import { Redirect, Route, Switch, withRouter, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	postComment, fetchComments, deleteComment, updateComment,
	postFeedback, fetchFeedback,
	fetchPlates, postNewPlate, deletePlate, updatePlate,
	fetchStaff, 
	postLikeDish, deleteLikeDish, fetchWishList,
	handleLogin, handleLogout, handleSignup,
	uploadImage, deleteImage,
}
	from '../Redux/Actions';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Favorite from './FavoriteCmp';
import AdminCmp from './adminPanel/AdminCmp';
import { useHistory } from 'react-router';
import $ from 'jquery';

const mapStateToProps = state => {
	return {
		plates: state.plates,
		staff: state.staff,
		comments: state.comments,
		feedback: state.feedback,
		auth: state.auth,
		wishlist: state.wishlist
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchComments: (plateId) => { dispatch(fetchComments(plateId)) },
	postComment: (plateId, rating, message) => { dispatch(postComment(plateId, rating, message)) },
	deleteComment: (plateId, commentId) => { dispatch(deleteComment(plateId, commentId)) },
	updateComment: (plateId, commentId, data) => { dispatch(updateComment(plateId, commentId, data)) },

	postFeedback: (feedback) => { dispatch(postFeedback(feedback)) },
	fetchFeedback: () => { dispatch(fetchFeedback()) },
	resetFeedbackForm: () => { dispatch(actions.reset('feedbackx')) },

	fetchPlates: () => { dispatch(fetchPlates()) },
	postNewPlate: (plate) => {dispatch(postNewPlate(plate))},
	deletePlate: (plateId) => {dispatch(deletePlate(plateId))},
	updatePlate: (plateId, data) => {dispatch(updatePlate(plateId, data))},

	fetchStaff: () => { dispatch(fetchStaff()) },

	handleLogin: (creds) => { dispatch(handleLogin(creds)) },
	handleLogout: () => { dispatch(handleLogout()) },
	handleSignup: (newUser) => { dispatch(handleSignup(newUser))},

	fetchWishList: () => { dispatch(fetchWishList()) },
	postLikeDish: (plateId) => { dispatch(postLikeDish(plateId)) },
	deleteLikeDish: (plateId) => { dispatch(deleteLikeDish(plateId))},

	uploadImage: (image) => {dispatch(uploadImage(image))},
	deleteImage: (image) => {dispatch(deleteImage(image))}
});


function Main(props) {
	const history = useHistory();
	const location = useLocation();
	var plateId = location.pathname.split('/')[2];

	/* eslint-disable */
	useEffect(() => {
		props.fetchPlates();
		props.fetchFeedback();
		props.fetchStaff();
		
		// fetch wish list only when the user logged in
		props.auth.isAuthenticated ? props.fetchWishList() : null;
		// props.handleLogin({"username": "anis", "password": "pass"});
	}, []);

	// fetch comments only when the user access to dish detail exp /menu/543456d54df5f53f45dddf5
	useEffect(() => {
		if (plateId !== undefined) {
			props.fetchComments(plateId);
		} else {
			return null
		}
	}, [plateId]);

	// if admin is logged in redirect to /admin route
	useEffect(() => {
		if(props.auth.user && props.auth.user.admin)
			history.push("/admin");
		else
			history.push(location.pathname);
	}, [props.auth]);

	// Hide welcome back user Alert message after 5 seconds
	useEffect(() => {
		$(document).ready(function () {
			$("#success-alert").hide();
			$("#success-alert").fadeTo(5000, 500).slideUp(500, function () {
				$("#success-alert").slideUp(500);
			});
		});
	}, [props.auth.isAuthenticated])
	/* eslint-disable */

	const plateInfo = ({ match }) => {
		return (
			<DishDetail plate={props.plates.plates.filter((item) => item._id === match.params.plateId)[0]}
				isLoading={props.plates.loading}
				isFailed={props.plates.errMsg}

				postLikeDish={props.postLikeDish}
				deleteFav={props.deleteLikeDish}

				authCheck={props.auth}

				comments={props.comments.comments}
				commentsLoading={props.comments.loading}
				commentsFailed={props.comments.errMsg}
				postComment={props.postComment}
				deleteComment={props.deleteComment}
				updateComment={props.updateComment}

				favFound={
					props.auth.isAuthenticated && props.wishlist.wishlist !== null && props.wishlist.wishlist.likeDish !== undefined ?
						props.wishlist.wishlist.likeDish.some((plate) => plate._id === match.params.plateId)
					:
						false
				}
			/>
		)
	}
	return (

			location.pathname !== "/admin"  ?

			<>
				{
					props.auth.isAuthenticated ?
						<div id="success-alert" className="alert alert-success text-center mb-0">
							<strong>Success!</strong> Welcome back <b>{props.auth.user.firstname + " " + props.auth.user.lastname}</b>
						</div>
					:
						null
				}
				<Header authCheck={props.auth} loginUser={props.handleLogin} logoutUser={props.handleLogout} signupUser={props.handleSignup} />

				<div className="container">
					<TransitionGroup>
						<CSSTransition key={props.location.key} timeout={300} classNames="page">
							<Switch>
								<Route path="/home"
									component={() =>
										<Home
											plates={props.plates.plates.filter((item) => item.featured)}
											platesLoading={props.plates.loading}
											platesFailed={props.plates.errMsg}

											staff={props.staff.staff.filter((item) => item.featured)}
											staffLoading={props.staff.loading}
											staffFailed={props.staff.errMsg}
										/>
									}
								/>
								<Route exact path="/menu" component={() =>
									<Menu
										plates={props.plates.plates}
										isLoading={props.plates.loading}
										isFailed={props.plates.errMsg}
										deleteFav={props.deleteLikeDish}
										postLikeDish={props.postLikeDish}
										authCheck={props.auth}
										success={props.wishlist.success}

										favFound={
											props.auth.isAuthenticated && props.wishlist.wishlist !== null && props.wishlist.wishlist.likeDish !== undefined ?

												props.wishlist.wishlist.likeDish
												:
												false
										}
									/>
								}/>
								<Route exact path="/menu/:plateId" component={plateInfo} />
								<Route path="/contact" component={() => <Contact resetForm={props.resetFeedbackForm} postFeedback={props.postFeedback} feedback={props.feedback.feedback} isLoading={props.feedback.loading} isFailed={props.feedback.errMsg} authCheck={props.auth} />} />
								<Route path="/about" component={() => <About staff={props.staff.staff} isLoading={props.staff.loading} isFailed={props.staff.errMsg}/>} />
								<Route path="/mywishlist" component={() => <Favorite wishlist={props.wishlist.wishlist} isLoading={props.wishlist.loading} isFailed={props.wishlist.errMsg} deleteFav={props.deleteLikeDish} />} />
								<Redirect to="/home" />
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</div>

				<Footer />
			</>
		:
			<Switch>
				<Route path={props.auth.user && props.auth.user.admin ? "/admin" : "/home"}
					component={() => 
						<AdminCmp 
							postNewPlate={props.postNewPlate}
							logoutUser={props.handleLogout} 
							uploadImage={props.uploadImage}
							deleteImage={props.deleteImage}
							plates={props.plates.plates}
							isLoading={props.plates.loading}
							isFailed={props.plates.errMsg}
							deletePlate={props.deletePlate}
							updatePlate={props.updatePlate}
						/>
					}
				/>
			</Switch>
	);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));