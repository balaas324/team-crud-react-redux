import React, { useState, useEffect, } from "react"
import { useDispatch, useSelector } from "react-redux"
import { retrieveMembers, findMemberByName } from "../_actions/members"
import { Link } from "react-router-dom"
import MemberServices from "../services/MemberService"
import Pagination from "@material-ui/lab/Pagination";


const MemberList =(props)=>{
    const [memberss, setMemberss] = useState([])
    const [currentMember, setCurrentMember] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [searchName, setSearchName] = useState("")

    const [page ,setPage] = useState(1)
    const [count, setCount] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    const pageSizes = [10, 5]

    const members = useSelector(state=>state.members)
    const dispatch = useDispatch()

    useEffect(()=>{
        retrieveMembers()
        console.log(memberss);
    }, [page, pageSize])

    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const getRequestParams = (searchName, page, pageSize) => {
        let params = {}

        if (searchName) {
            params["name"] = searchName
        }

        if (page) {
            params["page"] = page - 1
        }

        if (pageSize) {
            params["size"] = pageSize
        }

        return params
    }

    const retrieveMembers =()=>{
        const params = getRequestParams(searchName, page, pageSize)

        MemberServices.getAll(params)
            .then((res)=>{
                const { members, totalPages } = res.data
                

                setMemberss(members)
                setCount(totalPages)

                console.log(members);
            })
            .catch((e)=>{
                console.log(e);
            })
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        console.log(page);
      };
    
      const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
      };

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
        <div className="container">
            <div className="list ">
            <div className="col-md-5">
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

            <div className="row">
            <div className="col-md-6">
                <h4>Members list</h4>

                <div className="mt-3">
                    {"Items per Page: "}
                    <select onChange={handlePageSizeChange} value={pageSize}>
                        {pageSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                        ))}
                    </select>

                    <Pagination
                        className="my-3"
                        count={count}
                        page={page}
                        siblingCount={1}
                        boundaryCount={1}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePageChange}
                    />
                </div>

                <ul className="list-group">
                    { memberss && 
                        memberss.map((member,index)=>(
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

            <div className="col-md-5">
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

                        {}
                        <Link to={"/member/" + currentMember.id} className="btn btn-primary">
                        Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a name here on the left</p>
                    </div>
                )}
            </div>
            </div>
            </div>
        </div>
    )
}

export default MemberList