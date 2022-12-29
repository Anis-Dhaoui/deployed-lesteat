import React, { useState } from 'react'
import { CustomInput, Input, Form, FormGroup, Label, Row, Col } from 'reactstrap';
import { Controller, useForm } from "react-hook-form";
import { url } from '../../../shared_data/Url';
import {flash} from "react-universal-flash";

export default function AddNewPlate (props) {

    const[img, setImg] = useState({file: "", imgUrl: ""});

    // Handling form state
    const { control, handleSubmit } = useForm();

    const postDish = (data, e) =>{
        let formData = new FormData();
        formData.append("image", img.file);
        props.uploadImage(formData);

        data.image = img.file;
        props.postNewPlate(data);
        // e.target.reset();
        setImg({file: "", imgUrl: ""});
    };

    const updateDish = (data, e) =>{
        e.preventDefault() //prevent the form from submitting
        const body = Object.fromEntries(Object.entries(data).filter(([key, value]) => value !== undefined));
        if(Object.keys(body).length > 0){
            if(body.image){
                body.image = "images/" + body.image.split('\\')[2];
                let formData = new FormData();
                formData.append("image", img.file);
                props.uploadImage(formData);
            }
            props.updatePlate(props.targetPlate._id, body);
        }else{
            flash(
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                    <strong>Info: </strong> Nothing was edited.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>, 9000);
        }
    };

    //Handling image preview
    const handleImgPreview = (event) =>{
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = () => {
            setImg({...img, file: file, imgUrl: reader.result})
        }
        reader.readAsDataURL(file)
    };

    return (
        <Form onSubmit={handleSubmit(props.targetPlate ? updateDish : postDish)}>
            <Row>
                <Col>
                    <FormGroup>
                        <Label for="dishName">Name</Label>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <Input
                                    placeholder="Dish name"
                                    onChange={(name) => field.onChange(name)}
                                    required
                                    defaultValue={props.targetPlate ? props.targetPlate.name : null}
                                />
                            )}
                        />
                        {/*  <Input type="text" id="dishName" placeholder="Dish name"  /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="dishPrice">Price</Label>
                        <Controller
                            control={control}
                            name="price"
                            render={({ field }) => (
                                <Input
                                    placeholder="Dish price"
                                    onChange={(price) => field.onChange(price)}
                                    required
                                    defaultValue={props.targetPlate ? props.targetPlate.price : null}
                                />
                            )}
                        />
                        {/* <Input type="text" id="dishPrice" placeholder="Price"  /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="dishDescription">Description</Label>
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <Input
                                    type="textarea"
                                    placeholder="Dish description"
                                    onChange={(description) => field.onChange(description)}
                                    rows="8"
                                    required
                                    defaultValue={props.targetPlate ? props.targetPlate.description : null}
                                />
                            )}
                        />
                        {/* <Input type="textarea" id="dishDescription" placeholder="Dish description" rows={8}   /> */}
                    </FormGroup>
                    <FormGroup>
                        <Label for="featured">Featured</Label>
                        <Controller
                            control={control}
                            name="featured"
                            render={({ field }) => (
                                <CustomInput
                                    type="switch"
                                    onChange={(featured) =>  field.onChange(featured)}
                                    label="Featured plate?"
                                    id={props.targetPlate ? "featuredUpdate" : "featured"}
                                    defaultChecked={props.targetPlate ? props.targetPlate.featured : null}
                                />
                            )}
                        />
                        {/* <CustomInput type="switch" id="featured" name="featured" label="Featured plate?" /> */}
                    </FormGroup>
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="dishImage">Dish image</Label>
                                <Controller
                                    control={control}
                                    name="image"
                                    render={({ field }) => (
                                        <CustomInput
                                            type="file"
                                            onChange={(image) =>  {
                                                field.onChange(image);
                                                handleImgPreview(image);
                                            }}
                                            label= {props.targetPlate ? props.targetPlate.image.split('/')[1] : "Choose an image for this dish"}
                                            id="image"
                                            style={{cursor: "pointer"}}
                                            required = {props.targetPlate ? false : true}
                                            
                                        />
                                    )}
                                />
                                {/* <CustomInput onChange={(e) => handleImgPreview(e)} type="file" id="dishImage" name="dishImage" label="Choose an image for this dish" style={{cursor: "pointer"}}  /> */}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center" style={{height: "357px"}}>
                        {img.imgUrl !== "" ?
                            <img className="img-prev" src={img.imgUrl} alt="previewImage" height="95%" width="95%" />
                            :
                            <img alt="imagePlaceholder" height="95%" width="95%" className="img-prev" 
                                src={props.targetPlate ? url + props.targetPlate.image : "https://montverde.org/wp-content/themes/eikra/assets/img/noimage-420x273.jpg"}
                            />
                        }
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        {
                            props.targetPlate ?
                                <Input type="submit" value="Update Dish" className="btn btn-outline-warning"></Input>
                            :
                                <Input type="submit" value="Post Dish" className="btn btn-outline-dark"></Input>
                        }
                    </Col>
                        
                    </Row>
                </Col>
            </Row>
        </Form>
    );
};