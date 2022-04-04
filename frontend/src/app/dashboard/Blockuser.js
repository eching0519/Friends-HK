import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';
// import {Bar, Doughnut} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
 
// import "react-datepicker/dist/react-datepicker.css";



export class Blockuser extends Component {
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  constructor(props){
    super(props)
    this.state = {
      startDate: new Date(),
      // visitSaleData: {},
      // visitSaleOptions: {
      //   scales: {
      //     yAxes: [{
      //       ticks: {
      //         beginAtZero: true,
      //         display:false,
      //         min: 0,
      //         stepSize: 20,
      //         max: 80
      //       },
      //       gridLines: {
      //         drawBorder: false,
      //         color: 'rgba(235,237,242,1)',
      //         zeroLineColor: 'rgba(235,237,242,1)'
      //       }
      //     }],
      //     xAxes: [{
      //       gridLines: {
      //         display:false,
      //         drawBorder: false,
      //         color: 'rgba(0,0,0,1)',
      //         zeroLineColor: 'rgba(235,237,242,1)'
      //       },
      //       ticks: {
      //         padding: 20,
      //         fontColor: "#9c9fa6",
      //         autoSkip: true,
      //       },
      //       categoryPercentage: 0.5,
      //       barPercentage: 0.5
      //   }]
      //   },
      //   legend: {
      //     display: false,
      //   },
      //   elements: {
      //     point: {
      //       radius: 0
      //     }
      //   }
      // },
      // trafficData: {},
      // trafficOptions: {
      //   responsive: true,
      //   animation: {
      //     animateScale: true,
      //     animateRotate: true
      //   },
      //   legend: false,
      // },
      
    }
    this.statusChangedHandler = this.statusChangedHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }
  statusChangedHandler(event, id) {

    //const todoIndex = this.state.todos.findIndex( t => t.id === id );
    const todo = {...this.state.todos[id]};
    todo.isCompleted = event.target.checked;

    const todos = [...this.state.todos];
    todos[id] = todo;

    this.setState({
        todos: todos
    })
  }

  addTodo (event) {
      event.preventDefault();

      const todos = [...this.state.todos];
      todos.unshift({
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          task: this.state.inputValue,
          isCompleted: false
          
      })

      this.setState({
          todos: todos,
          inputValue: ''
      })
  }

  removeTodo (index) {
      const todos = [...this.state.todos];
      todos.splice(index, 1);

      this.setState({
          todos: todos
      })
  }

  inputChangeHandler(event) {
      this.setState({
          inputValue: event.target.value
      });
  }
  
  render () {
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            <span className="page-title-icon bg-gradient-primary text-white mr-2">
              <i className="mdi mdi-block-helper"></i>
            </span> Block User </h3>
        </div>
        <form  className="add-items d-flex" onSubmit={(event)=>{
          event.preventDefault();
        }}>
                  <input 
                      className="form-control h-auto" 
                      placeholder="Type User name" 
                      required />
                  <button type="submit" className="btn btn-gradient-primary font-weight-bold px-lg-4 px-3">Block</button>
                </form>
        <div className="row">
          <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Blocked Users</h4>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th> User </th>
                        <th> Blocked Reason </th>
                        <th> Blocked Date </th>
                        <th> Freedom </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face1.jpg")} className="mr-2" alt="face" /> David Grey </td>
                        <td> Fund is not recieved </td>
                        <td> Dec 5, 2017 </td>
                        <td>  
                          <button>Unblock</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face2.jpg")} className="mr-2" alt="face" /> Stella Johnson </td>
                        <td> High loading time </td>
                       
                        <td> Dec 12, 2017 </td>
                        <td>  
                          <button>Unblock</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face3.jpg")} className="mr-2" alt="face" /> Marina Michel </td>
                        <td> Website down for one week </td>
                        
                        <td> Dec 16, 2017 </td>
                        <td>  
                          <button>Unblock</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <img src={require("../../assets/images/faces/face4.jpg")} className="mr-2" alt="face" /> John Doe </td>
                        <td> Loosing control on server </td>
                       
                        <td> Dec 3, 2017 </td>
                        <td> 
                          <button>Unblock</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
         
          
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
export default Blockuser;