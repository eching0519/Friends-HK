import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier'

const AdminHome = (props) => {
    let admin = JSON.parse(sessionStorage.getItem('AdminProfile'));
    if (admin === null) { admin = {name: "N/A"} }

    return (
        <>
            <h3>Hi {admin.name}. Welcome back!</h3>
        </>
    );
}

export default AdminHome