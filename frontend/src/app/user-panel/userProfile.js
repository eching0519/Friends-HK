import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier'
import { EmptyIcon } from "../shared/Variable"
const querystring = require('querystring');

const UserProfile = (props) => {
    LoginVerifier(props)

    const [infoContent, setInfoContent] = useState({});
    const [preferenceContent, setPreferenceContent] = useState({});
    const [targetName, setTargetName] = useState("N/A");

    return (
        <>
        <div className="page-header">
            <h3 className="page-title"><span class="page-title-icon bg-gradient-primary text-white mr-2"><i class="mdi mdi-information-outline"></i></span> User Profile</h3>
        </div>

        <div className="row">
            <div className="col-md-3 grid-margin">
                <UserProfileSidebar user={props.user} target={props.user} targetId={props.user.id} detailed={false} action={false} setInfoContent={setInfoContent} setPreferenceContent={setPreferenceContent} setTargetName={setTargetName} />
                {/* <UserProfileSidebar user={props.user} targetId="6238539fd9d1a253646a53f6" detailed={true} action={true} setInfoContent={setInfoContent} setPreferenceContent={setPreferenceContent} setTargetName={setTargetName} furtherInfo={furtherInfo} /> */}
            </div>
            <div className="col-md-9 grid-margin stretch-card">
                <UserInfo  user={props.user} targetId={props.user.id} infoContent={infoContent} preferenceContent={preferenceContent} targetName={targetName} />
            </div>
        </div>
        </>
    );
}

