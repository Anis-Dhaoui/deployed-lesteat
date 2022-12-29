import React, { useEffect, useState } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, CardImgOverlay
} from 'reactstrap';
import CommentForm from './CommentCmp';
import { Loading } from './LoadingCmp';
import { url } from '../shared_data/Url';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { required, minMaxLength } from './ContactCmp';
import $ from 'jquery';

function DishDetail(props) {

    // Edit button clicked or not if yes the editMode state will take the id of the comment
    const [editMode, setEditMode] = useState("");

    // Check if the edit comment form fields has changed or not
    useEffect(() => {
        $("#updated-comment-form :input").on("change", function () {
            $("#updated-comment-form").data("changed", true);
        });
    });
    //if form there is change, send the updated comment values to the server otherwise DON'T bother him 
    const handleClickDone = (commentId, e) => {
        let data = { rating: e.updatedRate, comment: e.updatedComment };
        if ($("#updated-comment-form").data("changed")) {
            // console.log("plateId: ", props.plate._id + " commentId: ", commentId + " data: ", data);
            props.updateComment(props.plate._id, commentId, data);
        } else
            console.log("Nothing was edited in the form fields, I'm not gonna bother the server");
        setEditMode("");
    }
    // auto height for textarea
    const autoHeight = (element) => {
        element.target.style.overflow = "visible";
        element.target.style.height = (element.target.scrollHeight) + "px";
    };

    const renderDish = (dish) => {
        if (props.isLoading) {
            return <Loading />
        } else
            if (props.isFailed !== null) {
                return (
                    <h3 className="text-danger text-center"> {props.isFailed} </h3>
                )
            } else
                if (dish != null) {

                    return (
                        <Card id="dish-detail">
                            <CardImg width="100%" height="500px" src={url + dish.image} alt={dish.name} />
                            <CardImgOverlay id="fav-heart-btn-menu">
                                {
                                    props.authCheck.isAuthenticated ?
                                        props.favFound ?
                                            <span onClick={() => props.deleteFav(dish._id)} style={{ zIndex: "0" }} color="primary" className="fa fa-3x fa-heart d-flex justify-content-end"></span>
                                            :
                                            <span onClick={() => props.postLikeDish(dish._id)} style={{ zIndex: "0" }} className="fa fa-3x fa-heart-o d-flex justify-content-end"></span>
                                        :
                                        null
                                }
                            </CardImgOverlay>
                            <CardBody>
                                <CardTitle tag="h5">{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    );
                }
    };

    const handleDeleteComment = (plateId, commentId) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui'>
                        <h3>Are you sure?</h3>
                        <p className="text-danger">You want to delete this comment?</p>
                        <button onClick={onClose}>No, Cancel</button>
                        <button className="text-danger"
                            onClick={() => {
                                props.deleteComment(plateId, commentId);
                                onClose();
                            }}
                        >
                            Yes, Delete!
                        </button>
                    </div>
                );
            }
        });
    }
    const renderComments = (comments, isLoading, isFailed) => {
        if (isLoading) {
            return <Loading />
        } else
            if (isFailed !== null) {
                return (
                    <h3 className="text-danger text-center"> {isFailed} </h3>
                )
            } else {
                return (
                    comments.map((cmnt) => {

                        let splittedDate = cmnt.updatedAt.split("-");
                        let finalDate = new Date(splittedDate[0], splittedDate[1] - 1, splittedDate[2].slice(0, 2)).toDateString();
                        return (
                            <div key={cmnt._id}>
                                {
                                    editMode === cmnt._id ?
                                        // if update button clicked then render the "editing form" of that specific comment
                                        <LocalForm id="updated-comment-form" onSubmit={(e) => handleClickDone(cmnt._id, e)}>
                                            <ListGroup key={cmnt._id} className="mb-2">
                                                <ListGroupItem style={{ backgroundColor: "gray" }}>
                                                    <div className="rating">
                                                        {/* eslint-disable */}
                                                        <Control.radio defaultValue={cmnt.rating && cmnt.rating.toString()} model=".updatedRate" className="form-control" name="updateRating" value="5" id="update5" /><label htmlFor="update5">☆</label>
                                                        <Control.radio model=".updatedRate" className="form-control" name="updateRating" value="4" id="update4" /><label htmlFor="update4">☆</label>
                                                        <Control.radio model=".updatedRate" className="form-control" name="updateRating" value="3" id="update3" /><label htmlFor="update3">☆</label>
                                                        <Control.radio model=".updatedRate" className="form-control" name="updateRating" value="2" id="update2" /><label htmlFor="update2">☆</label>
                                                        <Control.radio model=".updatedRate" className="form-control" name="updateRating" value="1" id="update1" /><label htmlFor="update1">☆</label>
                                                        {/* eslint-disable */}
                                                    </div>
                                                </ListGroupItem>

                                                <Control.textarea model=".updatedComment" className="form-control" name="updatedComment" id="updatedComment"
                                                    validators={{ required, minMaxLength: minMaxLength(4, 500) }}
                                                    defaultValue={cmnt.comment}
                                                    autoFocus
                                                    onInput={e => autoHeight(e)}
                                                />
                                                <Errors className="text-danger" model=".comment" show="touched"
                                                    messages={{
                                                        required: "Required field",
                                                        minMaxLength: "Comment lenght should be between 4-200"
                                                    }}
                                                />
                                                <ListGroupItem className="ml-auto p-0">
                                                    <div className="btn-group" role="group" aria-label="Basic example">
                                                        <button type="submit" style={{ marginRight: "2px" }} className="btn btn-success">Done</button>
                                                        <button onClick={() => setEditMode("")} type="button" className="btn btn-danger">Cancel</button>
                                                    </div>
                                                </ListGroupItem>
                                            </ListGroup>
                                        </LocalForm>

                                        :

                                        // else render comments as usual
                                        <ListGroup className="mb-2">
                                            <ListGroupItem className="" style={{ backgroundColor: "gray" }}>
                                                <ListGroupItemHeading className="" >
                                                    {cmnt.author.firstname} {cmnt.author.lastname}
                                                    <LocalForm className="rating rating-view-only" style={{ position: "absolute", right: "0", bottom: "0", margin: "0 10px 5px 0" }}>
                                                        {/* eslint-disable */}
                                                        {console.log(cmnt)}
                                                        <Control.radio defaultValue={cmnt.rating && cmnt.rating.toString()} model=".ratedStars" disabled className="form-control" name="ratedStars" value="5" id="star5" /><label htmlFor="star5">☆</label>
                                                        <Control.radio model=".ratedStars" disabled className="form-control" name="ratedStars" value="4" id="star4" /><label htmlFor="star4">☆</label>
                                                        <Control.radio model=".ratedStars" disabled className="form-control" name="ratedStars" value="3" id="star3" /><label htmlFor="star3">☆</label>
                                                        <Control.radio model=".ratedStars" disabled className="form-control" name="ratedStars" value="2" id="star2" /><label htmlFor="star2">☆</label>
                                                        <Control.radio model=".ratedStars" disabled className="form-control" name="ratedStars" value="1" id="star1" /><label htmlFor="star1">☆</label>
                                                        {/* eslint-disable */}
                                                    </LocalForm>
                                                </ListGroupItemHeading>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <ListGroupItemText> {cmnt.comment} </ListGroupItemText>
                                                <i style={{ color: "darkblue", position: "absolute", right: "0", bottom: "0", margin: "0 10px 5px 0" }}> {finalDate} </i>
                                            </ListGroupItem>
                                            {
                                                props.authCheck.user && props.authCheck.user.username === cmnt.author.username ?
                                                    <ListGroupItem className="ml-auto p-0">
                                                        <div className="btn-group" role="group" aria-label="Basic example">
                                                            <button onClick={() => setEditMode(cmnt._id)} style={{ marginRight: "2px" }} type="button" className="btn btn-secondary">Edit</button>
                                                            <button onClick={() => handleDeleteComment(props.plate._id, cmnt._id)} type="button" className="btn btn-danger">Delete</button>
                                                        </div>
                                                    </ListGroupItem>
                                                    : null
                                            }
                                        </ListGroup>

                                }
                            </div>

                        );
                    })
                );
            }
    };

    return (
        <div className="row mt-3">
            <div className="col-md-6">
                {renderDish(props.plate)}

            </div>
            <div className="col-md-6">
                <h4 className="my-4 my-md-2 text-center">Comments</h4>
                {renderComments(props.comments, props.commentsLoading, props.commentsFailed)}

                {props.plate !== undefined ? <CommentForm postComment={props.postComment} dishId={props.plate._id} loginCheck={props.authCheck} /> : null}
            </div>
        </div>
    )
}

export default DishDetail