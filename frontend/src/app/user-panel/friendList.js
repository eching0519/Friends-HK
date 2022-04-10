import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { EmptyIcon } from "../shared/Variable"
import { AddFriendButton, CancelButton, RejectButton, AcceptButton } from '../component/friend/ActionButton'; 
const querystring = require('querystring');

const langDic = {"yue": "Cantonese", "cmn": "Mandarin", "eng": "English"};
const coDic = {"NA": "North America", "SA": "South America", "ER": "Europe", "AS": "Asia", "AU": "Australia", "AF": "Africa", "CN": "China", "HK": "Hong Kong", "IN": "India", "ID": "Indonesia", "JP": "Japan", "KR": "South Korea", "MY": "Malaysia", "PH": "Philippines", "TW": "Taiwan", "TH": "Thailand", "VN": "Vietnam"};
const genderDic = {"M": "Male", "F": "Female", "TM": "Trans male", "TF": "Trans female", "NB": "Non-binary", "ND": "Not Declare"};

const FriendList = (props) => {
    const [inRequest, setInRequest] = useState([])
    const [outRequest, setOutRequest] = useState([])

    const getRequestList = async () => {
        let url = '/friend/userFriendRequest';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
              id : props.user.id
            })
        });

        let data
        try {
            data = await res.json();
        } catch (error) {console.log(error)}

        if (data.success) {
            console.log("friendList.js", data)
            setInRequest(data.requests.incoming);
            setOutRequest(data.requests.outgoing);
        }
        console.log("FriendList", data)
    }

    useEffect(()=>{
        getRequestList();
    }, [props.location])

    useEffect(() => {
        console.log("inRequest", inRequest)
        console.log("outRequest", outRequest)
    }, [inRequest, outRequest])

    return (
        <>
        {!(inRequest.length==0 && outRequest.length==0) &&
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Friend Request</h4>
                        {/* Incoming Request */}
                        <p className="card-description"> Incoming Request</p>
                        <div className="table-responsive">
                            <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th> User </th>
                                    <th> Name </th>
                                    <th> Gender </th>
                                    <th> Nationality </th>
                                    <th> Language </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {inRequest.length==0 && <tr><td colspan="6">No pending request.</td></tr>}
                                {inRequest.map((value, key) => 
                                        <RequestTableRow request={value} getRequestList={getRequestList} type="incoming" />
                                    //    <span>{value.from.name}</span>
                                )}
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="card-body">
                        {/* Outgoing Request */}
                        <p className="card-description"> Outgoing Request</p>
                        <div className="table-responsive">
                            <table className="table table-striped text-center">
                            <thead>
                                <tr>
                                    <th> User </th>
                                    <th> Name </th>
                                    <th> Gender </th>
                                    <th> Nationality </th>
                                    <th> Language </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {outRequest.length==0 && <tr><td colspan="6">No pending request</td></tr>}
                                {outRequest.map((value, key) => 
                                        <RequestTableRow request={value} getRequestList={getRequestList} type="outgoing" />
                                )}
                            </tbody>
                            </table>
                        </div>
                </div>
            </div>
        </div>
        }
        <div className="page-header">
            <h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-account-multiple"></i></span> Friend List</h3>
        </div>
        <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
                <div className="card-body">
                    <FriendListTable />
                </div>
            </div>
        </div>
        </>
    );
}

export default FriendList

const RequestTableRow = (props) => {
    const request = (props.type === "incoming")?
                        {...props.request, "from": props.request.from._id}:
                        {...props.request, "to": props.request.to._id};
    const userInfo = (props.type === "incoming")?
                        props.request.from : props.request.to;

    console.log(props.request)

    const isSet = (val) => {
        return !(val === undefined || val == null || val == '')
    }

    const actionButton = (props.type === "incoming")?
                        <>
                        <AcceptButton className="btn btn-gradient-primary btn-sm" 
                                    text="Accept"
                                    request={request}
                                    next={props.getRequestList} />
                        <RejectButton className="btn btn-gradient-dark btn-sm" 
                                    text="Reject"
                                    request={request}
                                    next={props.getRequestList} />
                        </> : 
                        <>
                        <CancelButton className="btn btn-gradient-dark btn-sm" 
                                    text="Cancel"
                                    request={request}
                                    next={props.getRequestList} />
                        </>

    return !isSet(userInfo)? <></> : 
        <>
            <tr>
                <td className="py-1"><img src={isSet(userInfo.picture)?userInfo.picture:EmptyIcon} alt="user icon" className='mx-auto' /></td>
                <td> {isSet(userInfo.name)!=''?userInfo.name:"N/A"} </td>
                <td> {isSet(userInfo.gender)!=''?genderDic[userInfo.gender]:"N/A"} </td>
                <td> {isSet(userInfo.co)!=''?coDic[userInfo.co]:"N/A"} </td>
                <td> {isSet(userInfo.lang)!=''?langDic[userInfo.lang]:"N/A"} </td>
                <td> {actionButton} </td>
                    
            </tr>
        </>
    
}

const FriendListTable = (props) => {
    const tableData = {
        columns: [
            { name: "User", selector: "User", sortable: false },
            { name: "Name", selector: "Name", sortable: true },
            { name: "Gender", selector: "Gender", sortable: true },
            { name: "Nationality", selector: "Nationality", sortable: true },
            { name: "Language", selector: "Language", sortable: true }
        ],
        data: [],
    };

    return (
        <DataTableExtensions
          {...tableData}
        >
          <DataTable
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      );
}