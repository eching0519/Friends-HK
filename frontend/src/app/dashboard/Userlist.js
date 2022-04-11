import React, { Component, useState } from 'react';
// import { MDBDataTableV5 } from 'mdbreact';
import { useEffect } from 'react';
import $ from 'jquery';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import { EmptyIcon } from "../shared/Variable"
const querystring = require('querystring');

const langDic = {"yue": "Cantonese", "cmn": "Mandarin", "eng": "English"};
const coDic = {"NA": "North America", "SA": "South America", "ER": "Europe", "AS": "Asia", "AU": "Australia", "AF": "Africa", "CN": "China", "HK": "Hong Kong", "IN": "India", "ID": "Indonesia", "JP": "Japan", "KR": "South Korea", "MY": "Malaysia", "PH": "Philippines", "TW": "Taiwan", "TH": "Thailand", "VN": "Vietnam"};
const genderDic = {"M": "Male", "F": "Female", "TM": "Trans male", "TF": "Trans female", "NB": "Non-binary", "ND": "Not Declare"};

const isSet = (val) => {
    return !(val === undefined || val == null || val == '')
}

const capitalize = (str) => { 
	if (typeof(str) !== 'string') return str
	return str.charAt(0).toUpperCase() + str.slice(1); 
}

const Userlist = (props) => {
	const [userName, setUserName] = useState('');
	const [userPassword, setUserPassword] = useState('');
	const [pending, setPending] = useState(true);
	const [datatable, setDatatable] = useState({
		columns: [
            { 
                name: "", 
                selector: "picture", 
                sortable: false , 
                maxWidth:"100px", 
                style: { margin:"10px" },
                cell: (info) => <img src={isSet(info.picture)?info.picture:EmptyIcon} className='rounded-circle mx-auto' />
            },
			{ name: "ID", selector: "_id", minWidth: "200", sortable: true },
			{ name: "Name", selector: "name", sortable: true },
			{ name: "Email", selector: "email", sortable: true },
            // { 
            //     name: "Gender", selector: "gender", sortable: true , 
            //     defaultContent: "--",
            //     cell: (info) => isSet(info.gender)? genderDic[info.gender] : "--"
            // },
            { 
                name: "Nationality", selector: "co", sortable: true,
                cell: (info) => isSet(info.co)? coDic[info.co] : "--" 
            },
            { 
                name: "Language", selector: "lang", sortable: true,
                cell: (info) => isSet(info.lang)? langDic[info.lang] : "--" 
            },
            { 
                name: "Status", selector: "status", sortable: true,
                cell: (info) => capitalize(info.status)
            }
        ],
		rows: [

		],

	});


	useEffect(() => {
		sendGetAllUserRequest();	
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

		// let tableObject = {
		// 	columns: [
		// 		{
		// 			name: 'ID',
		// 			selector: '_id',
		// 			width: 50,
		// 			sort: 'asc',
		// 			attributes: {
		// 				'aria-controls': 'DataTable',
		// 				'aria-label': 'Name',
		// 			},
		// 		},
		// 		{
		// 			name: 'Email',
		// 			selector: 'email',
		// 			width: 200,
		// 		},
		// 		{
		// 			name: 'Name',
		// 			selector: 'name',
		// 			width: 150,
		// 		},
		// 		{
		// 			name: 'Status',
		// 			selector: 'status',
		// 			width: 150,
		// 		},
		// 	],
		// 	data: [

		// 	],

		// };

		let userData = []
		if (data.success) {	// if data retreive success
			data.userList.forEach((val) => {
				// console.log(element);
				userData.push({...val, 
					"id": val._id,
					"lang": isSet(val.lang)?val.lang:"",
					"co": isSet(val.co)?val.co:"",
					"gender": isSet(val.gender)?val.gender:"",
				});
			})
		}

		setDatatable({...datatable, "data": userData});
		setPending(false);
		// Add link to table
		// setRowOnClickEvent();
		// $('tbody').children('tr').on('click', (event) => {
		// 	let userId = $(event.target).parent().children(0).prop("innerText");
		// 	window.location.pathname = '/admin/userinfo/' + userId
		// })
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
			{/* <button type="button" className="btn btn-gradient-primary mr-2 mb-2" onClick={() => {
				sendGetAllUserRequest();
			}}>refresh</button> */}
			<DataTableExtensions
				{...datatable}
				export={false}
				print={false}
        	>
			<DataTable
				noHeader
				defaultSortFieldId="2"
				// defaultSortAsc={true}
				pagination
				highlightOnHover
				progressPending={pending}
				// onChangeRowsPerPage={setRowOnClickEvent}
				// onChangePage={setRowOnClickEvent}
				pointerOnHover={true}
				onRowClicked={(row, event) => {
					let rowId = $(event.target).parent().attr("id");
					let targetId = rowId.split('-').at(-1)
					window.location.pathname = '/admin/userinfo/' + targetId
				}}
			/>
				</DataTableExtensions>
		</>

	)
}

export default Userlist;
