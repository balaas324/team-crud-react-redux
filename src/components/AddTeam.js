import { useState } from "react"
import { useDispatch } from "react-redux"
import { createTeam } from "../_actions/teams"



const AddTeam =()=>{
    const initialTeamState = {
        id: null,
        name:"",
        nation:""
    }
    const [team, setTeam] = useState(initialTeamState)
    const [submitted, setSubmitted] = useState(false)

    const dispatch = useDispatch()

    const handleInputChange=event=>{
        const { name, value } = event.target
        setTeam({...team, [name]: value})
    }

    const saveTeam=()=>{
        const { name, nation } = team

        dispatch(createTeam(name,nation))
            .then(data=>{
                setTeam({
                    id: data.id,
                    name: data.name,
                    nation: data.nation
                })
                setSubmitted(true)
                console.log(data);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const newTeam =()=>{
        setTeam(initialTeamState)
        setSubmitted(false)
    }

    return(
        <div className="submit-form">
            <h3>Add Team</h3>
            { submitted ? (
                <div>
                    <h4>You submitted successfully</h4>
                    <button className="btn btn-success" onClick={newTeam}>
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
                        value={team.name}
                        onChange={handleInputChange}
                        name="name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nation">
                            Nation
                        </label>
                        <input 
                        type="text" 
                        className="form-control" 
                        id="nation"
                        required
                        value={team.nation}
                        onChange={handleInputChange}
                        name="nation"
                        />

                        <br />
                        <button className="btn btn-success" onClick={saveTeam}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    )


}

export default AddTeam