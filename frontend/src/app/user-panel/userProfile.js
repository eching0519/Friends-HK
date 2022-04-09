import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier'
import AccountSettings from '../component/settings/account';
import ProfileSettings from '../component/settings/profile';
import PrivacySettings from '../component/settings/privacy'
import AlertMessage from '../component/common/AlertMessage';
import { Trans } from 'react-i18next';

const UserProfile = (props) => {
    LoginVerifier(props)


    return (
        <>
        <div className="page-header">
            <h3 className="page-title"><span class="page-title-icon bg-gradient-primary text-white mr-2"><i class="mdi mdi-information-outline"></i></span> User Profile</h3>
        </div>

        <div className="row">
            <div className="col-md-3 grid-margin">
                <UserProfileSidebar user={props.user} />
            </div>
            <div className="col-md-9 grid-margin stretch-card">
                <UserInfo  user={props.user} />
            </div>
        </div>
        </>
    );
}

export default UserProfile
export const UserProfileSidebar = (props) => {
    // detail
    const langDic = {"yue": "Cantonese", "cmn": "Mandarin", "eng": "English"};
    const coDic = {"NA": "North America", "SA": "South America", "ER": "Europe", "AS": "Asia", "AU": "Australia", "AF": "Africa", "CN": "China", "HK": "Hong Kong", "IN": "India", "ID": "Indonesia", "JP": "Japan", "KR": "South Korea", "MY": "Malaysia", "PH": "Philippines", "TW": "Taiwan", "TH": "Thailand", "VN": "Vietnam"};
    const genderDic = {"M": "Male", "F": "Female", "TM": "Trans male", "TF": "Trans female", "NB": "Non-binary", "ND": "Not Declare"};
    const badgeClass = ["badge badge-gradient-success ml-1 mt-1", 
                        "badge badge-gradient-primary ml-1 mt-1", 
                        "badge badge-gradient-warning ml-1 mt-1", 
                        "badge badge-gradient-info ml-1 mt-1", 
                        "badge badge-gradient-danger ml-1 mt-1"];
    const capitalize = (str) => { return str.charAt(0).toUpperCase() + str.slice(1); }
    const emptyFace = require("../../assets/images/emptyFace.png");
    
    let userInfo = props.user;
    let preference = props.user.preferences;

    let picture = props.user.picture;
    if (picture === undefined) picture = emptyFace;

    let sidebarContent = {
        "ID": userInfo.id,
        "Name": userInfo.name,
        "Gender": genderDic[userInfo.gender],
        "Nationality": coDic[userInfo.co],
        "First Language": langDic[userInfo.lang],
        "Birth": userInfo.dob,
        "Friend list": userInfo.friendlist.length,
        "Status": capitalize(userInfo.status),
    }

    const TableItem = (props) => {
        return (
            <div className='row justify-content-between mt-3 mb-3'>
                <strong className='text-break'>{props.title}</strong>
                <div className='text-break'>{props.value===undefined?'N/A':props.value}</div>
            </div>
        )
    }
    return (
        <div className="card">
            <div className="card-body">
                <div className="pl-4 pr-4">
                    <img className="rounded-circle userSidebar-img" src={picture} />
                    {Object.entries(sidebarContent).map((info, key) => 
                    <>
                        <div class="dropdown-divider"></div>
                        <TableItem title={info[0]} value={info[1]} />
                    </>)}
                </div>
            </div>
        </div>
    )
}

const UserInfo = (props) => {
    let userInfo = props.user;
    let preference = props.user.preferences;

    const langDic = {"yue": "Cantonese", "cmn": "Mandarin", "eng": "English"};
    const genderDic = {"M": "Male", "F": "Female", "TM": "Trans male", "TF": "Trans female", "NB": "Non-binary", "ND": "Not Declare"};
    const badgeClass = ["badge badge-gradient-success ml-1 mt-1", 
                        "badge badge-gradient-primary ml-1 mt-1", 
                        "badge badge-gradient-warning ml-1 mt-1", 
                        "badge badge-gradient-info ml-1 mt-1", 
                        "badge badge-gradient-danger ml-1 mt-1"];

    let infoContent = {
        "Hobbies": userInfo.hobbies.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{x}</span>),
        "Hashtags": userInfo.hashtags.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{x}</span>),
        "Bio": userInfo.bio
    }
    let preferenceContent = {
        "Language": preference.lang.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{langDic[x]}</span>),
        "Gender": preference.gender.map(x => <span className={badgeClass[Math.floor(Math.random()*badgeClass.length)]}>{genderDic[x]}</span>),
        "Age": (preference.ageFrom===undefined)? '' : preference.ageFrom + " ~ " + preference.ageTo
    }

    console.log(infoContent)

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
                    {props.user.name}'s Profile
                </div>
                <p className="card-description">More About Me</p>
                <div className="pl-4 pr-4">
                    {Object.entries(infoContent).map((info, key) => 
                    <>
                        <TableItem title={info[0]} value={info[1]} />
                        <div class="dropdown-divider"></div>
                    </>)}
                </div>
                <p className="card-description mt-5">People I'm willing to meet with</p>
                <div className="pl-4 pr-4">
                    {Object.entries(preferenceContent).map((info, key) => 
                    <>
                        <TableItem title={info[0]} value={info[1]} />
                        <div class="dropdown-divider"></div>
                    </>)}
                </div>
            </div>
        </div>
    )
}