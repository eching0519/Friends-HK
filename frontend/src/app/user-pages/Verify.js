import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
var hasSent = false;

const Verify = () => {
    const [errorMessage, setErrorMessage] = useState('login');

    const verifyUser = async () => {
        if (hasSent) return;

        hasSent = true
        let urlData = window.location.search;
        let queryData = new URLSearchParams(urlData);
        let m = queryData.get('m');
        let id = queryData.get('id');

        console.log("m:"+m)
        console.log(id)

        let url = '/user/activate' + urlData
        let res = await fetch(url);
        
        let data
        try {
            data = await res.json();
        } catch (error) {
            setErrorMessage(`Unknown error. (${error.message})`);
        }

        console.log(JSON.stringify(data))

        if (!data.success) {
            setErrorMessage(data.message);
            console.log(errorMessage)
        } else {
            setErrorMessage('');
        }
    }

    return (
        <div onLoadStart={verifyUser()}>
          <div className="d-flex align-items-center auth px-0 make-friends-background">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  
                    <div className="brand-logo">
                        <img src={require("../../assets/images/logo.svg")} alt="logo" />
                    </div>
                    <div className="text-center">
                        <h1>
                            {errorMessage=='' && 'Welcome!'}
                            {errorMessage!='' && 'Oops..'}
                        </h1>
                        <p>
                            {errorMessage=='' && 'You can now login to Friends@HK.'}
                            {errorMessage!='' && errorMessage}
                        </p>
                        <div className="text-center mt-4 font-weight-light">
                            Back to <Link to="/login" className="text-primary">Login</Link> page
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default Verify