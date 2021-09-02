import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { findTeamByName, retrieveTeams } from "../actions/teams"

const TeamList = (props) =>{
    const [currentTeam, setCurrentTeam] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [searchName, setSearchName] = useState("")

    const teams = useSelector(state=>state.teams)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(retrieveTeams())
    }, [])

    const onChangeSearchName=e=>{
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const refreshData =()=>{
        setCurrentTeam(null)
        setCurrentIndex(-1)
    }

    const setActiveTeam=(team,index)=>{
        setCurrentTeam(team)
        setCurrentIndex(index)
        console.log(currentIndex);
    }

    const findByName =()=>{
        refreshData()
        dispatch(findTeamByName(searchName))
        setSearchName("")
    }

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group-mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by team name"
                    onChange={onChangeSearchName}
                    />
                    <div className="input-group-append">
                        <button 
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByName}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-md-5">
                <h4>Teams list</h4>
                { teams && teams.map((team,index)=>(
                    <li 
                    className={"list-group-item" + (index === currentIndex ? " list-group-item-dark" : "")}
                    onClick={()=>setActiveTeam(team, index)}
                    key={index}
                    >
                        {team.name}
                    </li>
                ))}
            </div>

            <div className="col-md-6">
                { currentTeam ? (
                    <div>
                        <h4>Team</h4>
                        <div>
                            <label>
                                <strong>Team name:</strong>
                            </label>{" "}
                            { currentTeam.name }
                        </div>

                        <div>
                            <label>
                                <strong>Nation:</strong>
                            </label>{" "}
                            { currentTeam.nation }
                        </div>

                        <Link to={"/team/" + currentTeam.id} className="btn btn-primary">
                        Edit
                        </Link>
                    </div>
                ) : (
                    <div>

                    </div>
                )}
            </div>
        </div>
    )


}

export default TeamList