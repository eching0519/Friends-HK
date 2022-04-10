import React, { useEffect, useState } from 'react';
const querystring = require('querystring');

const sendFriendRequest = async (from, to) => {
    let url = '/friend/sendRequest';

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
    let url = '/friend/cancelRequest';

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

const rejectFriendRequest = async (from, to) => {
    let url = '/friend/rejectRequest';

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

const acceptFriendRequest = async (from, to) => {
    let url = '/friend/acceptRequest';

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
            await cancelFriendRequest(props.request._id);
            props.next();
        }}>{props.text!=null?props.text:"Cancel Friend Request"}</button>
    )
}

export const RejectButton = (props) => {
    return (
        <button className={props.className} onClick={async (e)=>{
            e.preventDefault();
            await rejectFriendRequest(props.request.from, props.request.to);
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