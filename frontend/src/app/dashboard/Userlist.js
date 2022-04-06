import React, { Component, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Bar, Doughnut } from 'react-chartjs-2';
import DatePicker from "react-datepicker";
// import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import { useEffect } from 'react';
import { type } from 'os';
import $ from 'jquery';
const querystring = require('querystring');

// import "react-datepicker/dist/react-datepicker.css";

const Userlist = (props) => {
	const [userName, setUserName] = useState('');
	const [userPassword, setUserPassword] = useState('');
	//const [trigger, setTrigger] = useState(1);
	const [datatable, setDatatable] = useState('');


	useEffect(() => {
		sendGetAllUserRequest();	//fetch user list from server when component first rendered.
	}, []);


	const sendGetAllUserRequest = async () => {
		let url = '/admin/userList';

		let res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: querystring.stringify({

			})
		});
		let data = await res.json();
		console.log(typeof (data));

		let tableObject = {
			columns: [
				{
					label: 'user id',
					field: '_id',
					width: 100,
					sort: 'asc',
					attributes: {
						'aria-controls': 'DataTable',
						'aria-label': 'Name',
					},
				},
				{
					label: 'email',
					field: 'email',
					width: 150,
				},
				{
					label: 'name',
					field: 'name',
					width: 150,
				},
				{
					label: 'status',
					field: 'status',
					width: 150,
				},
			],
			rows: [

			],

		};

		if (data.success) {	// if data retreive success
			data.userList.forEach((element) => {
				// console.log(element);
				tableObject.rows.push(element);
			})
		}

		setDatatable(tableObject);
		// Add link to table
		$('tbody').children('tr').on('click', (event) => {
			let userId = $(event.target).parent().children(0).prop("innerText");
			console.log(userId);
			window.location.pathname = '/admin/userinfo/' + userId
		})
	};

	return (
		<>
			<div className="page-header" onLoad={() => {
				
			}}>
			<h3 className="page-title">
				<span className="page-title-icon bg-gradient-primary text-white mr-2">
				<i className="mdi mdi-account-multiple"></i>
				</span> Users </h3>
			</div>
			<button type="button" className="btn btn-gradient-primary mr-2 mb-2" onClick={() => {
				sendGetAllUserRequest();
			}}>refresh</button>
			<MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={datatable} searchTop searchBottom={false} />
		</>

	)
}

export default Userlist;
