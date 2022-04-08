import React, { useState, useEffect } from 'react';
// import { ProgressBar } from 'react-bootstrap';
// import {Bar, Doughnut} from 'react-chartjs-2';
// import DatePicker from "react-datepicker";
const querystring = require('querystring'); 
// import "react-datepicker/dist/react-datepicker.css";

// 해야할것  user status에서 블락을 누르면 unblock 되게 해야한다 백앤드 서버에서도
// 사용자의 비밀번호를 바꿔야한다 백앤드 서버에서도
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
    const [buttonStatus, setButtonStatus] = useState({ status: "active", button: "Block" });
      const onChange = (e) => {
        setConfirmPassword(e.target.value);

      }                                          
    // let changepassword = {newpassword: ""}

    useEffect(() => {
      getUserInfo();
    }, []);

    useEffect(() => {
      resetUserPassword(userInfo.email, confirmPassword);
    }, [userInfo, confirmPassword]);
    
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
     
  
  
    

  // useEffect(async()=>{
  //   const {userId} = props.match.params
  //   try{
  //     const response = await fetch('/admin/getuserbyid', {
  //       method: 'POST',
  //       body: querystring.stringify({
  //         id : userId
  //       }),
  //       headers: { 
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       },
  //     });
  //     const data = await response.json();
  //     const info = data.user
  //     console.log(info)
  //     setUserInfo(info)   
  //   }catch(err){
  //     console.log(err);
  //   }


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
  // }, []);
  

  const changeMessage = () => {
    setButtonStatus({
      status: "Blocked",
      button: "Unblock"
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


    console.log('render method called')
    // const {data} = this.state;
    // const {userId} = props.match.params;
    // const {data} = this.componentDidMount();
    // const {user} = data.userid
    // {this.componentDidMount(userId)};
    // {this.componentDidMount()}

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
        
        <div className="page-header">
          {/* <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-account"></i>
            </span> Specific User Info template </h3> */}
            {/* {data.map((item)=>{
              return <li key={item.id}>{item.name}</li>
            })} */}
           
        </div>
        
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
                        <button className='btn-auto btn-gradient-primary font-weight-bold' onClick={() => changeMessage()}>{buttonStatus.button}</button>
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
        {/* <div>
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
        </div> */}

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
                onChange= {onChange}
                // {e =>
                //   handleOnConfirmPasswordInput(e.target.value)
                // }
              />
              {renderFeedbackMessage()}
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Change
          </button>
        </form>
      </div>
        </div>
      </div> 
    );
  }


export default Userinfo;

// import React, { Component } from 'react';
// // import { ProgressBar } from 'react-bootstrap';
// // import {Bar, Doughnut} from 'react-chartjs-2';
// // import DatePicker from "react-datepicker";
// const querystring = require('querystring'); 
// // import "react-datepicker/dist/react-datepicker.css";

// // showSpecificUserInfo = async () => {
// //   let url = '/admin/userList';

// //   let res = await fetch(url, {
// //     method: 'POST',
// //     headers: {
// //       'Content-Type': 'application/x-www-form-urlencoded'
// //     },
// //     body: querystring.stringify({

// //     })
// //   });
// //   let data = await res.json();
// //   console.log(typeof (data));
     
// // }



// class Userinfo extends Component {
  
//   constructor(){
//     super(); //super class를 부른다 
//     console.log("Is this working")

//     this.state = {
//       user: {},
//       // photo: "",
//       // email: "default",
//       // password: "123456",
//       // status: "Active",
//       // button: "block"
//     }
//     this.changepassword = {
//       newpassword: ""
//     }
//   }
//   state = {
//     data : [],
//     userid: '',
//     email: '',
//     userstatus: '',
//     password: '',
//     confirmPassword: ''
//   }

//     getUserInfo(){
//     const {userId} = this.props.match.params
//     fetch('/admin/getuserbyid', {
//       method: 'POST',
//       body: querystring.stringify({
//         id : userId
//       }),
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//     })
//       .then((response) =>{
//         return response.json()
//       }) 
//       .then((data) => {
//         this.setState({
//           user: data
//         })
//       }); 
//     // try{
//     //   const response = await fetch('/admin/getuserbyid', {
//     //     method: 'POST',
//     //     body: querystring.stringify({
//     //       id : userId
//     //     }),
//     //     headers: { 
//     //       'Content-Type': 'application/x-www-form-urlencoded'
//     //     },
//     //   });
//     //   const data = await response.json();
//     //   const info = data.user
//     //   console.log(info)
       
//     // }catch(err){
//     //   console.log(err);
//     // }
//     // fetch('/admin/userList', {
//     //   method: 'POST',
//     //   body: querystring.stringify({

//     //   }),
//     //   headers: {
//     //     'Content-Type': 'application/x-www-form-urlencoded'
//     //   },
//     // })
//     //   .then((response) => response.json())
//     //   .then((data) => console.log(data));
//   }
  
  
//   componentDidMount(){
//     this.getUserInfo();
//   }
  

//   changeMessage() {
//     this.setState({
//       status: "Blocked",
//       button: "unblock"
//     })
//   }

//   // fetchUserId(){
//   //   this.setState({
//   //     usderid: 'hello'
//   //   })
//   // }

//   // state = {
//   //   password: '',
//   //   confirmPassword: ''
//   // };

//   // convertToUserID() {
//   //   this.setState({
//   //     userid: 
//   //   })
//   // }

//   handleOnPasswordInput(passwordInput) {
//     this.setState({ password: passwordInput });
//   }

//   handleOnConfirmPasswordInput(confirmPasswordInput) {
//     this.setState({ confirmPassword: confirmPasswordInput });
//   }

//   doesPasswordMatch() {
//     const { password, confirmPassword } = this.state;
//     return password === confirmPassword;
//   }

//   confirmPasswordClassName() {
//     const { confirmPassword } = this.state;

//     if (confirmPassword) {
//       return this.doesPasswordMatch() ? 'is-valid' : 'is-invalid';
//     }
//   }

//   renderFeedbackMessage() {
//     const { confirmPassword } = this.state;

//     if (confirmPassword) {
//       if (!this.doesPasswordMatch()) {
//         return (
//           <div className="invalid-feedback">Password does not match</div>
//         );
//       }
//     }
//   }

//   // fetchUserId(){
//   //   const queryId = this.props.location.search.split("=")[1];
//   //   const token = window.localStorage.JsonWebToken;

//   //   fetch(`/admin/userinfo/${queryId}`, {
//   //     headers: {Authorization: token}
//   //   })
//   //     .then(response => response.json())
//   //     .then(response => {
//   //       this.setState({
//   //         isLoading: false,
//   //         data: response.data,
//   //         skillData: response.tag_list
//   //       });
//   //     });
//   // }


//   render () {
//     console.log('render method called')
//     console.log(this.state.user.name)
//     // const {data} = this.state;
//     const {userId} = this.props.match.params;
//     const {data} = this.state.user;
//     // const {data} = this.componentDidMount();
//     // const {user} = data.userid
//     // {this.componentDidMount(userId)};
//     // {this.componentDidMount()}
//     return (
//       <div>

//         <div className="page-header">
//           {/* <h3 className="page-title">
//             <span className="page-title-icon bg-gradient-primary text-white mr-2">
//               <i className="mdi mdi-account"></i>
//             </span> Specific User Info template </h3> */}
//             {/* {data.map((item)=>{
//               return <li key={item.id}>{item.name}</li>
//             })} */}
           
//         </div>
        
//         <div className="row">
//           <div className="col-md-5 grid-margin stretch-card">
//             <div className="card">
              
//             <h3 className="page-title">
//             <span className="page-title-icon bg-gradient-primary text-white mr-2">
//               <i className="mdi mdi-account"></i>
//             </span> Specific User Info template 
//             </h3>
//               <div className="card-body">
//                 <img src={require("../../assets/images/faces/face1.jpg")} className="mr-2" alt="face" />
//                 <h4 className="card-title">{/*this.state.name*/}name gogo</h4>
//                 <div id="traffic-chart-legend" className="rounded-legend legend-vertical legend-bottom-left pt-4">
//                   <ul>
//                     <li>
//                       <span className="legend-dots bg-primary"></span>UserID
//                       <span className="float-right">{userId}</span>
//                     </li>
//                     <li>
//                       <span className="legend-dots bg-primary"></span>Email
//                       <span className="float-right">{/*this.state.email*/}email gogo</span>
//                     </li>
//                     <li>
//                       <span className="legend-dots bg-primary"></span>Password
//                       <span className="float-right">{/*this.state.password*/}pass gogo</span>
//                     </li>
//                     <li>
//                       {/*depends on the status*/}
//                       {/*If status is block then button show unblock if status active button shows block */}
//                       <span className="legend-dots bg-primary"></span>{/*this.state.status*/}status gogo
//                       <span className="float-right">
//                         <button className='btn-auto btn-gradient-primary font-weight-bold' onClick={() => this.changeMessage()}>{/*this.state.button*/}button</button>
//                       </span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>  
//           </div>
//           <div className="App">
//            <div className="page-header">
//           <h3 className="page-title">
//             <span className="page-title-icon bg-gradient-primary text-white mr-2">
//               <i className="mdi mdi-key"></i>
//             </span> Change Password </h3>
//         </div>
//         <div>
//           <label htmlFor="usernameInput">User Name</label>
//           <form  className="add-items d-flex" onSubmit={(event)=>{
//             event.preventDefault();
//           }}>
//             <input 
//                 className="form-control h-auto"
//                 id="usernameInput" 
//                 placeholder="Type User name" 
//                 required />
//             <button type="submit" className="btn btn-gradient-primary font-weight-bold px-lg-4 px-3">Verify</button>
//           </form>
//         </div>

//         <form className="my-form">
//           <div className="form-row">
//             <div className="col-md-12 mb-3">
//               <label htmlFor="passwordInput">New Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="passwordInput"
//                 placeholder="Type New Password"
//                 onChange={e => this.handleOnPasswordInput(e.target.value)}
//               />
//             </div>
//             <div className="col-md-12 mb-3">
//               <label htmlFor="confirmPasswordInput">Confirm Password</label>
//               <input
//                 type="password"
//                 className={`form-control ${this.confirmPasswordClassName()}`}
//                 id="confirmPasswordInput"
//                 placeholder="Type Password Again"
//                 onChange={e =>
//                   this.handleOnConfirmPasswordInput(e.target.value)
//                 }
//               />
//               {this.renderFeedbackMessage()}
//             </div>
//           </div>
//           <button type="submit" className="btn btn-primary btn-block" onClick={(event)=>{
//             event.preventDefault();
//           }
//           }>
//             Change
//           </button>
//         </form>
//       </div>
//         </div>
//       </div> 
//     );
//   }
// }
// const ListItem = (props) => {
    
//   return (
//       <li className={(props.isCompleted ? 'completed' : null)}>
//           <div className="form-check">
//               <label htmlFor="" className="form-check-label"> 
//                   <input className="checkbox" type="checkbox" 
//                       checked={props.isCompleted} 
//                       onChange={props.changed} 
//                       /> {props.children} <i className="input-helper"></i>
//               </label>
//           </div>
//           <i className="remove mdi mdi-close-circle-outline" onClick={props.remove}></i>
//       </li>
//   )
// };
// export default Userinfo;