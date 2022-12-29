import React from 'react';
import '../../Markdown/Testimonial/style.css';

export default function Testimonial(props) {

    var dates = props.feedback.filter((item, index) => index <= 2).map((item) => {return new Date(item.createdAt)});
    var latestFeedback = new Date((Math.max(...dates))).toISOString();

    const ShowFeedback = props.feedback.filter((item, index) => index <= 2)
        .map(item =>{
            return(
                <div className={item.createdAt === latestFeedback ? "carousel-item active" : "carousel-item"} key={item._id}>
                    <blockquote>
                        <div className="row d-flex justify-content-center">
                            <div className="col-sm-8 col-sm-offset-2">
                                <p> {item.feedback} </p>
                                <small> 
                                    {item.author ? item.author.firstname : item.guestAuthor.firstname}
                                    {' '}
                                    {item.author ? item.author.lastname : item.guestAuthor.lastname} 
                                </small>
                            </div>
                        </div>
                    </blockquote>
                </div>
            )
        })

    return (
        <div className="col-md-12 " data-wow-delay="0.2s">
            <div id="quote-carousel" className="carousel slide" data-ride="carousel" data-interval="2000">
                {/* <!-- Bottom Carousel Indicators --> */}
                <ol className="carousel-indicators">
                    <img data-target="#quote-carousel" data-slide-to="0" className="active" 
                        src="/assets/feedback_images/(1).jpg" alt="2" />
                    <img data-target="#quote-carousel" data-slide-to="1" 
                        src="/assets/feedback_images/(2).jpg" alt="3" />
                    <img data-target="#quote-carousel" data-slide-to="2" 
                        src="/assets/feedback_images/(25).jpg" alt="4" />
                </ol>

                {/* <!-- Carousel Slides / Quotes --> */}
                <div className="carousel-inner">
                    {ShowFeedback}
                </div>
                <a className="carousel-control-prev xxx" href="#quote-carousel" role="button" data-slide="prev">
                    <i className="fa fa-chevron-left xxx"></i>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next xxx" href="#quote-carousel" role="button" data-slide="next">
                <i className="fa fa-chevron-right xxx"></i>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
}