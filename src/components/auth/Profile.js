import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";


const Profile =()=>{
    const currentUser = useSelector(state=>{
        console.log(state);
        console.log("profile");
        return state.auth.user
    })
    console.log(currentUser);

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                Profile of: <strong>{currentUser.username}</strong> 
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accesToken.substring(0,20)}...{" "}
                {currentUser.accesToken.substr(currentUser.accesToken.length-20)}
            </p>
            <p>
                <strong>Id:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                { currentUser.roles && 
                currentUser.roles.map((role,index)=> <li key={index}>{role}</li>)}
            </ul>
        </div>
    )
}

export default Profile