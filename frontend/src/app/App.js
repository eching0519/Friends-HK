import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import AdminNavbar from './admin-pages/AdminNavbar';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import SettingsPanel from './shared/SettingsPanel';
import Footer from './shared/Footer';
import { withTranslation } from "react-i18next";

const App = (props) => {
  const [location, setLocation] = useState(props.location)
  const [isFullPageLayout, setIsFullPageLayout] = useState(true)
  const [isAdminPageLayout, setIsAdminPageLayout] = useState(false)

  useEffect(() => {
    console.log("ROUTE CHANGED");
    const { i18n } = props;
    const body = document.querySelector('body');
    if(location.pathname === '/layout/RtlLayout') {
      body.classList.add('rtl');
      i18n.changeLanguage('ar');
    }
    else {
      body.classList.remove('rtl')
      i18n.changeLanguage('en');
    }
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/login', '/register', '/verify', '/admin/login']
    fullPageLayoutRoutes.push('/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page');
    const adminPageLayoutRoutes = ['/admin', '/admin/login']

    for ( let i = 0; i < adminPageLayoutRoutes.length; i++ ) {
      if (props.location.pathname === adminPageLayoutRoutes[i]) {
        // Admin page
        setIsAdminPageLayout(true);
      } else {
        setIsAdminPageLayout(false);
      }
    }

    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (props.location.pathname === fullPageLayoutRoutes[i]) {
        setIsFullPageLayout(true);
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        setIsFullPageLayout(false);
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }, [location]);

  let myUser = JSON.parse(sessionStorage.getItem('UserProfile'));
  const [user, setUser] = useState(myUser)
  
  let navbarComponent = !isFullPageLayout ? (!isAdminPageLayout ? <Navbar user={user}/> : <AdminNavbar />) : '';
  let sidebarComponent = (!isFullPageLayout && isAdminPageLayout) ? <Sidebar/> : '';
  let SettingsPanelComponent = !isFullPageLayout ? <SettingsPanel/> : '';
  // let footerComponent = !isFullPageLayout ? <Footer/> : '';

  return (
    <>
      <div className="container-scroller">
        { navbarComponent }
        <div className="container-fluid page-body-wrapper">
          { sidebarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes user={user} setUser={setUser} />
              { SettingsPanelComponent }
            </div>
            {/* { footerComponent } */}
          </div>
        </div>
      </div>
    </>
  );
}

export default withTranslation() (withRouter(App));
