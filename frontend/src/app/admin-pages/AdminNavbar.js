import React, { Component } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { EmptyIcon } from "../shared/Variable"

const AdminNavbar = (props) => {
  let admin = JSON.parse(sessionStorage.getItem('AdminProfile'));

  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  const Signout = () => {
    sessionStorage.removeItem('AdminProfile');
    window.location.pathname = "/admin/login";
  }

  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <Link className="navbar-brand brand-logo" to="/"><img src={require('../../assets/images/logo.svg')} alt="logo" /></Link>
        <Link className="navbar-brand brand-logo-mini" to="/"><img src={require('../../assets/images/logo-mini.svg')} alt="logo" /></Link>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button className="navbar-toggler navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
          <li className="nav-item nav-profile">
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link">
                <div className="nav-profile-img">
                  <img src={EmptyIcon} alt="user"/>
                </div>
                <div className="nav-profile-text">
                  <p className="mb-1 text-black">{admin===null? "N/A" : admin.name}</p>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown">
                <Dropdown.Item href="!#" onClick={evt =>{ evt.preventDefault(); Signout(); }}>
                  <i className="mdi mdi-logout mr-2 text-primary"></i>
                  <Trans>Signout</Trans>
                  {/* <Link className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" to="/admin/home ">SIGN IN</Link> */}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
  
}

export default AdminNavbar;
