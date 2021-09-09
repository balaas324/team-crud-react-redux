import React, { useState, useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveMembers, findMemberByName } from "../actions/members"
import { Link } from "react-router-dom"

const MemberList =(props)=>{
    const [currentMember, setCurrentMember] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [searchName, setSearchName] = useState("")

    const members = useSelector(state=>state.members)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(retrieveMembers())
    }, [])

    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const refreshData =()=>{
        setCurrentMember(null)
        setCurrentIndex(-1)
    }

    const setActiveMember =(member, index)=>{
        setCurrentMember(member)
        setCurrentIndex(index)
    }

    const findByName =()=>{
        refreshData()
        dispatch(findMemberByName(searchName))
        setSearchName("")
    }    

    return (
        <div className="">
            <div className="list row">
            <div className="col-md-8">
                <div className="input-group-mb-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by member name"
                    value={searchName}
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
            <br />

            <div className="col-md-5">
                <h4>Members list</h4>
                <ul className="list-group">
                    { members && 
                        members.map((member, index)=>(
                            <li 
                            className={"list-group-item" + (index === currentIndex ? " list-group-item-dark" : "")}
                            onClick={()=>setActiveMember(member, index)}
                            key={index}
                            >
                                {member.name}
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className="col-md-2">
                { currentMember ? (
                    <div>
                        <h4>Member</h4>
                        <div>
                            <label>
                                <strong>Name:</strong>
                            </label>{" "}
                            { currentMember.name }
                        </div>
                        <div>
                            <label>
                                <strong>Team Name:</strong>
                            </label>{" "}
                            { currentMember.team ? currentMember.team.name : <label>Free Agent</label> }
                        </div>

                        <div>
                            <label>
                                <strong>Birth Year:</strong>
                            </label>{" "}
                            { currentMember.birthYear }
                        </div>

                        <div>
                            <label>
                                <strong>Injury:</strong>
                            </label>{" "}
                            { currentMember.injury ? "true" : "false" }
                        </div>

                        <Link to={"/member/" + currentMember.id} className="btn btn-primary">
                        Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a name</p>
                    </div>
                )}
            </div>

            </div>
        </div>
    )
}

export default MemberList