import React, { useEffect, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const querystring = require('querystring');

const UploadPicture = (props) => {
    const [user, setUser] = useState(props.user);
    const [userPic, setUserPic] = useState(props.user.picture);

    const [image, setImage] = useState('');
    // const [cropData, setCropData] = useState("#");
    const [cropper, setCropper] = useState();
    const [oriFilename, setOriFilename] = useState('');


    const showModal = () => {
        // cropper = new Cropper(image, {
        //     aspectRatio: 1,
        //     viewMode: 3,
        //     preview:'.preview'
        // });
    }

    const changeImage = (e) => {
        window.document.getElementById("showModalBtn").click();
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(files[0]);
        setOriFilename(files[0].name);
    }

    const getCropData = async () => {
        if (typeof cropper !== undefined) {

            let canvas = cropper.getCroppedCanvas();

            await canvas.toBlob(async function(blob){
                let url = URL.createObjectURL(blob);
                setUserPic(url)

                // let reader = new FileReader();
                // reader.readAsDataURL(blob);
                // reader.onload = async (e) => {
                //     var image = new Image();
                //     image.src = e.target.result;
                //     image.onload = async (imgEvent) => {
                //         var width = Math.min(image.width, 400);
                //         var height = Math.min(image.height, 400);
                //         var resizedCanvas = document.createElement('canvas', width=width, height);
                //         resizedCanvas.getContext('2d').drawImage(image, 0, 0, width, height);
                //         var dataUrl = canvas.toDataURL();
                //         var rblob = dataUrl

                //         const formData = new FormData();
                    
                //         const imgfile = new File([rblob], Date.now() + oriFilename);
                //         formData.append('picture', imgfile);
                        
                //         if (await sendImageToServer(formData)) {
                //             let newUserInfo = JSON.parse(JSON.stringify(user))
                //             newUserInfo.picture = url;
                //             sessionStorage.setItem('UserProfile', JSON.stringify(newUserInfo));
                //             props.setUser(newUserInfo);
                //         }
                //     }
                // }
                

                const formData = new FormData();

                var re = /(?:\.([^.]+))?$/;
                var ext = re.exec(oriFilename)[1];
                ext = ext.toLowerCase();
                const tempFilename = Date.now() + '.' + ext;
                const imgfile = new File([blob], tempFilename);
                formData.append('picture', imgfile);
                
                if (await sendImageToServer(formData)) {
                    
                }
                
            });
        }
    }

    const sendImageToServer = async (imgData) => {
        let url = '/user/profile/picture/update';

        let res = await fetch(url, {
            method: 'POST',
            body: imgData
        });

        let data;
        try {
            data = await res.json();
        } catch (error) {
            props.setAlert({
                visible: true,
                strongMsg: 'Error!',
                msg: `Unexpected error. (${error.message})`
            })
            return false;
        }

        if (!data.success) {
            props.setAlert({
                visible: true,
                strongMsg: 'Sorry!',
                msg: `${data.message}`
            })
            return false;
        }

        let newUserInfo = JSON.parse(JSON.stringify(user))
        newUserInfo.picture = data.user.picture
        sessionStorage.setItem('UserProfile', JSON.stringify(newUserInfo));
        props.setUser(newUserInfo);

        return true
    }

    return (
        <>
            <div className="image_area d-flex justify-content-center">
                <div className="upload_image_form">
                    <label for="upload_image" className="image-wrapper">
                        <img src={(userPic==null)? require("../../../assets/images/emptyFace.png") : userPic} id="uploaded_image" className="img-responsive rounded-circle" width="200px" height="200px" />
                        <div className="overlay">
                            <div className="text">Change Image</div>
                        </div>
                    </label>
                    <input lang="en" type="file" name="image" className="image" id="upload_image" onClick={(e)=>{e.target.value=''; setOriFilename('')}} onChange={changeImage} />
                </div>
            </div>
            

            <div className="modal fade modal-lg" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
			  	<div className="modal-dialog modal-dialog-centered" role="document">
			    	<div className="modal-content">
			      		<div className="modal-header">
			        		<h5 className="modal-title">Crop Image Before Upload</h5>
			        		<button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          			<span aria-hidden="true">&times;</span>
			        		</button>
			      		</div>
			      		<div className="modal-body">
			        		<div className="img-container">
			            		<div className="row">
			                		<div className="col-md-8">
                                        <Cropper style={{height: 400, width:600}} aspectRatio={1} preview=".preview" src={image} viewMode={1} guides={true} minCropBoxHeight={10} responsive={true} onInitialized={(instance) => {setCropper(instance)}} />
			                		</div>
			                		<div className="col-md-4">
			                    		<div className="preview"></div>
			                		</div>
			            		</div>
			        		</div>
			      		</div>
			      		<div className="modal-footer">
			      			<button type="button" id="crop" className="btn btn-primary" data-dismiss="modal" onClick={getCropData}>Save</button>
			        		<button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
			      		</div>
			    	</div>
			  	</div>
			</div>
            <input id="showModalBtn" type="hidden" data-toggle="modal" data-target="#modal" onClick={()=>{showModal()}} />
        </>
    )
}

export default UploadPicture;