export default UserProfile
export const UserProfileSidebar = (props) => {
    // props.detailed       <- display detailed
    // props.friendRequest  <- Has friend request
    // props.user
    // props.target
    const langDic = {"yue": "Cantonese", "cmn": "Mandarin", "eng": "English"};
    const coDic = {"NA": "North America", "SA": "South America", "ER": "Europe", "AS": "Asia", "AU": "Australia", "AF": "Africa", "CN": "China", "HK": "Hong Kong", "IN": "India", "ID": "Indonesia", "JP": "Japan", "KR": "South Korea", "MY": "Malaysia", "PH": "Philippines", "TW": "Taiwan", "TH": "Thailand", "VN": "Vietnam"};
    const genderDic = {"M": "Male", "F": "Female", "TM": "Trans male", "TF": "Trans female", "NB": "Non-binary", "ND": "Not Declare"};
    const badgeClass = ["badge badge-gradient-success ml-1 mt-1 badge-sm", 
                        "badge badge-gradient-primary ml-1 mt-1 badge-sm", 
                        "badge badge-gradient-warning ml-1 mt-1 badge-sm", 
                        "badge badge-gradient-info ml-1 mt-1 badge-sm", 
                        "badge badge-gradient-danger ml-1 mt-1 badge-sm"];
    const capitalize = (str) => { return str.charAt(0).toUpperCase() + str.slice(1); }

    const [target, setTarget] = useState(props.target);
    const [sidebarContent, setSidebarContent] = useState({});
    const [infoContent, setInfoContent] = useState({});
    const [preferenceContent, setPreferenceContent] = useState({});
    const [picture, setPicture] = useState(EmptyIcon);
    const [friendRequest, setFriendRequest] = useState(null);
    const [requestExist, setRequestExist] = useState(false);

    useEffect(()=>{
        console.log(friendRequest)
    },[friendRequest])
    
    useEffect(() => {
        if (!target) return;
        console.log(target)
        let userInfo = target;
        let preference = target.preferences;

        if (target.picture) setPicture(target.picture);

        let t_sidebarContent_minial = {
            "ID": userInfo._id,
            "Name": userInfo.name,
            "Gender": genderDic[userInfo.gender],
            "Nationality": coDic[userInfo.co],
            "First Language": langDic[userInfo.lang],
        }
        let t_sidebarContent = {
            ...t_sidebarContent_minial,
            "Birth": userInfo.dob,
            "Friend list": userInfo.friendlist===undefined? 0 : userInfo.friendlist.length,
            "Status": capitalize(userInfo.status)
        }
        let hobbies = (userInfo.hobbies !== undefined)? userInfo.hobbies : [];
        let hashtags = (userInfo.hashtags !== undefined)? userInfo.hashtags : [];
        let t_infoContent = {
            "Hobbies": hobbies.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{x}</span>),
            "Hashtags": hashtags.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{x}</span>),
            "Bio": userInfo.bio
        }
        let lang = [], gender = [], ageRange = "";
        if(preference != undefined && preference !== null) {
            console.log(preference)
            lang = (preference.lang === undefined)? [] : preference.lang;
            gender = (preference.gender !== undefined)? preference.gender : [];
            ageRange = (preference.ageFrom===undefined)? '' : preference.ageFrom + " ~ " + preference.ageTo;
        }
        let t_preferenceContent = {
            "Language": lang.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{langDic[x]}</span>),
            "Gender": gender.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{genderDic[x]}</span>),
            "Age": ageRange
        }
        setSidebarContent(props.minimal ? t_sidebarContent_minial : t_sidebarContent);
        setInfoContent(t_infoContent);
        props.setInfoContent(t_infoContent);
        setPreferenceContent(t_preferenceContent);
        props.setPreferenceContent(t_preferenceContent);
        props.setTargetName(target.name);

    }, [target])

    const TableItem = (props) => {
        return (
            <div className={props.minimal? 'row justify-content-between' : 'row justify-content-between mt-3 mb-3'}>
                <strong className='text-break'>{props.title}</strong>
                <div className='text-break'>{props.value===undefined?'N/A':props.value}</div>
            </div>
        )
    }

    const getTargetInfo = async (targetId) => {
        let url = '/admin/getuserbyid';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
              id : targetId
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }
        if (data.success) setTarget(data.user);
    }

    const getFriendRequest = async () => {
        let url = '/friend/findRequest';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
              user1 : props.targetId,
              user2: props.user.id
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }

        if (data.success) {
            setFriendRequest(data.request);
            setRequestExist(true);
            return;
        }
        setRequestExist(false);
    }

    const sendFriendRequest = async () => {
        let url = '/friend/sendRequest';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                'from' : props.user.id,
                'to': props.targetId,
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }

        getFriendRequest();
        // if (data.success) {
        //     setFriendRequest(data.request);
        //     setRequestExist(true);
        //     return;
        // }
        // console.log(data.message)
        // setRequestExist(false);
    }

    const cancelFriendRequest = async () => {
        let url = '/friend/cancelRequest';

        console.log(friendRequest.id)

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                id: friendRequest.id
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }

        if (data.success) {
            setFriendRequest(false);
            setRequestExist(false);
            return;
        } else {
            console.log(data.message)
            setFriendRequest(false);
            setRequestExist(false);
        }
    }

    const acceptFriendRequest = async () => {
        let url = '/friend/acceptRequest';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                from : props.targetId,
                to: props.user.id
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }

        if (data.success) {
            setFriendRequest(data.request);
            setRequestExist(true);
            return;
        }
        // getFriendRequest()
    }

    const rejectFriendRequest = async (targetId, userId) => {
        let url = '/friend/rejectRequest';

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                from : targetId,
                to: userId
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }

        // if (data.success) {
        //     setFriendRequest(data.request);
        //     setRequestExist(true);
        //     return;
        // }
        getFriendRequest()
    }

    return (
        <div className="card" onLoad={()=>{
            if (target==null) getTargetInfo(props.targetId);
            getFriendRequest(props.targetId, props.user.id)
        }}>
            <div className="card-body">
                <div className="pl-4 pr-4">
                    <img className="rounded-circle userSidebar-img" src={picture} />
                    {Object.entries(sidebarContent).map((info, key) => 
                    <>
                        <div class="dropdown-divider"></div>
                        <TableItem title={info[0]} value={info[1]} />
                    </>)}

                    {props.detailed && Object.entries(infoContent).map((info, key) => 
                    <>
                        <div class="dropdown-divider"></div>
                        <TableItem title={info[0]} value={info[1]} />
                    </>)}
                </div>
                {props.detailed && (<>
                    <p className="card-description mt-5">Matching Preferences</p>
                    <div className="pl-4 pr-4">
                        {Object.entries(preferenceContent).map((info, key) => 
                        <>
                            <TableItem title={info[0]} value={info[1]} />
                            <div class="dropdown-divider"></div>
                        </>)}
                    </div>
                </>) }

                {props.furtherInfo &&
                    <div className='pl-4 pr-4'>
                        <p className="card-description mt-5">Others</p>
                        {Object.entries(props.furtherInfo).map((info, key) => 
                        <>
                            <TableItem title={info[0]} value={info[1]} />
                            <div class="dropdown-divider"></div>
                        </>)}
                    </div>}

                <div className="pl-4 pr-4">
                {props.action && 
                    <>
                        {props.user.id != props.targetId && !requestExist && <button className="btn btn-gradient-primary w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            sendFriendRequest();
                            console.log(requestExist)
                            console.log(friendRequest)
                            window.alert("Friend request is sent");
                        }}>Add Friend</button>}
                        {requestExist && friendRequest.from===props.user.id && friendRequest.status==='pending' && <button className="btn btn-gradient-primary w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            cancelFriendRequest();
                            console.log(requestExist)
                            console.log(friendRequest)
                        }}>Cancel Friend Request</button>}
                        {requestExist && friendRequest.to===props.user.id && friendRequest.status==='pending' && <button className="btn btn-gradient-primary w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            acceptFriendRequest();
                            console.log(requestExist)
                            console.log(friendRequest)
                        }}>Accept Friend Request</button>}
                        {requestExist && friendRequest.to===props.user.id && friendRequest.status==='pending' && <button className="btn btn-light w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            rejectFriendRequest();
                            console.log(requestExist)
                            console.log(friendRequest)
                        }}>Reject Friend Request</button>}
                        {/* <button className="btn btn-gradient-dark w-100 mt-2">Blacklisting</button> */}
                    </>
                }
                </div>
            </div>
        </div>
    )
}

