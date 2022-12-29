import React from 'react';
import { Media } from "reactstrap";
import { url } from '../shared_data/Url';
import { Stagger, Fade } from 'react-animation-components';
import { Loading } from "./LoadingCmp";

function About(props) {

    const renderStaff = (staff, isLoading, isFailed) =>{
        if(isLoading){
            return <Loading />
        }else
        if(isFailed !== null){
            return(
                <h3 className="text-danger"> {isFailed} </h3>
            )
        }else{
            return(
            staff.map((item) =>{
                return(     
                    <Fade in key={item._id}>
                        <Media className="row mt-3">
                            <Media left className="col-12 col-md-2 col-lg-1 mr-lg-4 mr-md-n3 mr-xl-2 p-1 d-flex justify-content-center justify-content-md-start">
                                <Media object src={url + item.image} alt={item.name} width="100px" height="120px" />
                            </Media>
                            <Media body className="col col-md col-lg">
                                <Media heading>
                                    <span className="d-flex justify-content-center justify-content-md-start h4"> {item.name} </span>
                                    <i className="d-flex justify-content-center justify-content-md-start h5"> {item.designation} </i>
                                </Media>
                                    <p className="d-flex justify-content-center justify-content-md-start">{item.description}</p>
                            </Media>
                        </Media>   
                    </Fade>       
                )
            }))
        }
    };   

    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 mt-5">
                    <h2>About Us</h2>
                    <div className="pb-3">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <p>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
                        </p>
                        <p>
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                        </p>
                    </div>
                </div>
                <div className="col-12 col-md-6 mt-5">
                    <img src="./assets/images/aboutSideImg.jpg" width="100%" height="100%" alt="dish" className="mobile-img" />

                </div>
            </div>

            <div>
                <h2>Our Staff</h2>
                <Stagger in delay={150}>{renderStaff(props.staff, props.isLoading, props.isFailed)}</Stagger>
            </div>
        </div>
    )
}

export default About;