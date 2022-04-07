import React, { Component } from 'react';
// import { ProgressBar } from 'react-bootstrap';
// import {Bar, Doughnut} from 'react-chartjs-2';
// import DatePicker from "react-datepicker";
const querystring = require('querystring'); 
// import "react-datepicker/dist/react-datepicker.css";

// showSpecificUserInfo = async () => {
//   let url = '/admin/userList';

//   let res = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: querystring.stringify({

//     })
//   });
//   let data = await res.json();
//   console.log(typeof (data));
     
// }

let url = "localhost:8080/admin/userlist";

class Userinfo extends Component {
  
  state = {
    data : [],
    userid: '',
    email: '',
    userstatus: '',
    password: '',
    confirmPassword: ''
  }

  async componentDidMount(){
    try{
      const response = await fetch('/admin/userList', {
        method: 'POST',
        body: querystring.stringify({

        }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      const data = await response.json();
      console.log(data);  
      console.log(typeof (data)); 
    }catch(err){
      console.log(err);
    }
    // fetch('/admin/userList', {
    //   method: 'POST',
    //   body: querystring.stringify({

    //   }),
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  }
  
  constructor(){
    super(); //super class를 부른다 
    console.log("Is this working")

    this.state = {
      photo: "",
      email: "default",
      password: "123456",
      status: "Active",
      button: "block"
    }
    this.changepassword = {
      newpassword: ""
    }
  }
  
  

  changeMessage() {
    this.setState({
      status: "Blocked",
      button: "unblock"
    })
  }

  // fetchUserId(){
  //   this.setState({
  //     usderid: 'hello'
  //   })
  // }

  // state = {
  //   password: '',
  //   confirmPassword: ''
  // };

  // convertToUserID() {
  //   this.setState({
  //     userid: 
  //   })
  // }

  handleOnPasswordInput(passwordInput) {
    this.setState({ password: passwordInput });
  }

  handleOnConfirmPasswordInput(confirmPasswordInput) {
    this.setState({ confirmPassword: confirmPasswordInput });
  }

  doesPasswordMatch() {
    const { password, confirmPassword } = this.state;
    return password === confirmPassword;
  }

  confirmPasswordClassName() {
    const { confirmPassword } = this.state;

    if (confirmPassword) {
      return this.doesPasswordMatch() ? 'is-valid' : 'is-invalid';
    }
  }

  renderFeedbackMessage() {
    const { confirmPassword } = this.state;

    if (confirmPassword) {
      if (!this.doesPasswordMatch()) {
        return (
          <div className="invalid-feedback">Password does not match</div>
        );
      }
    }
  }

  // fetchUserId(){
  //   const queryId = this.props.location.search.split("=")[1];
  //   const token = window.localStorage.JsonWebToken;

  //   fetch(`/admin/userinfo/${queryId}`, {
  //     headers: {Authorization: token}
  //   })
  //     .then(response => response.json())
  //     .then(response => {
  //       this.setState({
  //         isLoading: false,
  //         data: response.data,
  //         skillData: response.tag_list
  //       });
  //     });
  // }


  render () {
    console.log('render method called')
    const {data} = this.state;
    const {userId} = this.props.match.params;
    return (
      <div>
        <div className="page-header">
          {/* <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account"></i>
            </span> Specific User Info template </h3> */}
           <ul>
             
          </ul>
        </div>
        
        <div className="row">
          <div className="col-md-5 grid-margin stretch-card">
            <div className="card">
              
            <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account"></i>
            </span> Specific User Info template 
            </h3>
              <div className="card-body">
                <img src={require("../../assets/images/faces/face1.jpg")} className="mr-2" alt="face" />
                <h4 className="card-title">{this.state.name}</h4>
                <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4">
                  <ul>
                    <li>
                      <span className="legend-dots bg-primary"></span>UserID
                      <span className="float-right">{userId}</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-primary"></span>Email
                      <span className="float-right">{this.state.email}</span>
                    </li>
                    <li>
                      <span className="legend-dots bg-primary"></span>Password
                      <span className="float-right">{this.state.password}</span>
                    </li>
                    <li>
                      {/*depends on the status*/}
                      {/*If status is block then button show unblock if status active button shows block */}
                      <span className="legend-dots bg-primary"></span>{this.state.status}
                      <span className="float-right">
                        <button className='btn-auto btn-gradient-primary font-weight-bold' onClick={() => this.changeMessage()}>{this.state.button}</button>
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
        <div>
          <label htmlFor="usernameInput">User Name</label>
          <form  className="add-items d-flex" onSubmit={(event)=>{
            event.preventDefault();
          }}>
            <input 
                className="form-control h-auto"
                id="usernameInput" 
                placeholder="Type User name" 
                required />
            <button type="submit" className="btn btn-gradient-primary font-weight-bold px-lg-4 px-3">Verify</button>
          </form>
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
                onChange={e => this.handleOnPasswordInput(e.target.value)}
              />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="confirmPasswordInput">Confirm Password</label>
              <input
                type="password"
                className={`form-control ${this.confirmPasswordClassName()}`}
                id="confirmPasswordInput"
                placeholder="Type Password Again"
                onChange={e =>
                  this.handleOnConfirmPasswordInput(e.target.value)
                }
              />
              {this.renderFeedbackMessage()}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block" onClick={(event)=>{
            event.preventDefault();
          }
          }>
            Change
          </button>
        </form>
      </div>
        </div>
      </div> 
    );
  }
}
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
export default Userinfo;