import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { deleteTeam, updateTeam } from "../_actions/teams"
import TeamServices from "../services/TeamService"


const Team =(props)=>{
    const initialTeamState = {
        id: null,
        name:"",
        nation:""
    }

    const [currentTeam, setCurrentTeam] = useState(initialTeamState)
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()

    const getTeam = id =>{
        TeamServices.get(id)
            .then(res=>{
                setCurrentTeam(res.data)
                console.log(res.data);
            })
            .catch(e=>{
                console.log(e);
            })
    }

    useEffect(()=>{
        getTeam(props.match.params.id)
    }, [props.match.params.id])

    const handleInputChange=event=>{
        const { name, value } = event.target
        setCurrentTeam({ ...currentTeam, [name]:value})
    }

    const updateContent =()=>{
        dispatch(updateTeam(currentTeam.id, currentTeam))
            .then(res=>{
                console.log(res);
                setMessage(`${currentTeam.name} has been updated`)
            })
            .catch(e=>{
                console.log(e);
            })
    }

    const removeTeam =()=>{
        dispatch(deleteTeam(currentTeam.id))
            .then(()=>{
                props.history.push("/teams")
            })
    }


    return (
        <div>
            { currentTeam ? (
                <div className="edit-form">
                    <h4>Team</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">
                                Name
                            </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            id="name"
                            name="name"
                            value={currentTeam.name}
                            onChange={handleInputChange}
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
                            name="nation"
                            value={currentTeam.nation}
                            onChange={handleInputChange}
                            />
                        </div>
                    </form>

                    <br />
                    <button 
                    type="submit" 
                    className="btn btn-primary btn-sm" 
                    onClick={updateContent}>
                        Update
                    </button>

                    <button 
                    type="submit" 
                    className="btn btn-danger btn-sm" 
                    onClick={removeTeam}>
                        Delete
                    </button>

                    <br />
                    <br />
                    <div>
                        <p>{message}</p>
                    </div>
                </div>
            ) : (
                <div>
                    <p>please click on team</p>
                </div>
            )}
        </div>
    )

}

export default Team