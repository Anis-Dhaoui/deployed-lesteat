import React, { Component } from 'react'
import { Modal, ModalBody, ModalHeader, Label, Row } from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';
import '../Markdown/commentForm/style.css';
import {required, minMaxLength} from './ContactCmp';

export default class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state ={
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    };

    handleSubmit(value){
        this.toggleModal();
        this.props.postComment(this.props.dishId, value.rate, value.comment);
    };
    
    render() {
        return (
            <>
                {
                    this.props.loginCheck.isAuthenticated ?
                        <button type="button" className="btn btn-outline-primary offset-5" onClick={this.toggleModal}>Comment</button>
                    :
                        <button type="button" className="btn btn-outline-primary offset-5" onClick={this.onLoginClick}>Comment</button>
                }

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add a comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(value) => this.handleSubmit(value)} className="p-3">
                            <Row className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <div className="rating">
                                    {/* eslint-disable */}
                                    <Control.radio defaultValue="1" model=".rate" className="form-control" name="rating" value="5" id="5" /><label htmlFor="5">☆</label>
                                    <Control.radio model=".rate" className="form-control" name="rating" value="4" id="4" /><label htmlFor="4">☆</label>
                                    <Control.radio model=".rate" className="form-control" name="rating" value="3" id="3" /><label htmlFor="3">☆</label>
                                    <Control.radio model=".rate" className="form-control" name="rating" value="2" id="2" /><label htmlFor="2">☆</label>
                                    <Control.radio model=".rate" className="form-control" name="rating" value="1" id="1" /><label htmlFor="1">☆</label>
                                    {/* eslint-disable */}
                                </div>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                {/* eslint-disable-next-line */}
                                <Control.textarea model=".comment" className="form-control" name="comment" id="comment" placeholder="Type your comment" rows={5}
                                    validators={{ required, minMaxLength: minMaxLength(4, 500)}}
                                />
                                <Errors className="text-danger" model=".comment" show="touched"
                                    messages={{
                                        required: "Required field",
                                        minMaxLength: "Comment lenght should be between 4-500"
                                    }} 
                                />
                            </Row>
                            
                            <Row className="form-group">
                                <button type="submit" className="btn btn-outline-primary">Submit</button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>                
            </>
        )
    }
}
