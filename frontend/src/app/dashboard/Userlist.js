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

	//console.log('render once');
	//console.log(datatable);
	/**
	const sendAdminLoginRequest = async () => {
		let url = '/admin/userList';

		let res = await fetch(url, {
			method: 'GET', //GET or remain it as POST?
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: querystring.stringify({
				id: { userName },
				pw: { userPassword }
			})
		});

		let data
		try {
			data = await res.json();
		} catch (error) {
			props.setAlert({
				visible: true,
				strongMsg: 'Error!',
				msg: `Unexpected error. (${error.message})`
			})
			return;
		}

		if (!data.success) {
			props.setAlert({
				visible: true,
				strongMsg: 'Sorry!',
				msg: '${data.message}'
			})
			return;
		}
		else {
			window.location.replace("/admin");
		}
	}
	 */


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

		//console.log(data.userList);
		//console.log(tableObject.rows);

		if (data.success) {	// if data retreive success
			data.userList.forEach((element) => {
				console.log(element);
				tableObject.rows.push(element);
			})
		}

		//console.log(tableObject);
		//setDatatable(tableObject);
		//console.log(tableObject.rows);
		//console.log(tableObject);
		setDatatable(tableObject);
		//setTrigger(30);
		//return tableObject;
	};


	return (
		<>
			<div className="page-header">
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
