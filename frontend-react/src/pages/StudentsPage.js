import React from "react";
import StudentsTable from "../components/students/StudentsTable";
import CreateStudent from "../components/students/CreateStudent";
import UpdateStudent from "../components/students/UpdateStudent";
import DeleteStudent from "../components/students/DeleteStudent";
import { Link, Routes, Route } from 'react-router-dom';


function StudentsPage() {
    return (
        <>
        <main>
            <h2>Students</h2>
            <nav>
                <p><Link to="/students">Students Table</Link></p>
                <p><Link to="create">Add a Student</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<StudentsTable />} />
                <Route path="create" element={<CreateStudent />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update" element={<UpdateStudent />} />
                <Route path="delete" element={<DeleteStudent />} />
            </Routes>
        </main>
        </>
    );
}

export default StudentsPage;