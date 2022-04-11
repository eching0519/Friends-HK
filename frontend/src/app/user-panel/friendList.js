import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import PostRequestSender from '../component/common/PostRequestSender'
import $ from 'jquery'
import { UserProfileSidebar, UserInfoModal } from './userProfile';
import { EmptyIcon } from "../shared/Variable"
import { AddFriendButton, CancelButton, RejectButton, AcceptButton } from '../component/friend/ActionButton'; 
const querystring = require('querystring');

const langDic = {"yue": "Cantonese", "cmn": "Mandarin", "eng": "English"};
const coDic = {"NA": "North America", "SA": "South America", "ER": "Europe", "AS": "Asia", "AU": "Australia", "AF": "Africa", "CN": "China", "HK": "Hong Kong", "IN": "India", "ID": "Indonesia", "JP": "Japan", "KR": "South Korea", "MY": "Malaysia", "PH": "Philippines", "TW": "Taiwan", "TH": "Thailand", "VN": "Vietnam"};
const genderDic = {"M": "Male", "F": "Female", "TM": "Trans male", "TF": "Trans female", "NB": "Non-binary", "ND": "Not Declare"};

const isSet = (val) => {
    return !(val === undefined || val == null || val == '')
}

const FriendList = (props) => {
    const [inRequest, setInRequest] = useState([])
    const [outRequest, setOutRequest] = useState([])
    const [target, setTarget] = useState(props.user._id)
    const [userProfileModal, setUserProfileModal] = useState(null)

    useEffect(() => {
        setUserProfileModal(<UserInfoModal content={<UserProfileSidebar 
                                                        user={props.user} 
                                                        target={target} 
                                                        detailed={true} 
                                                        action={false} 
                                                        setInfoContent={()=>{}} 
                                                        setPreferenceContent={()=>{}} 
                                                        setTargetName={()=>{}} />} />)
    }, [target])

    const getRequestList = async () => {
        let url = '/friend/userFriendRequest';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
              id : props.user._id
            })
        });

        let data
        try {
            data = await res.json();
        } catch (error) {console.log(error)}

        if (data.success) {
            setInRequest(data.requests.incoming);
            setOutRequest(data.requests.outgoing);
        }
        // console.log("FriendList", data)
    }

    useEffect(()=>{
        getRequestList();
    }, [props.location])

    return (
        <>
        <div className="page-header">
            <h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-account-multiple"></i></span> Friend List</h3>
        </div>
        {inRequest.length+outRequest.length>0 &&
        <div className='row'>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                        {inRequest.length>0 && <>
                        <div className="card-body">
                            {/* <h4 className="card-title">Friend Request</h4> */}
                            {/* Incoming Request */}
                            <p className="card-description"> Incoming Friend Request</p>
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
                                            <RequestTableRow request={value} getRequestList={getRequestList} type="incoming" setTarget={setTarget} />
                                        //    <span>{value.from.name}</span>
                                    )}
                                </tbody>
                                </table>
                            </div>
                        </div>
                        </>}
                        {outRequest.length>0 && <>
                        <div className="card-body">
                            {/* Outgoing Request */}
                            <p className="card-description"> Outgoing Friend Request</p>
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
                                            <RequestTableRow request={value} getRequestList={getRequestList} type="outgoing" setTarget={setTarget} />
                                    )}
                                </tbody>
                                </table>
                            </div>
                        </div>
                        </>}
                </div>
            </div>
        </div>
        }
        <div className='row'>
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <FriendListTable user={props.user} setTarget={setTarget} />
                    </div>
                </div>
            </div>
        </div>
        {userProfileModal}
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
                <td onClick={()=>props.setTarget(userInfo)} data-toggle="modal" data-target="#userInfoModal" style={{cursor: "pointer"}} className="py-1"><img src={isSet(userInfo.picture)?userInfo.picture:EmptyIcon} alt="user icon" className='mx-auto' /></td>
                <td onClick={()=>props.setTarget(userInfo)} data-toggle="modal" data-target="#userInfoModal" style={{cursor: "pointer"}}> {isSet(userInfo.name)!=''?userInfo.name:"--"} </td>
                <td onClick={()=>props.setTarget(userInfo)} data-toggle="modal" data-target="#userInfoModal" style={{cursor: "pointer"}}> {isSet(userInfo.gender)!=''?genderDic[userInfo.gender]:"--"} </td>
                <td onClick={()=>props.setTarget(userInfo)} data-toggle="modal" data-target="#userInfoModal" style={{cursor: "pointer"}}> {isSet(userInfo.co)!=''?coDic[userInfo.co]:"--"} </td>
                <td onClick={()=>props.setTarget(userInfo)} data-toggle="modal" data-target="#userInfoModal" style={{cursor: "pointer"}}> {isSet(userInfo.lang)!=''?langDic[userInfo.lang]:"--"} </td>
                <td> {actionButton} </td>
            </tr>
        </>
    
}

const FriendListTable = (props) => {
    const [pending, setPending] = useState(true);
    const [tableData, setTableData] = useState({
        columns: [
            { 
                name: "", 
                selector: "picture", 
                sortable: false , 
                maxWidth:"100px", 
                style: { margin:"10px" },
                cell: (info) => <img src={isSet(info.picture)?info.picture:EmptyIcon} className='rounded-circle mx-auto' />
            },
            { name: "Name", selector: "name", sortable: true },
            { 
                name: "Gender", selector: "gender", sortable: true , 
                defaultContent: "--",
                cell: (info) => isSet(info.gender)? genderDic[info.gender] : "--"
            },
            { 
                name: "Nationality", selector: "co", sortable: true,
                cell: (info) => isSet(info.co)? coDic[info.co] : "--" 
            },
            { 
                name: "Language", selector: "lang", sortable: true,
                cell: (info) => isSet(info.lang)? langDic[info.lang] : "--" 
            }
        ],
        data: [],
    });

    let friendList;
    useEffect(() => {
        PostRequestSender("/friend//listfriendinfo", {id: props.user._id}, (e, data) => {
            if (e) {
                console.log(e);
                return
            }

            if (data.success) {
                friendList = []
                if (data.user) {
                    friendList = data.user;
                    friendList = friendList.map((val)=>{
                        return {...val, 
                            "id": val._id,
                            "lang": isSet(val.lang)?val.lang:"",
                            "co": isSet(val.co)?val.co:"",
                            "gender": isSet(val.gender)?val.gender:"",
                        }
                    })
                }
                setTableData({...tableData, "data": friendList})
            }

            setPending(false);
            setRowOnClickEvent();
        })
    }, [])

    const setRowOnClickEvent = () => {
        $(".rdt_TableRow").attr('data-toggle', 'modal')
        $(".rdt_TableRow").attr('data-target', '#userInfoModal')
        // $(".rdt_TableRow").css('cursor', 'pointer')
        $(".rdt_TableRow").on('click', (event) => {
            let rowId = $(event.target).parent().attr("id");
            let targetId = rowId.split('-').at(-1)
            let targetUser = friendList.find(e=>e._id == targetId)
            props.setTarget(targetUser)
        })
    }

    return (
        <DataTableExtensions
          {...tableData}
          export={false}
          print={false}
        >
          <DataTable
            noHeader
            // noDataComponent="No friend in the list"
            defaultSortFieldId="2"
            // defaultSortAsc={true}
            pagination
            highlightOnHover
            progressPending={pending}
            onChangeRowsPerPage={setRowOnClickEvent}
            onChangePage={setRowOnClickEvent}
            pointerOnHover={true}
          />
        </DataTableExtensions>
      );
}