import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteMember, updateMember } from "../actions/members";
import MemberServices from "../services/MemberService";


const Member = (props) => {
    const initialMemberState = {
        id: null,
        name: "",
        temaName: "",
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
                console.log(res.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    useEffect(()=>{
        getMember(props.match.params.id);
        console.log(props);
    }, [props.match.params.id])

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentMember({...currentMember, [name]: value})
    }

    const updateStatus = status =>{
        const data = {
            id: currentMember.id,
            name: currentMember.name,
            temaName: currentMember.temaName,
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
                setMessage("The member was updated successfully")
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
            { currentMember ? (
                <div className="edit-form">
                    <h4>Member</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Member name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="member"
                            name="member"
                            value={currentMember.name}
                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="teamName">Team name</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="teamName"
                            name="teamName"
                            value={currentMember.teamName}
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
                        <button className="btn btn-warning mr-2" onClick={()=>updateStatus(false)} style={{margin: 5}}>
                            Injured
                        </button>
                    ) : (
                        <button className="btn btn-warning mr-2" onClick={()=>updateStatus(true)} style={{margin: 5}}>
                            Ready
                        </button>
                    )}

                    <button className="btn btn-success mr-2" onClick={updateContent} style={{margin: 5}}>
                        Update
                    </button>

                    <button className="btn btn-danger mr-2" onClick={removeMember} style={{margin: 5}}>
                        Delete
                    </button>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a member</p>
                </div>
            )}
        </div>
    )
}

export default Member