import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';
import { Loading } from './LoadingCmp';
import { url } from '../shared_data/Url';
import {Flasher, flash} from "react-universal-flash";

function Menu (props){
    
    // Show flash message when adding a dish to wishlist
	useEffect(() => {
		if(props.success){
			flash(
			<div className="alert alert-success alert-dismissible fade show" role="alert">
				<strong>Dish added</strong>
				<button type="button" className="close" data-dismiss="alert" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>, 3000);
		}
	}, [props.success]);

    let menu;
    if(props.isLoading){
        return <Loading />
    }else
    if(props.isFailed !== null){
        return(
            <h3 className="text-danger"> {props.isFailed} </h3>
        )
    }else     
    menu = props.plates.map((plate) =>{
        return(
            <div key={plate._id} className="col-md-6 mt-3">
                <div id="fav-heart-btn-menu">
                    {
                        props.authCheck.isAuthenticated ?
                            props.favFound && props.favFound.some((item) => item._id === plate._id) ? 
                                    <span onClick={() => props.deleteFav(plate._id)} className="fa fa-3x fa-heart d-flex justify-content-end"></span>
                                :
                                    <span onClick={() => props.postLikeDish(plate._id)} className="fa fa-3x fa-heart-o d-flex justify-content-end"></span>
                        :
                        null
                    }
                </div>

                <Link to={`menu/${plate._id}`} id="dishes-menu">
                    <Card>
                        <CardImg className="rounded" top width="100%" height="450px" src={url + plate.image} alt={plate.name} />
                        <CardImgOverlay>
                            <CardTitle tag="h5">{plate.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </Link>
            </div>
        )
    })
    return (
        <div className="container">
            <div className="row">
                {menu}
            </div> 
            <div style={{zIndex:"9999"}}>
				<Flasher position="top_right" className="bg-black" />
			</div>
        </div>
    )
};

export default Menu;