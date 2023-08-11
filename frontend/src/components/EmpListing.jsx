import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmpListing = () => {


    const [empdata, empdatachange] = useState([]);
    const navigate = useNavigate();

    const LoadDetails = (id) => {
        navigate("/empdetails/" + id)


    }//SHOW D
    const LoadEdit = (id) => {

        navigate("/edit/" + id)
    }
    const RemoveFunction = (id) => {
        if (window.confirm("ARE YOU SURE YO WANT TO DELETE ?")) {


            let promise = fetch(`http://localhost:8080/api/deleteemp/${id}`, {
                method: "DELETE"




            });
            promise.then((res) => {
                if (res.ok) {
                    alert("Delete successfully");
                    window.location.reload();

                }

            }).then((data) => {
                console.log(data)

            }).catch((err) => {
                console.log(err)


            })
        }

    }








    useEffect(() => {
        fetch(`http://localhost:8080/api/getemp`).then((res) => {
            return res.json();

        }).then((data) => {
            console.log(empdatachange(data))
        }).catch((error) => {
            console.log(error)

        })
    }, []);//update stage
    console.log("emp", empdata.emp)
    return (
        <>
            <div className="container">

                <div className="card-title">

                    <h2>Employee Listing </h2>
                </div>
                <div className="card-body">
                    <Link as={Link} to='/empcreate' className="btn btn-outline-success">Add New (+)</Link>

                    <table className="table table-bordered" >
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Name</td>
                                <td>Email</td>
                                <td>Phone</td>
                                <td>Action</td>
                            </tr>



                        </thead>
                        <tbody>
                            {

                                empdata.emp && empdata.emp.map((item, index) => {

                                    return <>

                                        <tr >
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.mobile}</td>
                                            <td>
                                                <button className="btn btn-outline-success m-1" onClick={()=>{LoadEdit(item._id)}}>Edit</button>

                                                <button className="btn btn-outline-danger m-1" onClick={()=>{RemoveFunction(item._id)}} >Remove</button>


                                            </td>




                                        </tr>


                                    </>


                                })


                            }


                        </tbody>


                    </table>
                </div>

            </div>
        </>


    );
}

export default EmpListing;