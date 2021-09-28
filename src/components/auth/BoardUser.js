import React, { useState, useEffect } from "react";
import UserService from "../../services/auth.services/user.sevice"

const BoardUser =()=>{
    const [content, setContent] = useState("")

    useEffect(()=>{
        UserService.getUserBoard()
            .then(res=>{
                setContent(res.data)
            },
            err=>{
                const _content = 
                (err.res && err.res.data) ||
                err.message ||
                err.toString()
                setContent(_content)
            }
            )
    }, [])

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content}</h3>
            </header>
        </div>
    )
}

export default BoardUser