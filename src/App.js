import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from 'react';
import { Router } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Link } from 'react-router-dom';

import Login from "./components/auth/Login"
import Register from "./components/auth/Register"
import Home from "./components/auth/Home"
import Profile from "./components/auth/Profile"
import BoardAdmin from "./components/auth/BoardAdmin"

import AddMember from "./components/AddMember"
import Member from "./components/Member"
import MemberList from "./components/MemberList"
import AddTeam from './components/AddTeam';
import Team from './components/Team';
import TeamList from './components/TeamList';


import { logout } from "./_actions/aut.actions/auth"
import { clearMessage } from "./_actions/aut.actions/message"

import { history } from "./helper.history"


function App() {
  const [showEditMember, setShowEditMember] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)

  const currentUser  = useSelector(state => {
    console.log(state);
    return state.auth.user
  } );
  const dispatch = useDispatch()


  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(()=>{
    if (currentUser) {
      setShowEditMember(currentUser.roles.includes("ROLE_MODERATOR"))
      setShowAddMember(currentUser.roles.includes("ROLE_ADMIN"))
    }
  }, [currentUser])

  console.log(showEditMember + " " + showAddMember );

  const logOut = () => {
    dispatch(logout())
  } 

  return (
    <Router history={history}>
      <nav className="navbar navbar-expand navbar-dark bg-secondary">
        <a href="/login" className="navbar-brand">
          TEAM-CRUD-APP-DEMO
        </a>

        
        <div className="navbar-nav mr-auto">
        
            <li className="nav-item">
              <Link to={"/teams"} className="nav-link">
                Teams list
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/members"} className="nav-link">
                Members list
              </Link>
            </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/addmember"} className="nav-link">
                +Member
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/addteam"} className="nav-link">
                +Team
              </Link> 
            </li>
          )}

        </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile" } className="nav-link">
                  <strong>Profile: </strong> {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        
      </nav>

      <div className="container mt-3">  
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />  
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/admin" component={BoardAdmin} />

          <Route path = "/members" component={MemberList} />
          <Route path = "/addmember" component={AddMember} />
          <Route path = "/member/:id" component={Member} />
          <Route path = "/teams" component={TeamList} />
          <Route path = "/addteam" component={AddTeam} />
          <Route path = "/team/:id" component={Team} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
