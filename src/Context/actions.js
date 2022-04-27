const ROOT_URL = 'http://localhost:8080/auth/';

export async function loginUser(dispatch, loginPayload,path) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginPayload),
    };


    try {
        dispatch({ type: 'REQUEST_LOGIN' });
        let response = await fetch(`${ROOT_URL}/${path}`, requestOptions);
        let data = await response.json();
        if (data.user) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            localStorage.setItem('currentUser', JSON.stringify(data));
            return data
        }

        dispatch({ type: 'LOGIN_ERROR', error: data.error });
        return data.error ;
    } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error });
    }
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root');
}
