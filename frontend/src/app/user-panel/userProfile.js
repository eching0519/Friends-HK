import React, { useEffect, useState } from 'react';
// import LoginVerifier from '../component/common/LoginVerifier'
import { EmptyIcon } from "../shared/Variable"
const querystring = require('querystring');

const UserProfile = (props) => {
    // LoginVerifier(props)

    const [infoContent, setInfoContent] = useState({});
    const [preferenceContent, setPreferenceContent] = useState({});
    const [targetName, setTargetName] = useState("--");

    

    return (
        <>
        <div className="page-header">
            <h3 className="page-title"><span class="page-title-icon bg-gradient-primary text-white mr-2"><i class="mdi mdi-information-outline"></i></span> User Profile</h3>
        </div>

        <div className="row">
            <div className="col-md-3 grid-margin">
                <UserProfileSidebar user={props.user} target={props.user} targetId={props.user._id} detailed={false} action={false} setInfoContent={setInfoContent} setPreferenceContent={setPreferenceContent} setTargetName={setTargetName} />
                {/* <UserProfileSidebar user={props.user} targetId="6238539fd9d1a253646a53f6" detailed={true} action={true} setInfoContent={setInfoContent} setPreferenceContent={setPreferenceContent} setTargetName={setTargetName} furtherInfo={furtherInfo} /> */}
            </div>
            <div className="col-md-9 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body">
                        <UserInfoDetail  user={props.user} targetId={props.user._id} infoContent={infoContent} preferenceContent={preferenceContent} targetName={targetName} />
                    </div>
                </div>
            </div>
        </div>
        {/* <UserProfileSidebar user={props.user} target={props.user} targetId={props.user._id} detailed={false} action={false} setInfoContent={setInfoContent} setPreferenceContent={setPreferenceContent} setTargetName={setTargetName} />
        <UserInfoModalButton triggerBtn={<div>Hi</div>}></UserInfoModalButton>
        <UserInfoModal content={userProfile} /> */}
        </>
    );
}

export default UserProfile

export const UserInfoModal = (props) => {
    return (
        <>
            <div class="modal fade modal-custom" id="userInfoModal" tabindex="-1" role="dialog" aria-labelledby="userInfoModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content modal-user-profile">
                    {props.content}
                    </div>
                </div>
            </div>
        </>
    )
}

