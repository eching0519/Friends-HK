import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier'
import AccountSettings from '../component/settings/account';
import PreferenceSettings from '../component/settings/preferences';
import PrivacySettings from '../component/settings/privacy'
import AlertMessage from '../component/common/AlertMessage';
import { Trans } from 'react-i18next';

const Settings = (props) => {
    LoginVerifier(props)
    
    const [settingType, setType] = useState('account');
    const [alert, setAlert] = useState({visible:false});

    if (props.settingType != null)
        setType(props.settingType);

    const trial = (e) => {
        setAlert({
            visible: true,
            strongMsg: 'Testing',
            msg: 'test1'
        })
    }

    // useEffect(() => {
    //     console.log("Picture change (Settings)");
    // }, [props.user.picture])

    return (
        <>
        <div className="page-header">
            <h3 className="page-title" onClick={trial}>Settings</h3>
            {/* <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="!#">Forms</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Form elements
                    </li>
                </ol>
            </nav> */}
        </div>

        <div className="row">
            <div className="col-md-3 grid-margin">
                <div className="card">
                    <div className="bottonlist preview-list">
                        
                        <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e)=>{
                            e.preventDefault();
                            setType('account');
                        }}>
                            <i className="mdi mdi-account-outline mr-2 text-danger h3"></i><span className={settingType!=='account'? '' : 'font-weight-bold'}><Trans>Account</Trans></span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e)=>{
                            e.preventDefault();
                            setType('preferences');
                        }}>
                            <i className="mdi mdi-settings mr-2 text-success h3"></i><span className={settingType!=='preferences'? '' : 'font-weight-bold'}><Trans>Preferences</Trans></span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e)=>{
                            e.preventDefault();
                            setType('privacy');
                        }}>
                            <i className="mdi mdi-logout mr-2 text-primary h3"></i><span className={settingType!=='privacy'? '' : 'font-weight-bold'}><Trans>Privacy</Trans></span>
                        </a>
                    </div>
                </div>
            </div>
            
            <div className="col-md-9 grid-margin stretch-card">
                <div className='w-100'>
                    {alert.visible === true && <AlertMessage alert={alert} setAlert={setAlert}/>}
                    <div className="card">
                        <div className="card-body">
                            {settingType==='account' && <AccountSettings user={props.user} setAlert={setAlert} setUser={props.setUser} />}
                            {settingType==='preferences' && <PreferenceSettings user={props.user} setAlert={setAlert} setUser={props.setUser} />}
                            {settingType==='privacy' && <PrivacySettings user={props.user} setAlert={setAlert} setUser={props.setUser} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Settings