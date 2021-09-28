import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"

import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"

import { login } from "../../_actions/aut.actions/auth"

const required = (value) => {
    if (!value){
        return (
            <div className="alert alert-danger" role="alert">
                this field is required
            </div>
        )
    }
}

const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const  [username,setUsername] = useState("")
    const  [password,setPassword] = useState("")
    const  [loading,setLoading] = useState(false)

    const isLoggedIn = useSelector(state=>{
        console.log(state.auth);
        console.log("login");
        return state.auth.isLoggedIn
    })
    const message = useSelector(state=>state.message.message)

    const dispatch = useDispatch()

    const onChangeUsername=(e)=>{
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword=(e)=>{
        const password = e.target.value
        setPassword(password)
    }

    

    const handleLogin=(e)=>{
        e.preventDefault()

        setLoading(true)

        form.current.validateAll()
        
        if (checkBtn.current.context._errors.length === 0){
            dispatch(login(username, password))
                props.history.push("/profile");
                //window.location.reload();
            
        } else {
            setLoading(false);
        }
    
    }


    if (isLoggedIn){
        return <Redirect to="/profile/" />
    }    

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img 
                src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" 
                alt="profile-img"
                className="profile-img-card"
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-gruop">
                        <label htmlFor="username">Username</label>
                        <Input 
                        className="form-control"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input 
                        className="form-control"
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChangePassword}
                        validations={[required]}
                        />
                    </div>

                    <div className="form-group">
                        <button onClick={handleLogin} className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>

                    {message ? (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    ) : null}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default Login