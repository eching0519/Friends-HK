import { NONAME } from 'dns';
import React, { useState, useEffect } from 'react';
const querystring = require('querystring'); 


const Userinfo = (props) => { //Function for admin 

    const [userInfo, setUserInfo] = useState({  photo: "../../assets/images/faces/face1.jpg", //each factors will change related to the specific user
                                                email: "default",
                                                password: "123456",
                                                status: "Active",
                                                button: "block"
                                            })
    const [password, setPassword] = useState(''); //to change the password 
    const [confirmPassword, setConfirmPassword] = useState(''); // to confirm the changed password
    const [buttonStatus, setButtonStatus] = useState({ status: "", button: "" }); // to change the button based on the status
  
    useEffect(() => { //to render this function
      getUserInfo(); //to fetch and load a user's data on the interface
    }, []);

    useEffect(() => { //to render this function
      changeMessage(userInfo.status) //to change the name of the button regards to the user's status 
    }, [userInfo]) //use the userInfo
    
    const getUserInfo = async () => { //to fetch the user information from the backend
      const {userId} = props.match.params; //get the user Id from the url
      try{
      let res = await fetch('/admin/getuserbyid', { //fetch the api regards to its format
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          id: userId //requiremnt to fetch the user information
        })
      });
      let data = await res.json(); //save the fetched data into variable
      let info = data.user;
      setUserInfo(info); //to update the UserInfo by useState
    }catch(err){
      console.log(err); //to check error on the console
    }
  } 
    const resetUserPassword = async (email , password) => { //to change the user's password
      try{
      let res = await fetch('/admin/resetUserPassword', { // to fetch the data from backend
        method: 'POST', //requirements to fetch the data from api
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          email: email,
          password: password //new password of the user
        })
      });
      let data = await res.json(); //save the fetched data into variable
      getUserInfo(); //to dynamically change the password on the user information
      }catch(err){
      console.log(err); //if error, show error
    }
  }
    const blockUser = async (id) => { // to block the user
      try{
        let res = await fetch('/admin/block', { //fetch the data from api by submitting the requirements
          method: 'POST',
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: querystring.stringify({
            id: id
          })
        });
        let data = await res.json(); //save the fetched data to variable
        getUserInfo(); // update the user status that this user is blocked 
      }catch(err){
        console.log(err);
      }
    }
    
    const unblockUser = async (id) => { //to unblock the blocekd user
      try{
        let res = await fetch('/admin/unblock', { //fetch the api by providing the requirements
          method: 'POST',
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: querystring.stringify({
            id: id
          })
        });
        let data = await res.json();
        getUserInfo(); //update the user status from block to active 
      }catch(err){
        console.log(err);
      }
    } 
     
  const blockorUnblock = (userstatus, userid) => { // changes on the button based on the user's status
    if (userstatus === 'active'){ //if the user status is active the button can block the user 
      blockUser(userid)
    }
    else if (userstatus === 'block'){ //if the user status is block the button can unblock the user
      unblockUser(userid)
    }
  }

  const changeMessage = (userstatus) => { // change the message of the button based on the user status
    if (userstatus === 'active'){// if user status is active the button shows Block
      setButtonStatus({
        status: userstatus,
        button: "Block"
      })
    }
    else if(userstatus === 'block'){// if user status is block the button shows Unblock
      setButtonStatus({
        status: userstatus,
        button: "Unblcok"
      })
    }
  }
  const handleOnPasswordInput = (passwordInput) => { //to change the password based on the input
    setPassword(passwordInput);
  }

  const handleOnConfirmPasswordInput = (confirmPasswordInput) => {//to change the confirmpassword based on the input
      setConfirmPassword(confirmPasswordInput);
  }

  const doesPasswordMatch = () => { // check whther input of password and confirmpassword match
    return password === confirmPassword;
  }

  const confirmPasswordClassName = () => { // to indicate either success or error inside of the input.
    if (confirmPassword) {
      return doesPasswordMatch() ? 'is-valid' : 'is-invalid'; //If true then return 'is-valid'. If false then return 'is-invalid' 
    }
  }

  const renderFeedbackMessage = () => { //to give user feedback whther inputs of password and inputpassword match each other. 
    if (confirmPassword) {
      if (!doesPasswordMatch()) {
        return (
          <div className="invalid-feedback">Password does not match</div>
        );
      }
    }
  }

    console.log(userInfo._id)
    console.log('render method called')
    const ListItem = (props) => {
        return (
            <li className={(props.isCompleted ? 'completed' : null)}>
                <div className="form-check">
                    <label htmlFor="" className="form-check-label"> 
                        <input className="checkbox" type="checkbox" 
                            checked={props.isCompleted} 
                            onChange={props.changed} 
                            /> {props.children} <i className="input-helper"></i>
                    </label>
                </div>
                <i className="remove mdi mdi-close-circle-outline" onClick={props.remove}></i>
            </li>
        )
      };

    return (
      <div>   
        <div className="row">
          <div className="col-md-5 grid-margin stretch-card">
            <div className="card">
              
            <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account"></i>
            </span> User Information 
            </h3>
              <div className="card-body">
                <img src={userInfo.photo} className="mr-2" alt="face" />
                <h4 className="card-title">{userInfo.name}</h4>
                <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4">
                  <ul>
                    <li>
                      <span className="legend-dots bg-primary"></span>UserID
                      <span className="float-right">{userInfo._id}</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-primary"></span>Email
                      <span className="float-right">{userInfo.email}</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-primary"></span>Password
                      <span className="float-right">{userInfo.password}</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-primary"></span>{userInfo.status}
                      <span className="float-right">
                        <button type="button"  className='btn-auto btn-gradient-primary font-weight-bold' onChange={() => changeMessage(userInfo.status)} onClick={() => blockorUnblock(userInfo.status, userInfo._id)}>{buttonStatus.button}</button>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>  
          </div>
          <div className="App">
           <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-key"></i>
            </span> Change Password </h3>
        </div>
        <form className="my-form">
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <label htmlFor="passwordInput">New Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Type New Password"
                onChange={e => handleOnPasswordInput(e.target.value)}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="confirmPasswordInput">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${confirmPasswordClassName()}`}
                id="confirmPasswordInput"
                placeholder="Type Password Again"
                onChange= {e =>
                  handleOnConfirmPasswordInput(e.target.value)
                }
              />
              {renderFeedbackMessage()}
            </div>
          </div>
          <button type="button" className="btn btn-primary btn-block" onClick = {() => {
            if (confirmPassword.length !== 0){
              resetUserPassword(userInfo.email, confirmPassword);
            }
            else{
              window.alert("Type new password");
            }
          }}>
            Change
          </button>
        </form>
      </div>
        </div>
      </div> 
    );
  }


export default Userinfo;