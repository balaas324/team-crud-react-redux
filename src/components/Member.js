import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteMember, updateMember } from "../_actions/members";
import MemberServices from "../services/MemberService";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Member = (props) => {
    const initialMemberState = {
        id: null,
        name: "",
        teamId: "",
        birthYear: "",
        injury: false
    }

    const [currentMember, setCurrentMember] = useState(initialMemberState)
    const [message, setMessage] = useState("")

    const dispacth = useDispatch();

    const getMember = id => {
        MemberServices.get(id)
            .then(res=>{
                setCurrentMember(res.data)
                console.log(res);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    useEffect(()=>{
        getMember(props.match.params.id);
        console.log(props);
    }, [props.match.params.id])


    const currentUser = useSelector(state=>{
        console.log(state);
        return state.auth.user
    })
    console.log(currentUser);

    if (!currentUser) {
        return <Redirect to="/login" />
    }

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentMember({...currentMember, [name]: value})
    }

    const updateStatus = status =>{
        const data = {
            id: currentMember.id,
            name: currentMember.name,
            teamId: currentMember.teamId,
            BirthYear: currentMember.birthYear,
            injury: status
        }

        dispacth(updateMember(currentMember.id, data))
            .then(res=>{
                console.log(res);

                setCurrentMember({...currentMember, injury:status})
                setMessage("The status was updated successfully")
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const updateContent =()=>{
        dispacth(updateMember(currentMember.id, currentMember))
            .then(res=>{
                console.log(res);
                setMessage(`${currentMember.name} has been updated`)
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const removeMember =()=>{
        dispacth(deleteMember(currentMember.id))
            .then(()=>{
                props.history.push("/members")
            })
            .catch(e=>{
                console.log(e);
            })
    }
    

    return (
        <div>
            { currentUser.roles[0] === "ROLE_ADMIN" ? (
                <div>
                { currentMember ? (
                    <div className="edit-form">
                        <h4>Member</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Member name</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="name"
                                name="name"
                                value={currentMember.name}
                                onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="teamId">Team id</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="teamId"
                                name="teamId"
                                value={currentMember.teamId ? currentMember.teamId : ""}
                                onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="birthYear">Birth year</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="birthYear"
                                name="birthYear"
                                value={currentMember.birthYear}
                                onChange={handleInputChange}
                                />
                            </div>

                        </form>
                        {currentMember.injury ? (
                            <button type="submit" className="btn btn-warning mr-2" onClick={()=>updateStatus(false)} style={{margin: 5}}>
                                Injured
                            </button>
                        ) : (
                            <button type="submit" className="btn btn-warning mr-2" onClick={()=>updateStatus(true)} style={{margin: 5}}>
                                Ready
                            </button>
                        )}

                        <button 
                        type="submit"
                        className="btn btn-success mr-2" 
                        onClick={updateContent} 
                        style={{margin: 5}}
                        
                        >
                            Update
                        </button>

                        <button 
                        type="submit"
                        className="btn btn-danger mr-2" 
                        onClick={removeMember} 
                        style={{margin: 5}}
                        
                        >
                            Delete
                        </button>
                        
                        <br /><br />
                        <div><p>{message}</p></div>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a member</p>
                    </div>
                )}
            </div>
    
            ) : (
                <div>
                    <p>Admin Role required</p>
                </div>
            )}
        </div>   
                
    )
}

export default Member