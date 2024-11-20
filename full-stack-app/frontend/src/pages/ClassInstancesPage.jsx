import React from "react";
import ClassInstanceTable from "../components/classInstances/ClassInstanceTable";
import CreateClassInstance from "../components/classInstances/CreateClassInstance";
import UpdateClassInstance from "../components/classInstances/UpdateClassInstance";
import DeleteClassInstance from "../components/classInstances/DeleteClassInstance";
import { Link, Routes, Route } from 'react-router-dom';


function ClassInstancesPage() {
    return (
        <>
        <main>
            <h2>Class Schedule</h2>
            <nav>
                <p><Link to="/schedule">Class Schedule Table</Link></p>
                <p><Link to="create">Schedule a Class</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<ClassInstanceTable />} />
                <Route path="create" element={<CreateClassInstance />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update" element={<UpdateClassInstance />} />
                <Route path="delete" element={<DeleteClassInstance />} />
            </Routes>
        </main>
        </>
    );
}

export default ClassInstancesPage;