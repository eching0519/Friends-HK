import React, { useEffect, useState } from 'react';
import RegisterBox from "../component/register/RegisterBox";
import RegisterSuccess from "../component/register/RegisterSuccess";
import AlertMessage from '../component/common/AlertMessage';

const Register = () => {

  const [alert, setAlert] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  return (
    <div>
      <div className="d-flex align-items-center auth px-0 make-friends-background">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            {alert.visible === true && <AlertMessage alert={alert} setAlert={setAlert} />}
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              
              <div className="brand-logo">
                <img src={require("../../assets/images/logo.svg")} alt="logo" />
              </div>
              {!registerSuccess && <RegisterBox setAlert={setAlert} setRegisterSuccess={setRegisterSuccess} />}
              {registerSuccess && <RegisterSuccess />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register
