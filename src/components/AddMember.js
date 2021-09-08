import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createMember } from "../actions/members";


const AddMember =()=>{
    const initialMemberState = {
        id: null,
        name: "",
        teamId: "",
        birthYear: "",
        injury: false
    }
    const [member, setMember] = useState(initialMemberState)
    const [submitted, setSubmitted] = useState(false)
    const [team, setTeam] = useState([])

    const teams = useSelector(state=>state.teams)
    const dispatch = useDispatch();

    useEffect(()=>{
        const getTeam = () => {
            setTeam(teams.map(teamm=>({id: teamm.id, name:teamm.name})))
        }
        getTeam();
    
    }, [])
    
    const handleInputChange = event => {
        const { name, value } = event.target
        setMember({...member, [name]: value})
    }

    const saveMember =()=>{
        const { name, teamId, birthYear, injury } = member

        dispatch(createMember(name, teamId, birthYear, injury))
            .then(data=>{
                setMember({
                    id: data.id,
                    name: data.name,
                    teamId: data.teamId,
                    injury: data.injury
                })
                setSubmitted(true)
                console.log(data);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const newMember =()=>{
        setMember(initialMemberState)
        setSubmitted(false)
    }

    return (
        <div className="submit-form">
            <h3>Add Member</h3>
            { submitted ? (
                <div>
                    <h4>You Submitted Successfully</h4>
                    <button className="btn btn-success" onClick={newMember}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="name">
                            Name
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        required 
                        value={member.name} 
                        onChange={handleInputChange} 
                        name="name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="teamId">Team ID</label>
                        <select 
                        name="teamId" 
                        id="teamId" 
                        className="form-control"
                        value={member.teamId}
                        onChange={handleInputChange}
                        >
                            {team && team.map(team=>(
                                <option key={team.id} value={team.id}>
                                    {team.name}
                                </option>
                            ))}
                        </select>

                        <input 
                        type="text" 
                        className="form-control"
                        id="teamId"
                        required
                        value={member.teamId}
                        onChange={handleInputChange}
                        name="teamId"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthYear">Birth Year</label>
                        <input 
                        type="text" 
                        className="form-control"
                        id="birthYear"
                        required
                        value={member.birthYear}
                        onChange={handleInputChange}
                        name="birthYear"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="injury">Ready to play</label>
                        <select 
                        name="injury" 
                        id="injury" 
                        className="form-control"
                        value={member.injury}
                        onChange={handleInputChange}
                        >
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>

                    <br />
                    <button onClick={saveMember} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddMember