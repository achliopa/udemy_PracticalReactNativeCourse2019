export const SIGNUP = 'SIGNUP';

export const signup = (email,password) => {
    return async dispatch => {
        await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDO-TeJ19FFh3YDcX0hgOLWRWmx9YJQfwc',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });
      dispatch({type: SIGNUP});  
    };
};