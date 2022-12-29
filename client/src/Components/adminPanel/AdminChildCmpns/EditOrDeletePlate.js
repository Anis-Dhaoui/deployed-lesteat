import React, { useState } from 'react'
import { Loading } from '../../LoadingCmp';
import '../../../Markdown/adminPanel/editOrDeletePlateStyle.css';
import { url } from '../../../shared_data/Url';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AddNewPlate from './addNewPlate';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export default function EditOrDeletePlate (props) {

   const [modal, setModal] = useState(false);
   const toggle = () => setModal(!modal);

   // The target plate that will be edited
   const [targetPlate, settargetPlate] = useState(null);
   // Array of list of images names (or only one image) that will be deleted
   const [imagesNames, setImagesNames] = useState([]);

   const [isChecked, setIsChecked] = useState([]);
   const [CheckAll, setCheckAll] = useState(false);

   const handleCheckboxClick = (e, id, image) => {
      if (e.target.checked) {
         setIsChecked([...isChecked, id]);
         setImagesNames([...imagesNames, image]);
      }else{
         setIsChecked(isChecked.filter(item => item !== id));
      }
   };
   const handleCheckboxSelectAll = e => {
      setCheckAll(!CheckAll);
      setIsChecked(props.plates.map(item => item._id));
      setImagesNames(props.plates.map(item => item.image));
      if (CheckAll) {
        setIsChecked([]);
      }
   };

   const deletePlate = (plateId, image) =>{
      confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className='custom-ui'>
						<h3>Are you sure?</h3>
						<p className="text-danger">You want to delete this dish?</p>
						<button onClick={onClose}>No, Cancel</button>
						<button className="text-danger"
							onClick={() => {
								props.deletePlate(plateId);
                        props.deleteImage(image);
								onClose();
							}}
						>
							Yes, Delete!
						</button>
					</div>
				);
			}
		});
   };

   if (props.isLoadign) {
      return <Loading />
   } else
   if (props.isFailed !== null && props.isFailed !== "Dishes deleted successfully" && props.isFailed !== "Dish updated successfully"){
      return <h3 className="text-danger"> {props.isFailed} </h3>
   } else {
      var platesList = props.plates.map((item) => {

         let SplitCreatedDate = item.createdAt.split("-");
         let createdDate = new Date(SplitCreatedDate[0], SplitCreatedDate[1] - 1, SplitCreatedDate[2].slice(0,2)).toDateString();
         
         let SplitUpdatedDate = item.updatedAt.split("-");
         let updatedDate = new Date(SplitUpdatedDate[0], SplitUpdatedDate[1] - 1, SplitUpdatedDate[2].slice(0,2)).toDateString();
         
         return (
            /* eslint-disable */
            <tr key={item._id}>
               <td>
                  <img src={url + item.image} alt={item.name} width="50px" height="50px" />
                  <span className="user-link limit-carac">{item.name}</span>
               </td>
               <td className="text-center">
                  {createdDate}
               </td>
               <td className="text-center">
                  {updatedDate}
               </td>
               <td className="text-center" style={{width: "20%"}}>
                  <a className="table-link">
                     <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i onClick={() => {settargetPlate(item), toggle()}} className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                     </span>
                  </a>
                  <a className="table-link danger">
                     <span className="fa-stack">
                        <i className="fa fa-square fa-stack-2x"></i>
                        <i onClick={() => deletePlate([item._id], [item.image])} className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                     </span>
                  </a>
                  <input checked={isChecked.includes(item._id)} onChange={(e) => handleCheckboxClick(e, item._id, item.image)} type="checkbox"></input>
               </td>
            </tr>
            /* eslint-disable */
         )
      })
   }
   return (
      <div id="update-plate-table" className="container">
         <div className="row">
            <div className="col-lg-12">
               <div className="main-box clearfix">
                  <div className="table-responsive">
                     <table className="table user-list">
                        <thead>
                           <tr>
                              <th><span>Name</span></th>
                              <th className="text-center"><span>Created</span></th>
                              <th className="text-center"><span>Updated</span></th>
                              <th className="text-center">
                                 <span>Select all</span>
                                 <input checked={props.plates.length === isChecked.length} onChange={() => handleCheckboxSelectAll()} type="checkbox"></input>
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {platesList}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
         <div className="d-flex justify-content-end mr-5">
            <button onClick={() => deletePlate(isChecked, imagesNames)} disabled={isChecked.length === 0} className="btn btn-danger">Remove
               <span className="badge badge-light ml-1">{isChecked.length}</span>
            </button>
         </div>

         {/* Update form modal */}
         <div style={{zIndex: "9888"}}>
            <Modal id="update-plate-model" backdrop={true} size="xl" isOpen={modal} modalTransition={{ timeout: 600 }} backdropTransition={{ timeout: 200 }} toggle={toggle}>
               <ModalHeader toggle={toggle}>
                  <span>
                     Updating <span className="text-warning">{targetPlate ? targetPlate.name : null}</span>
                  </span>
               </ModalHeader>
               <ModalBody className="py-3">
                  <AddNewPlate targetPlate={targetPlate} updatePlate={props.updatePlate} uploadImage={props.uploadImage} />
               </ModalBody>
            </Modal>
         </div>
      </div>
   );
};