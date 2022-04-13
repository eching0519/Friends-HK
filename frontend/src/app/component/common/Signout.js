const Signout = async () => {
    // Remove client session
    sessionStorage.removeItem('UserProfile')
    
    let url = 'http://localhost:/user/logout';
    let res = await fetch(url, {
        method: 'GET',
    });

    // Remove server session
    let data;
    try {
        data = await res.json();
    } catch (error) {
        console.log(error.message)
        // msgUrl = querystring.encode({smsg:'Error!', msg: `Unexpected error. (${error.message})`})
        // window.location.replace("/login?" + msgUrl);
        // return
    }

    // Redirect to login page
    window.location.replace("/login");
}

export default Signout;