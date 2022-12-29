import React, { Component } from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import '../Markdown/contactForm/css/main.css';
import '../Markdown/contactForm/css/util.css';
import Testimonial from '../Presenting_Content/Testimonial/Testimonial';
import { Loading } from './LoadingCmp';

export const required = (val) => val;
export const minMaxLength = (minLen, maxLen) => (val) => !val || (val.length >= minLen && val.length <= maxLen);
export const isNumber = (val) => !val || (val !== "" && !isNaN(val));
export const validEmail = (val) => !val || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class Contact extends Component{
	
	constructor(props){
		super(props);
		this.state ={
			}
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	handleSubmit(value){
		this.props.postFeedback(value);
		console.log(value);
		alert(JSON.stringify(value));
		this.props.resetForm();
	};
	
	renderFeedback(){
		if(this.props.isLoading){
			return <Loading />
		}else
		  if(this.props.isFailed !== null){
			return(
				<h3 className="text-danger"> {this.props.isFailed} </h3>
			)
		}else
		if(this.props.feedback.length > 0){
			return(
				<Testimonial feedback={this.props.feedback} />
			)
		}else{
			return(<h6 className='text-info text-center'>There is no feedback yet...</h6>)
		}
	}
	render(){ 
			return(
				<div>
					<div className="row my-3">
							{this.renderFeedback()}
					</div>

					<div className="row">
						<div className="container-contact100">
							<div className="wrap-contact100">
								<Form model="feedbackx" onSubmit={(value) => this.handleSubmit(value)} className="contact100-form validate-form">
									<span className="contact100-form-title">
										Send Us Your Feedback
									</span>

									{
										!this.props.authCheck.isAuthenticated ?
											<>
												<label className="label-input100" htmlFor="first-name">Tell us your name *</label>
												<div className="wrap-input100 rs1-wrap-input100 validate-input" data-validate="Type first name">
												{/* eslint-disable-next-line*/}
													<Control.text model=".firstname" id="first-name" className="input100" name="firstname" placeholder="First name"
														validators={{required, minMaxLength: minMaxLength(3, 10)}} />
														<Errors className="text-danger" model=".firstname" show="touched"
															messages={{
																required: "Required field ",
																minMaxLength: "Invalid first name"
															}} />
													<span className="focus-input100"></span>
												</div>

												<div className="wrap-input100 rs2-wrap-input100 validate-input" data-validate="Type last name">
													{/* eslint-disable-next-line*/}
													<Control.text model=".lastname" className="input100" type="text" name="lastname" placeholder="Last name"
														validators={{required, minMaxLength: minMaxLength(3, 10)}} />
														<Errors className="text-danger" model=".lastname" show="touched"
															messages={{
																required: "Required field",
																minMaxLength: "Invalid last name"
															}} />
													<span className="focus-input100"></span>
												</div>

												<label className="label-input100" htmlFor="email">Enter your email *</label>
												<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
													{/* eslint-disable-next-line*/}
													<Control.text model=".email" id="email" className="input100" type="text" name="email" placeholder="Eg. example@email.com"
														validators={{required, validEmail}} />
														<Errors className="text-danger" model=".email" show="touched"
															messages={{
																required: "Required field ",
																validEmail: "Invalid email"
															}} />
													<span className="focus-input100"></span>
												</div>

												<label className="label-input100" htmlFor="phone">Enter phone number</label>
												<div className="wrap-input100">
													{/* eslint-disable-next-line*/}
													<Control.text model=".phone" id="phone" className="input100" type="text" name="phone" placeholder="Eg. +1 800 000000"
														validators={{required, minMaxLength: minMaxLength(8, 16), isNumber}} />
														<Errors className="text-danger" model=".phone" show="touched"
															messages={{
																required: "Required field ",
																minMaxLength: "Invalid phone number",
																isNumber: "Have you ever seen a damn phone number contains letters"
															}} />
													<span className="focus-input100"></span>
												</div>
											</>
										:
											null
									}
									<label className="label-input100" htmlFor="message">Feedback *</label>
									<div className="wrap-input100 validate-input" data-validate = "Message is required">
										{/* eslint-disable-next-line*/}
										<Control.textarea model=".feedback" id="feedback" className="input100" name="feedback" placeholder="Your Feedback"
											validators={{required, minMaxLength: minMaxLength(4, 300)}} />
											<Errors className="text-danger" model=".feedback" show="touched"
												messages={{
													required: "Required field ",
													minMaxLength: "message must be between 4 and 300 caracters"
												}} />
										<span className="focus-input100"></span>
									</div>

									<div className="container-contact100-form-btn">
										<button className="contact100-form-btn" type="submit">
											Send Feedback
										</button>
									</div>
								</Form>

								<div className="contact100-more flex-col-c-m">
									<div className="flex-w size1 p-b-47">
										<div className="txt1 p-r-25">
											<span className="lnr lnr-map-marker"></span>
										</div>

										<div className="flex-col size2">
											<span className="txt1 p-b-20">
												Address
											</span>

											<span className="txt2">
												Mada Center 8th floor, 379 Hudson St, New York, NY 10018 US
											</span>
										</div>
									</div>

									<div className="dis-flex size1 p-b-47">
										<div className="txt1 p-r-25">
											<span className="lnr lnr-phone-handset"></span>
										</div>

										<div className="flex-col size2">
											<span className="txt1 p-b-20">
												Lets Talk
											</span>

											<span className="txt3">
												+1 800 1236879
											</span>
										</div>
									</div>

									<div className="dis-flex size1 p-b-47">
										<div className="txt1 p-r-25">
											<span className="lnr lnr-envelope"></span>
										</div>

										<div className="flex-col size2">
											<span className="txt1 p-b-20">
												General Support
											</span>

											<span className="txt3">
												contact@example.com
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
	}
}

export default Contact;