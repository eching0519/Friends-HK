import React, { useEffect, useState } from 'react';
const querystring = require('querystring');

const sendFriendRequest = async (from, to) => {
    let url = 'http://localhost:8080/friend/sendRequest';

    let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
            'from' : from,
            'to': to,
        })
    });

    let data
    try {
        data = await res.json();
    } catch (error) {
        window.alert(error.message);
        return;
    }
}

const cancelFriendRequest = async (requestId) => {
    console.log("requestId", requestId)
    let url = 'http://localhost:8080/friend/cancelRequest';

    let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
            id: requestId
        })
    });

    let data
    try {
        data = await res.json();
    } catch (error) {
        window.alert(error.message);
        return;
    }
}

const rejectFriendRequest = async (id) => {
    console.log("requestId",id)
    let url = 'http://localhost:8080/friend/rejectRequest';

    let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
            id : id
        })
    });

    let data
    try {
        data = await res.json();
    } catch (error) {
        window.alert(error.message);
        return;
    }
}

const acceptFriendRequest = async (from, to) => {
    let url = 'http://localhost:8080/friend/acceptRequest';

    let res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: querystring.stringify({
            from : from,
            to: to
        })
    });

    let data
    try {
        data = await res.json();
    } catch (error) {
        window.alert(error.message);
        return;
    }
}

export const AddFriendButton = (props) => {
    return (
        <button className={props.className} onClick={async (e)=>{
            e.preventDefault();
            await sendFriendRequest(props.request.from, props.request.to);
            props.next();
        }}>{props.text!=null?props.text:"Add Friend"}</button>
    )
}

export const CancelButton = (props) => {
    return (
        <button className={props.className} onClick={async (e)=>{
            e.preventDefault();
            await cancelFriendRequest(props.request._id==undefined?props.request.id:props.request._id);
            props.next();
        }}>{props.text!=null?props.text:"Cancel Friend Request"}</button>
    )
}

export const RejectButton = (props) => {
    console.log("RejectButton", props.request)
    return (
        <button className={props.className} onClick={async (e)=>{
            e.preventDefault();
            await rejectFriendRequest(props.request._id==undefined?props.request.id:props.request._id);
            props.next();
        }}>{props.text!=null?props.text:"Reject Friend Request"}</button>
    )
}

export const AcceptButton = (props) => {
    return (
        <button className={props.className} onClick={async (e)=>{
            e.preventDefault();
            await acceptFriendRequest(props.request.from, props.request.to);
            props.next();
        }}>{props.text!=null?props.text:"Accept Friend Request"}</button>
    )
}