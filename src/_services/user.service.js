import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    // getAll,
    // getById,
    // update,
    // delete: _delete,
    generate_otp,
    fileupload
};

function login(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'key':'docketgst' },
        // body: JSON.stringify({ username, password })
    };

    let login_url = "";

    if(username.toString().indexOf("@") >= 0){
        login_url = 'http://gst.edocketapp.com/api/v0/user/signin/?email='+username+'&otp='+password+'&type=login'
    }else{
        login_url = 'http://gst.edocketapp.com/api/v0/user/signin/?mobile='+username+'&otp='+password+'&type=login'
    }

    return fetch(login_url, requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            // if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/users/' + _id, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'key':'docketgst' },
        body: JSON.stringify(user)
    };

    return fetch('http://gst.edocketapp.com/api/v0/user/signup', requestOptions).then(handleResponse);
}

function fileupload(file) {
    const user = localStorage.getItem("user").result;
    const Base64={_keyStr:"HC6V61pIoCTf9YcFn77fTqc2s16GG8bvT8S4IUKQPayNEDcrUkwXet76EEfr9n+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
    const object_key = Base64.encode(file.name);
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'key':'docketgst' , 'authcode' : user.authcode },
        // body: JSON.stringify(user)
    };

    return fetch('http://gst.edocketapp.com/api/v0/upload/s3_url?user_id='+ user.user_id +'&object_key='+ object_key, requestOptions).then(handleResponse);
}

function generate_otp(useremail, usermobile, usertype) {
    
    let generate_otp_url = "";

    if(useremail.toString().indexOf("@") >= 0){
        generate_otp_url = 'http://gst.edocketapp.com/api/v0/user/generate_otp/?email='+useremail+'&type='+usertype
    }else{
        generate_otp_url = 'http://gst.edocketapp.com/api/v0/user/generate_otp/?mobile='+usermobile+'&type='+usertype
    }

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'key':'docketgst' },
        // body: JSON.stringify(username)
    };

    return fetch( generate_otp_url, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/users/' + user.id, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch('/users/' + id, requestOptions).then(handleResponse);;
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}