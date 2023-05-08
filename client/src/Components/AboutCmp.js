import React from 'react';
import { Media } from "reactstrap";
import { url } from '../shared_data/Url';
import { Stagger, Fade } from 'react-animation-components';
import { Loading } from "./LoadingCmp";

function About(props) {

    const renderStaff = (staff, isLoading, isFailed) => {
        if (isLoading) {
            return <Loading />
        } else
            if (isFailed !== null) {
                return (
                    <h3 className="text-danger"> {isFailed} </h3>
                )
            } else {
                return (
                    staff.map((item) => {
                        return (
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

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-6 mt-5">
                    <h2>About Us</h2>
                    <div className="pb-3">
                        <p>
                            Since our modest beginnings in 2005 with a little space in Parlin’s stylish Yorkville locale, LetsEat‘s development has been enlivened with the energy to cook and serve solid, Indian-roused takeout food.

                            In contrast to other Indian eateries, LetsEat was made with the explicit expectation to appear as something else.
                        </p>
                        <p>
                            We realize numerous individuals love Indian sustenance, yet a large number of them loathe or are unconscious of the regularly unfortunate fixings that make run-of-the-mill Indian nourishment taste so great.

                            Our menu highlights things that utilize the sound and fragrant flavors, however, forget the stuffing ghee, spread, oil, and overwhelming cream.

                            LetsEat has developed to incorporate four superb takeout areas in Toronto, with additional to come sooner rather than later. Our group takes pride in the way that we can furnish our new and faithful clients with extraordinary tasting Indian-roused nourishment that is not normal for that some other Indian eateries you visit.
                        </p>
                        <p>
                            We perceive that a few people are as yet searching for run-of-the-mill Indian nourishment, and that is fine with us. Our disclaimer is that on the off chance that you’re anticipating overwhelming, slick, undesirable Indian nourishment, LetsEat isn’t the place for you.
                            Our expectation is that you’ll join the developing pattern that such a large number of others have officially found and you will attempt LetsEat as a remarkable option to other Indian eateries as well as to all other solid sustenance alternatives out there!
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