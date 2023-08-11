import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmpEdit = () => {

    const { id } = useParams();
    //const [empdata,empdatachange]=useState({});

    useEffect(() => {

        fetch(`http://localhost:8080/edit/${id}`).then((res) => {

        if(!res.ok){
            throw new Error("Network response was not ok");
        }
            return res.json();

        }).then((data) => {
            //empdatachange(data)
          
            namechange(data.name);
            emailchange(data.email);
            mobilechange(data.mobile);
            console.log(data)

        }).catch((error) => {
            console.log(error);
        })



    }, []);

   
    const [name, namechange] = useState('');
    const [email, emailchange] = useState('');
    const [mobile, mobilechange] = useState('');
    const [active, activechange] = useState(true);
    const [validation, valchange] = useState(false);
    const navigate = useNavigate();
    const handlesubmit = async (e) => {

        e.preventDefault();
        try{

            const empdata = {  name, email, mobile, active };


            let response = fetch(`http://localhost:8080/edit/${id}`, {
                method: "PUT",
                headers: {
    
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(empdata)
    
    
    
            });
            if (response.ok) {

                alert("saved succe")
                navigate("/")
                console.log(empdata)

            } else {

                const data = await response.json()
                throw new Error(data.message || "Failed to save data");


            }


        }catch(err){

console.log(err.message)

        }
       

       
    }//api created at empdata





    return (
        <>

            <div className="row">
                <div className="offset-lg-3 col-lg-4">
                    <form className="container" onSubmit={handlesubmit}>
                        <div className="card">

                            <div className=" card-title ">
                                <h2 className="text-center">Employee Create</h2>

                            </div>
                            <div className="card-body">

                                <div className="row">

                                    

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <lable>Name</lable>
                                            <input required value={name} onMouseDown={e => valchange(true)} onChange={e => { namechange(e.target.value) }} className="form-control"></input>
                                            {name.length == 0 && validation && <span className="text-danger">enter the name</span>}

                                        </div>

                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <lable>Email</lable>
                                            <input value={email} onChange={e => { emailchange(e.target.value) }} className="form-control"></input>

                                        </div>

                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <lable>Phone</lable>
                                            <input value={mobile} onChange={e => { mobilechange(e.target.value) }} className="form-control"></input>

                                        </div>

                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-check">

                                            <input value={active} onChange={e => { activechange(e.target.value) }} type="checkbox" className="form-check-input"></input>
                                            <lable className='form-check-lable'>Is Active</lable>
                                        </div>

                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-success">EDIT</button>
                                            <Link as={Link} to="/" className="btn btn-warning ms-3">BACK</Link>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </form>


                </div>



            </div>


        </>

    );
}

export default EmpEdit;