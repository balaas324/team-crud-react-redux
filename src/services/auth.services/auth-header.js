const authHeader =()=>{
    const user = JSON.parse(localStorage.getItem("user"))

    if (user&&user.accesToken){
        return { "x-access-token": user.accesToken}
    } else {
        return {}
    }
}