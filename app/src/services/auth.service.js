export const authService = {
    login,
    verifyToken
}

async function login(user) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "username": user.username,
        "password": user.password
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    let loginResponse;

    const response = await fetch("http://localhost:3001/signin", requestOptions)
        .then(response => loginResponse = response.json())
        .catch(error => console.log('error', error));

    return loginResponse;
}

async function verifyToken(token) {
    const configuration = {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({token: token})
    }

    const verifyToken = await fetch('http://localhost:3001/verify' , configuration);
    const verifyToJSON = await verifyToken.json();
    return verifyToJSON;
}