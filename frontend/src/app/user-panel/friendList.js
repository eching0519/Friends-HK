import React, { useEffect, useState } from 'react';
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

    return (
        <>
        <div className="page-header">
            <h3 className="page-title"><span className="page-title-icon bg-gradient-primary text-white mr-2"><i className="mdi mdi-account-multiple"></i></span> Friend List</h3>
        </div>

        <div className="col-lg-12 grid-margin stretch-card">
   <div className="card">
      <div className="card-body">
         <h4 className="card-title">Friend Request</h4>
         <p className="card-description"> Incoming Request</p>
         <div className="table-responsive">
            <table className="table table-striped">
               <thead>
                  <tr>
                     <th> User </th>
                     <th> First name </th>
                     <th> Progress </th>
                     <th> Amount </th>
                     <th> Deadline </th>
                  </tr>
               </thead>
               <tbody>
                   <TableRow />
                   {/* {inRequest.map((value, key) => 
                       <span>{value.from.name}</span>
                   )} */}
               </tbody>
            </table>
         </div>
      </div>
   </div>
</div>
        </>
    );
}

export default FriendList

const TableRow = (props) => {
    // props.user.picture
    // props.user.name
    // props.user.gender
    // props.user.lang
    // props.user.co
    return (
        <tr>
            <td className="py-1"><img src="/demo/purple-react-free/template/demo_1/preview/static/media/face1.42d41e61.jpg" alt="user icon" /></td>
            <td> Herman Beck </td>
            <td>
            <div className="progress">
            </div>
            </td>
            <td> $ 77.99 </td>
            <td> May 15, 2015 </td>
        </tr>
    )
}