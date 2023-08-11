import React from "react";
import { useState, useEffect } from 'react'

import axios from 'axios';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EmpCreate from "./components/EmpCreate";
import EmpListing from "./components/EmpListing";
import EmpDeatils from "./components/EmpDeatils";
import EmpEdit from "./components/EmpEdit";
import EditItem from "./components/EditItem";
//import "../node_modules/bootstrap/dist/js/bootstrap.min.js";


export default function App() {
    const [items, setItems] = useState([])
    const [newitems, setNewItems] = useState({
        name: "",
        email: "",
        password: "",
        mobile: ""


    })




    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/getemp');
            setItems(response.data.emp);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }


    }
    useEffect(() => {
        fetchItems()
    }, [])
    // console.log("emp", items.emp)



    const handleSave = async (e) => {
        e.preventDefault()

        await axios.post(`http://localhost:8080/api/create`, newitems)
        setNewItems({

            name: "",
            email: "",
            password: "",
            mobile: ""


        })


        fetchItems()
        console.log(fetchItems())
    }


    const handleDelete = async (id) => {

        await axios.delete(`http://localhost:8080/api/deleteemp/${id}`)
        fetchItems()
    }

const handleUpdate=()=>{

    fetchItems()


}



    return (

        <>

            {/* 
            <BrowserRouter>
                <h3 className="text-center text-danger">React Js Crud Operation</h3>
                <Routes>
                    <Route path="/" element={<EmpListing />}></Route>
                    <Route path="/empcreate" element={<EmpCreate />}></Route>
                    <Route path="/empdetails/:id" element={<EmpDeatils />}></Route>
                    <Route path="/edit/:id" element={<EmpEdit />}></Route>

                </Routes>
            </BrowserRouter> */}
            <div>


                <input type="text" value={newitems.name} onChange={(e) => { setNewItems({ ...newitems, name: e.target.value }) }} placeholder="name" /><br />

                <input type="text" value={newitems.email} onChange={(e) => { setNewItems({ ...newitems, email: e.target.value }) }} placeholder="email" /><br />

                <input type="text" value={newitems.password} onChange={(e) => { setNewItems({ ...newitems, password: e.target.value }) }} placeholder="pas" /><br />
                
                <input type="text" value={newitems.mobile} onChange={(e) => { setNewItems({ ...newitems, mobile: e.target.value }) }} placeholder="mobile" /><br />
                <button onClick={handleSave}>add</button>

            </div>
            <ul>

                {
                    items &&

                    items.map((item, index) => {


                        return <li key={item._id}>

                            <div>

                                name:{item.name}|email:{item.email}

                            </div>
                            <button onClick={() => { handleDelete(item._id) }}>Remove </button>
<EditItem

itemId={item._id}
initialData={item}
onUpdate={handleUpdate}



/>

                        </li>



                    })
                }
            </ul>

        </>

    )



}