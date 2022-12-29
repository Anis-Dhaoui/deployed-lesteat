import React, { useState, useEffect } from 'react'
import '../../Markdown/adminPanel/style.css';
import { TabContent, TabPane, NavLink } from 'reactstrap';
import classnames from 'classnames';
import AddNewPlate from './AdminChildCmpns/addNewPlate';
import EditOrDeletePlate from './AdminChildCmpns/EditOrDeletePlate';
import {Flasher, flash} from "react-universal-flash";

export default function AdminCmp(props) {

    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const [sideBar, setsideBar] = useState(null);
    
    const handleCollapse = () =>{
        sideBar === null ? setsideBar("active") : setsideBar(null);
    };
    
        // Show flash message when add, remove or update a dish
        useEffect(() => {
            if(props.isFailed !== null && props.isFailed === "Dish name is already exist"){
                flash(
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Failed to post: </strong> {props.isFailed}.
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
              </div>, 9000);
            }else{
                if(props.isFailed !== null && props.isFailed === "Dish added successfully"){
                    flash(
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        <strong>Success: </strong> {props.isFailed}.
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>, 9000);
                }else{
                    if(props.isFailed !== null && props.isFailed === "Dishes deleted successfully"){
                        flash(
                        <div className="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>Success: </strong> {props.isFailed}.
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>, 9000);
                    }else{
                        if(props.isFailed !== null && props.isFailed === "Dish updated successfully"){
                            flash(
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>Success: </strong> {props.isFailed}.
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>, 9000);
                        }
                    }
                }
            }
        }, [props.isFailed]);

    return (
        <div className="dashboard container">
            <div className="wrapper">

                <nav id="sidebar"className={sideBar}>
                    <div className="sidebar-header">
                        <h3>Let's Eat</h3>
                        <h5>Admin Panel</h5>
                    </div>

                    <ul className="list-unstyled components">
                        <p>Dashboard</p>
                        <li>
                            <a href="#plateSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Plates</a>
                            <ul className="collapse list-unstyled" id="plateSubmenu">
                                <li>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={() => { toggle('1'); }}
                                    >
                                        Add New Plate
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={() => { toggle('2'); }}
                                    >
                                        Edit/Delete Plate
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#staffSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Staff</a>
                            <ul className="collapse list-unstyled" id="staffSubmenu">
                                <li>
                                    <NavLink className={classnames({ active: activeTab === '4' })}
                                        onClick={() => toggle('4')}
                                    >
                                        Add New Staff
                                    </NavLink>
                                </li>
                                <li>
                                <NavLink className={classnames({ active: activeTab === '5' })}
                                    onClick={() => toggle('5')}
                                >
                                    Edit/Delete Staff
                                </NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                        <NavLink className={classnames({ active: activeTab === '7' })}
                            onClick={() => toggle('7')}
                        >
                            Notifications
                        </NavLink>
                        </li>

                        <li>
                        <NavLink className={classnames({ active: activeTab === '8' })}
                            onClick={() => toggle('8')}
                        >
                            Users
                        </NavLink>
                        </li>
                        <li>
                            <NavLink onClick={() => props.logoutUser()} className="text-danger"> <i className="fa fa-sign-out" aria-hidden="true"></i> Logout</NavLink>
                        </li>
                    </ul>
                </nav>

                <div id="content" className={sideBar}>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <button style={{position:"fixed", top:"21px", zIndex:"999"}} type="button" onClick={handleCollapse} className="btn handleCollapseBtn">
                                <i className={sideBar ? "fa fa-align-left" : "fa fa-times"}></i>
                            </button>
                            <div style={{zIndex:"9999"}}>
                                <Flasher position="top_right"/>
                            </div>
                            
                        </div>
                    </nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <div className="container">
                                <AddNewPlate
                                    postNewPlate={props.postNewPlate}
                                    uploadImage={props.uploadImage}
                                    isLoading={props.isLoading}
                                    isFailed={props.isFailed}
                                />
                            </div>
                        </TabPane>
                        <TabPane tabId="2">
                            <div className="container">
                                <EditOrDeletePlate
                                    plates={props.plates}
                                    isLoading={props.isLoading}
                                    isFailed={props.isFailed}
                                    deletePlate={props.deletePlate}
                                    updatePlate={props.updatePlate}
                                    uploadImage={props.uploadImage}
                                    deleteImage={props.deleteImage}
                                />
                            </div>
                        </TabPane>

                        <TabPane tabId="3">
                            <div className="container">
                                <h1>Add new staff</h1>
                            </div>
                        </TabPane>
                        <TabPane tabId="4">
                            <div className="container">
                                <h1>Edit or Delete staff</h1>
                            </div>
                        </TabPane>
                        <TabPane tabId="5">
                            <div className="container">
                                <h1>Notifications</h1>
                            </div>
                        </TabPane>
                        <TabPane tabId="6">
                            <div className="container">
                                <h1>Users</h1>
                            </div>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        </div>
    )
}