export const UserInfoModalButton = (props) => {
    return (<a href='#' onClick={(e)=>e.preventDefault()} data-toggle="modal" data-target="#userInfoModal">{props.triggerBtn}</a>)
}

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
    const capitalize = (str) => { 
        if (typeof(str) !== 'string') return str
        return str.charAt(0).toUpperCase() + str.slice(1); 
    }

    const [target, setTarget] = useState(props.target);
    const [sidebarContent, setSidebarContent] = useState({});
    const [infoContent, setInfoContent] = useState({});
    const [preferenceContent, setPreferenceContent] = useState({});
    const [picture, setPicture] = useState(EmptyIcon);
    const [friendRequest, setFriendRequest] = useState(null);
    const [requestExist, setRequestExist] = useState(false);

    // useEffect(()=>{
        
    // },[target])
    // useEffect(()=>{
    //     console.log(friendRequest)
    // },[friendRequest])

    useEffect(() => {
        setTarget(props.target);
    }, [props.target])

    useEffect(() => {
        if (props.targetId == null) return
        // setTarget(props.targetId);
        getTargetInfo(props.targetId);
    }, [props.targetId])
    
    useEffect(() => {
        if (!target) return;
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
            "Friend list": (userInfo.friendlist===undefined? 0 : userInfo.friendlist.length) + ' ppl',
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
        if(preference !== undefined && preference != null) {
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
        getFriendRequest();

    }, [target])

    const TableItem = (props) => {
        return (
            <div className={props.minimal? 'row justify-content-between' : 'row justify-content-between mt-3 mb-3'}>
                <strong className='text-break'>{props.title}</strong>
                <div className='text-ellipsis'>{props.value===undefined?'--':props.value}</div>
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
              user1 : props.target._id,
              user2: props.user._id
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }

        console.log("getFriendRequest", data);
        if (data.success) {
            setFriendRequest(data.request);
            setRequestExist(true);
            return;
        }
        // getFriendRequest();
        setRequestExist(false);
    }

    const sendFriendRequest = async () => {
        let url = '/friend/sendRequest';

        console.log(props.user._id)
        console.log(target._id)

        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: querystring.stringify({
                'from' : props.user._id,
                'to': target._id,
            })
        });
    
        let data
        try {
            data = await res.json();
        } catch (error) {
          return;
        }
        console.log("sendFriendRequest",data)

        // getFriendRequest();
        if (data.success) {
            console.log(data)
            setFriendRequest(data.request);
            setRequestExist(true);
            return;
        }
        window.alert(data.message)
        getFriendRequest();
        // setRequestExist(false);
    }

    const cancelFriendRequest = async () => {
        let url = '/friend/cancelRequest';

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
        }
        window.alert(data.message)
        getFriendRequest();
    }

    const acceptFriendRequest = async (targetId, userId) => {
        let url = '/friend/acceptRequest';

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

        if (data.success) {
            setFriendRequest(false);
            setRequestExist(false);
            props.setUser({...props.user, 'friendlist':[...props.user.friendlist, targetId]})
            // sessionStorage.setItem('UserProfile', JSON.stringify({...props.user, 'friendlist':[...props.user.friendlist, targetId]}))
            return;
        }
        window.alert(data.message)
        getFriendRequest();
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

        if (data.success) {
            setFriendRequest(false);
            setRequestExist(false);
            return;
        }
        getFriendRequest()
    }

    useEffect(() => {
        if (target==null && props.targetId!=null) getTargetInfo(props.targetId);
        // if (props.targetId!=null && props.user!=null) getFriendRequest(props.targetId, props.user._id)
        console.log("isFriend", isFriend())
    }, [])

    const isFriend = () => {
        if (!props.action) return
        if (props.user._id == props.target._id)
            return false
        // User has no friend in list
        if (props.user.friendlist == undefined || props.user.friendlist == null)
            return false
        if (props.user.friendlist.length == 0)
            return false
        if (!props.user.friendlist.includes(props.target._id))
            return false
        return true
    }

    return (
        <>
        <div className="card">
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
                        {/* <p className="card-description mt-5">Others</p> */}
                        <div class="dropdown-divider"></div>
                        {Object.entries(props.furtherInfo).map((info, key) => 
                        <>
                            <TableItem title={info[0]} value={info[1]} />
                            <div class="dropdown-divider"></div>
                        </>)}
                    </div>
                }

                <div className="pl-4 pr-4">
                {props.action && 
                    <>
                        {console.log("requestExist", requestExist)}
                        {!isFriend() &&
                         !requestExist && <button className="btn btn-gradient-primary w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            sendFriendRequest();
                            // console.log("requestExist", requestExist)
                            // console.log(friendRequest)
                            window.alert("Friend request is sent");
                        }}>Add Friend</button>}
                        {requestExist && friendRequest.from===props.user._id && friendRequest.status==='pending' && <button className="btn btn-gradient-primary w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            cancelFriendRequest();
                            // console.log(requestExist)
                            // console.log(friendRequest)
                        }}>Cancel Friend Request</button>}
                        {requestExist && friendRequest.to===props.user._id && friendRequest.status==='pending' && <button className="btn btn-gradient-primary w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            acceptFriendRequest(target.id, props.user._id);
                            // console.log(requestExist)
                            // console.log(friendRequest)
                        }}>Accept Friend Request</button>}
                        {requestExist && friendRequest.to===props.user._id && friendRequest.status==='pending' && <button className="btn btn-light w-100 mt-2" onClick={(e)=>{
                            e.preventDefault();
                            rejectFriendRequest(target.id, props.user._id);
                            // console.log(requestExist)
                            // console.log(friendRequest)
                        }}>Reject Friend Request</button>}
                        {/* <button className="btn btn-gradient-dark w-100 mt-2">Blacklisting</button> */}
                    </>
                }
                </div>
            </div>
        </div>
        </>
    )
}

export const UserInfoDetail = (props) => {
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
                <div className='d-flex flex-wrap text-break'>{props.value===undefined?'--':props.value}</div>
            </div>
        )
    }

    return (
        <>
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
        </>
    )
}