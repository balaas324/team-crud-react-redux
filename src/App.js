import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom"
import { Switch, Route, Link } from 'react-router-dom';


import AddMember from "./components/AddMember"
import Member from "./components/Member"
import MemberList from "./components/MemberList"
import AddTeam from './components/AddTeam';
import Team from './components/Team';
import TeamList from './components/TeamList';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-secondary">
        <a href="/teams" className="navbar-brand">
          TEAM-CRUD-APP-DEMO
        </a>

        
        <div className="navbar-nav mr-auto">
        

          <li className="nav-item">
            <Link to={"/teams"} className="nav-link">
              Members of Teams
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/addmember"} className="nav-link">
              +Member
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/addteam"} className="nav-link">
              +Team
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">  
        <Switch>
          <Route exact path="/members" component={MemberList} />
          <Route exact path="/addmember" component={AddMember} />
          <Route path="/member/:id" component={Member} />
          <Route exact path="/addteam" component={AddTeam} />
          <Route path="/team/:id" component={Team} />
          <Route exact path="/teams" component={TeamList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
