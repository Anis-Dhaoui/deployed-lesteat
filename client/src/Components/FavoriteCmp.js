import React from 'react'
import { Loading } from './LoadingCmp';
import { url } from '../shared_data/Url';

export default function Favorite(props) {

	if (props.isLoading) {
		return <Loading />
	} else
	if (props.isFailed) {
		return <h5 className="text-danger">{props.isFailed}</h5>
	} else{
	var renderFovorites = props.wishlist && props.wishlist.likeDish.length > 0 ?
		props.wishlist.likeDish.map((item, index) => {
			return (
				<div id="wish-list-items" className={index % 2 === 0 ? "row bgLightGray mb-2 p-2" : "row bgLight mb-2 p-2"} key={item._id}>
					<div className="d-flex align-items-center justify-content-center col-12 col-md-2">
						<img className="rounded" src={url + item.image} width="100%" height="110px" alt={item.name} />
					</div>
					<div className="d-flex align-items-center col-12 col-md-3 mt-3 mt-md-0">
						<h4 className="mx-auto mx-md-0">{item.name}</h4>
					</div>
					<div className="d-flex align-items-center col-12 col-md-6">
						<div className="limi-text-wishlist-description">
							{item.description}
						</div>
					</div>
					<div className="d-flex align-items-center justify-content-center col-12 col-md-1 mt-3 mt-md-0">
						<button onClick={() => props.deleteFav(item._id)} className="fa fa-trash fa-lg mb-1 text-danger" />
					</div>
				</div>
			)
		})
	:
		<h5 className="text-info text-center my-5">Your wish list is empty</h5>
	}
	return (
		<div className="container mt-5">
			{renderFovorites}
		</div>
	)
};