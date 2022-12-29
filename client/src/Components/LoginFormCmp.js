import React, { useEffect } from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import '../Markdown/loginForm/style.css';

export default function Login (props){

    const handleLogin = (event)=> {
        // alert("Username: " + event.target[0].value + " Password: " + event.target[1].value + " Remember: " + event.target[2].checked);
        props.login({username: event.target[0].value, password: event.target[1].value});
        props.toggleSignIn();
        // Redirect to Admin page when admin logged in
        event.preventDefault();
    };

    useEffect(() => {
        if(props.authCheck.errMsg !== null){
            props.toggleSignIn();
        }
    /* eslint-disable */
    }, [props.authCheck.errMsg]);

    return (
        <Modal isOpen={props.isSignInOpen} toggle={props.toggleSignIn} contentClassName="login-modal">
            <div className="login-card">
                <div className="card-header">
                    <ModalHeader toggle={props.toggleSignIn} className="text-primary mt-2">Sign In</ModalHeader>
                    <div className="d-flex justify-content-end social_icon">
                        <span><i className="fa fa-facebook-square"></i></span>
                        <span><i className="fa fa-google-plus-square"></i></span>
                        <span><i className="fa fa-twitter-square"></i></span>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => handleLogin(e)}>
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-user"></i></span>
                            </div>
                            <input type="text" className="form-control" placeholder="username" required autoFocus />
                        </div>
                        {
                            props.authCheck.errMsg && props.authCheck.errMsg === "User not found" ?

                                <div style={{fontSize:"12px", padding: "10px", marginTop: "-10px"}} className="alert-danger alert">{props.authCheck.errMsg}</div>
                            :
                                null
                        }
                        <div className="input-group form-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="fa fa-key"></i></span>
                            </div>
                            <input type="password" className="form-control" placeholder="password" required />
                        </div>
                        {
                            props.authCheck.errMsg && props.authCheck.errMsg === "Password is incorrect" ?

                                <div style={{fontSize:"12px", padding: "10px", marginTop: "-10px"}} className="alert-danger alert">{props.authCheck.errMsg}</div>
                            :
                                null
                        }
                        <div className="row align-items-center remember">
                            <input type="checkbox" />Remember Me
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Login" className="btn float-right login_btn" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-center links">
                        Don't have an account?<span style={{color: "yellow", cursor: "pointer"}} onClick={() => {props.toggleSignUp(); props.toggleSignIn()}}>Sign Up</span>
                    </div>
                    <div className="d-flex justify-content-center">
                        <a href="/home">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </Modal>
    );
}