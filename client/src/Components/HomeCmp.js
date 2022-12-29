import React from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import { Loading } from './LoadingCmp';
import { url } from '../shared_data/Url';
import { FadeTransform } from 'react-animation-components'

function Home(props) {

    const renderCard = (items, isLoading, isFailed) => {
        if(isLoading){
          return <Loading />
        }else
        if(isFailed !== null){
            return(
                <h3 className="text-danger"> {isFailed} </h3>
            )
        }else 
        return(
            items.map((item) =>{
                return (
                    <div className="col-12 col-md-4 mt-3" key={item._id}>
                        <FadeTransform in delay={250}>
                            <Card style={{height:"580px"}}>
                                <CardImg top width="300px" height="300px" src={url + item.image} alt={item.name} />
                                <CardBody>
                                    <CardTitle tag="h5">{item.name}</CardTitle>
                                    <CardSubtitle tag="h6" className="mb-2 text-muted">{item.designation ? item.designation : null}</CardSubtitle>
                                    <CardText className="limiText">{item.description}</CardText>
                                </CardBody>
                            </Card>
                        </FadeTransform>
                    </div>
                );
            })
        )
    };
      
    return(
        <div className="container">
            <div className="row">
                {renderCard(props.plates, props.platesLoading, props.platesFailed)}
            </div>

            <div className="row">
                {renderCard(props.staff, props.staffLoading, props.staffFailed)}
            </div>
        </div>
    )
}

export default Home;