const UserInfo = (props) => {
    // const langDic = {"yue": "Cantonese", "cmn": "Mandarin", "eng": "English"};
    // const genderDic = {"M": "Male", "F": "Female", "TM": "Trans male", "TF": "Trans female", "NB": "Non-binary", "ND": "Not Declare"};
    // const badgeClass = ["badge badge-gradient-success ml-1 mt-1 badge-md", 
    //                     "badge badge-gradient-primary ml-1 mt-1 badge-md", 
    //                     "badge badge-gradient-warning ml-1 mt-1 badge-md", 
    //                     "badge badge-gradient-info ml-1 mt-1 badge-md", 
    //                     "badge badge-gradient-danger ml-1 mt-1 badge-md"];
    

    const TableItem = (props) => {
        return (
            <div className='row justify-content-between mt-3 mb-3'>
                <strong className='text-break'>{props.title}</strong>
                <div className='d-flex flex-wrap text-break'>{props.value===undefined?'N/A':props.value}</div>
            </div>
        )
    }

    return (
        <div className="card">
            <div className="card-body">
                <div className="card-title">
                    {props.targetName}'s profile
                </div>
                <p className="card-description">More About Me</p>
                <div className="pl-4 pr-4">
                    {Object.entries(props.infoContent).map((info, key) => 
                    <>
                        <TableItem title={info[0]} value={info[1]} />
                        <div class="dropdown-divider"></div>
                    </>)}
                </div>
                <p className="card-description mt-5">People I'm willing to meet with</p>
                <div className="pl-4 pr-4">
                    {Object.entries(props.preferenceContent).map((info, key) => 
                    <>
                        <TableItem title={info[0]} value={info[1]} />
                        <div class="dropdown-divider"></div>
                    </>)}
                </div>
            </div>
        </div>
    )
}