import { NONAME } from 'dns';
import React, { useState, useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap';
// import {Bar, Doughnut} from 'react-chartjs-2';
// import DatePicker from "react-datepicker";
const querystring = require('querystring'); 
// import "react-datepicker/dist/react-datepicker.css";

// 해야할것  user status에서 블락을 누르면 unblock 되게 해야한다 백앤드 서버에서도
// what is the difference between blocekd and unactive?

const Userinfo = (props) => {

    const [userInfo, setUserInfo] = useState({  photo: "../../assets/images/faces/face1.jpg",
                                                email: "default",
                                                password: "123456",
                                                status: "Active",
                                                button: "block"
                                            })
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [buttonStatus, setButtonStatus] = useState({ status: "active", button: "Block" }, { status: "block", button: "Unblock"} );
  
    //buttonStatus status = userInfo.status

    useEffect(() => {
      getUserInfo();
    }, []);

    
    const getUserInfo = async () => {
      const {userId} = props.match.params;
      try{
      let res = await fetch('/admin/getuserbyid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          id: userId
        })
      });
      let data = await res.json();
      let info = data.user;
      console.log(info)
      setUserInfo(info);
    }catch(err){
      console.log(err);
    }
  } 
    const resetUserPassword = async (email , password) => {
      console.log(password)
      console.log(email);
      try{
      let res = await fetch('/admin/resetUserPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify({
          email: email,
          password: password //new password
        })
      });
      let data = await res.json();
      console.log(data);
      
      // let inf = userInfo;
      // setUpdatePassword(data)
      }catch(err){
      console.log(err);
    }
  }
    const blockUser = async (id1) => {
      // const {userId} = props.match.params;
      try{
        let res = await fetch('/admin/block', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: querystring.stringify({
            id: id1
          })
        });
        let data = await res.json();
        console.log(data)
      }catch(err){
        console.log(err);
      }
    }
    
    const unblockUser = async (id) => {
      // const {userId} = props.match.params;
      try{
        let res = await fetch('/admin/unblock', {
          method: 'POST',
          headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: querystring.stringify({
            id: id
          })
        });
        let data = await res.json();
        console.log(data)
      }catch(err){
        console.log(err);
      }
    } 
     

  const changeMessage = (userstatus) => {
    if (userstatus === 'active'){
      setButtonStatus({
        status: userstatus,
        button: "Block"
      })
    }
    else if(userstatus === 'block'){
      setButtonStatus({
        status: userstatus,
        button: "Unblcok"
      })
    }
    // setButtonStatus({
    //   status: userstatus,
    //   button: "default"
    // })
  }
  const handleOnPasswordInput = (passwordInput) => {
    setPassword(passwordInput);
    // this.setState({ password: passwordInput });
  }

  const handleOnConfirmPasswordInput = (confirmPasswordInput) => {
      setConfirmPassword(confirmPasswordInput);
    // this.setState({ confirmPassword: confirmPasswordInput });
  }

  const doesPasswordMatch = () => {
    // const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  }

  const confirmPasswordClassName = () => {
    if (confirmPassword) {
      return doesPasswordMatch() ? 'is-valid' : 'is-invalid';
    }
  }

  const renderFeedbackMessage = () => {
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
                      {/*depends on the status*/}
                      {/*If status is block then button show unblock if status active button shows block */}
                      <span className="legend-dots bg-primary"></span>{userInfo.status}
                      <span className="float-right">
                        <button type="button"  className='btn-auto btn-gradient-primary font-weight-bold' onChange={() => changeMessage(userInfo.status)} onClick={() => blockUser(userInfo._id)}>{buttonStatus.button}</button>
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
            resetUserPassword(userInfo.email, confirmPassword);
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