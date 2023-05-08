import { Link } from "react-router-dom"

function Footer() {
    return(
        <footer className="footer">
            <div className="footer-left col-md-4 col-sm-6">
                <p className="about">
                <span> About Lets Eat</span>We believe in the commitment to our community and in fostering long term relationships
                with local farmers and fishermen. Our menus reflect these connections,
                featuring local, seasonal produce and sustainably sourced seafood and meats.
                </p>
                <div className="icons">
                <a href="facebook.com"><i className="fa fa-facebook"></i></a>
                <a href="twitter.com"><i className="fa fa-twitter"></i></a>
                <a href="linkedin.com"><i className="fa fa-linkedin"></i></a>
                <a href="google.com"><i className="fa fa-google-plus"></i></a>
                <a href="facebook.com/instagram"><i className="fa fa-instagram"></i></a>
                </div>
            </div>
            <div className="footer-center col-md-4 col-sm-6">
                <div>
                <i className="fa fa-map-marker"></i>
                <p><span> 208 Essex Lane</span> Parlin, NJ 08859</p>

                </div>
                <div>
                <i className="fa fa-phone"></i>
                <p> (+1) 202-555-0174</p>
                </div>
                <div>
                <i className="fa fa-envelope"></i>
                <p><a href="/home"> jane@letseat.com</a></p>
                </div>
            </div>
            <div className="footer-right col-md-4 col-sm-6">
                <h2> Let's Eat <span> <img src="/assets/images/logo.png" width="70px" alt="Logo" /> </span></h2>
                <p className="menu">
                <Link to="/home"> Home</Link> |
                <Link to="/about"> About</Link> |
                <Link to="/menu"> Menu</Link> |
                <Link to="/contact"> Contact</Link>
                </p>
                <p className="name"> Let's Eat &copy; 2023</p>
            </div>
        </footer>
    )
}

export default Footer