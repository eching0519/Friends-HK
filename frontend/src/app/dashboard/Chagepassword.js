// import React, { Component } from 'react';


// class Changepassword extends Component {
//   state = {
//     password: '',
//     confirmPassword: ''
//   };

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

//   render() {
//     return (
//       <div className="App">
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
//               <label htmlFor="passwordInput">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="passwordInput"
//                 placeholder="Type Password"
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
//     );
//   }
// }

// export default Changepassword;

// //   render () {
// //     return (
// //       <div>


     



// //         <div>
// //           <form>
// //             <div>
// //               <div>
// //               <label htmlFor="passwordInput">New Password</label>
// //               <input 
// //                 type='password'
// //                 className="form-control h-auto" 
// //                 id="passwordInput"
// //                 placeholder="Type Password"
// //                 onChange={e=>
// //                   this.handleOnConfirmPasswordInput(e.target.value)} 
// //               />
// //               </div>
// //               <div>
// //               <label htmlFor="confirmPasswordInput">Confirm New Password</label>
// //               <form  className="add-items d-flex" onSubmit={(event)=>{
// //             event.preventDefault();
// //               }}>
// //               <input
// //                 type="password"
// //                 className={'form-control h-auto ${this.confirmPasswordClassName()}'}
// //                 id="confirmPasswordInput"
// //                 placeholder="Type Password Again" 
// //                 onChange={e=>
// //                   this.handleOnConfirmPasswordInput(e.target.value)}
// //               />
// //               {this.renderFeedbackMessage()}
// //               <button type="submit" className="btn btn-gradient-primary font-weight-bold px-lg-4 px-3">Change</button>
// //               </form>
// //               </div>  
// //             </div>
            
// //           </form>  
// //         </div> 
// //       </div>
// //     );
// //     }
// //   }
                
// // export default Changepassword;