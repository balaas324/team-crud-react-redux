import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createMember } from "../actions/members";


const AddMember =()=>{
    const initialMemberState = {
        id: null,
        name: "",
        teamName: "",
        birthYear: "",
        injury: false
    }
    const [member, setMember] = useState(initialMemberState)
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target
        setMember({...member, [name]: value})
    }

    const saveMember =()=>{
        const { name, teamName, birthYear, injury } = member

        dispatch(createMember(name, teamName, birthYear, injury))
            .then(data=>{
                setMember({
                    id: data.id,
                    name: data.name,
                    teamName: data.teamName,
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
                        <label htmlFor="teamName">Team Name</label>
                        <input 
                        type="text" 
                        className="form-control"
                        id="teamName"
                        required
                        value={member.teamName}
                        onChange={handleInputChange}
                        name="teamName"
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