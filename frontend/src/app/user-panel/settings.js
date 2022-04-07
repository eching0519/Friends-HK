import React, { useEffect, useState } from 'react';
import LoginVerifier from '../component/common/LoginVerifier'
import AccountSettings from '../component/settings/account';
import ProfileSettings from '../component/settings/profile';
import PrivacySettings from '../component/settings/privacy'
import AlertMessage from '../component/common/AlertMessage';
import { Trans } from 'react-i18next';

const Settings = (props) => {
    LoginVerifier(props)
    
    const [formChanged, setFormChanged] = useState(false)
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

    useEffect(() => {
        setFormChanged(false);
    }, [settingType])

    useEffect(() => {
        sessionStorage.setItem('UserProfile', JSON.stringify(props.user));
        setFormChanged(false);
        console.log("User changed")
        window.scrollTo(0, 0);
    }, [props.user])

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
                            if (settingType!=='account' && formChanged) {
                                var leave = window.confirm("Leave this page without saving changes?")
                                if (!leave) return
                            }
                            setType('account');
                        }}>
                            <i className="mdi mdi-account-outline mr-2 text-danger h3"></i><span className={settingType!=='account'? '' : 'font-weight-bold'}><Trans>Account</Trans></span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e)=>{
                            e.preventDefault();
                            if (settingType!=='profile' && formChanged) {
                                var leave = window.confirm("Leave this page without saving changes?")
                                if (!leave) return
                            }
                            setType('profile');
                        }}>
                            <i className="mdi mdi-settings mr-2 text-success h3"></i><span className={settingType!=='profile'? '' : 'font-weight-bold'}><Trans>Profile</Trans></span>
                        </a>
                        <div className="dropdown-divider"></div>
                        <a href="!#" className="dropdown-item d-flex justify-content-center" onClick={(e)=>{
                            e.preventDefault();
                            if (settingType!=='privacy' && formChanged) {
                                var leave = window.confirm("Leave this page without saving changes?")
                                if (!leave) return
                            }
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
                            {settingType==='account' && <AccountSettings user={props.user} setAlert={setAlert} setUser={props.setUser} setFormChanged={setFormChanged} />}
                            {settingType==='profile' && <ProfileSettings user={props.user} setAlert={setAlert} setUser={props.setUser} setFormChanged={setFormChanged} />}
                            {settingType==='privacy' && <PrivacySettings user={props.user} setAlert={setAlert} setUser={props.setUser} setFormChanged={setFormChanged} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Settings