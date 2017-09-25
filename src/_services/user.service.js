import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    generate_otp
};

function login(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'key':'docketgst' },
        // body: JSON.stringify({ username, password })
    };

    let login_url = "";

    if(username.toString().indexOf("@") >= 0){
        login_url = 'http://gst.edocketapp.com/api/v0/user/signin/?email='+username+'&otp='+password+'&type=otp'
    }else{
        login_url = 'http://gst.edocketapp.com/api/v0/user/signin/?mobile='+username+'&otp='+password+'&type=otp'
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
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
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