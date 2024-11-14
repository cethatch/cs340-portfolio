import React from "react";
import { FaRegEdit } from "react-icons/fa";
import ClassesTable from "../components/classes/ClassesTable";
import CreateClass from "../components/classes/CreateClass";
import UpdateClass from "../components/classes/UpdateClass";
import { Link, Routes, Route } from 'react-router-dom';


function ClassesPage() {
    return (
        <>
        <main>
            <h2>Culinary Classes</h2>
            <nav>
                <p><Link to="/">Classes Table</Link></p>
                <p><Link to="create">Add a Class</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<ClassesTable />} />
                <Route path="create" element={<CreateClass />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update/" element={<UpdateClass />} />
            </Routes>
        </main>
        </>
    );
}

export default ClassesPage;