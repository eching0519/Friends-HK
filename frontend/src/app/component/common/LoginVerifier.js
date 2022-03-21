const querystring = require('querystring');

const LoginVerifier = async (props) => {

    if (props.user === null) {
        window.location.replace("/login");
        return
    }

    let myUser = JSON.parse(sessionStorage.getItem('UserProfile'));
    
    let url = '/checkSession';
      let res = await fetch(url, {
          method: 'GET',
      });

      let data;
      var msgUrl;
      try {
          data = await res.json();
      } catch (error) {
            msgUrl = querystring.encode({smsg:'Error!', msg: `Unexpected error. (${error.message})`})
            window.location.replace("/login?" + msgUrl);
            return
      }

      const loginVerification = data.verification;
      if (loginVerification) {
          if (loginVerification.email !== myUser.email && loginVerification.verified) {
                msgUrl = querystring.encode({smsg:'Sorry!', msg: `Session is invalid. Please login again.`})
                window.location.replace("/login?" + msgUrl);
                return
          }
      }
}

export default LoginVerifier;