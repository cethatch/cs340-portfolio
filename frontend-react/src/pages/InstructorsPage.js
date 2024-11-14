import React from "react";
import InstructorsTable from "../components/instructors/InstructorsTable";
import CreateInstructor from "../components/instructors/CreateInstructor";
import UpdateInstructor from "../components/instructors/UpdateInstructor";
import DeleteInstructor from "../components/instructors/DeleteInstructor";
import { Link, Routes, Route } from 'react-router-dom';


function ClassesPage() {
    return (
        <>
        <main>
            <h2>Instructors</h2>
            <nav>
                <p><Link to="/instructors">Instructors Table</Link></p>
                <p><Link to="create">Add an Instructor</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<InstructorsTable />} />
                <Route path="create" element={<CreateInstructor />} />
                {/* <Route path="update/:id" element={<UpdateInstructor />} /> */}
                <Route path="update/" element={<UpdateInstructor />} />
                <Route path="delete/" element={<DeleteInstructor />} />
            </Routes>
        </main>
        </>
    );
}

export default ClassesPage;