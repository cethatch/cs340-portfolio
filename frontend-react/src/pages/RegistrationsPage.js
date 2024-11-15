import React from "react";
import RegistrationsTable from "../components/registrations/RegistrationsTable";
import CreateRegistration from "../components/registrations/CreateRegistration";
import UpdateRegistration from "../components/registrations/UpdateRegistration";
import DeleteRegistration from "../components/registrations/DeleteRegistration";
import { Link, Routes, Route } from 'react-router-dom';


function RegistrationsPage() {
    return (
        <>
        <main>
            <h2>Class Registrations</h2>
            <nav>
                <p><Link to="/registrations">Registrations Table</Link></p>
                <p><Link to="create">Add a Registration</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<RegistrationsTable />} />
                <Route path="create" element={<CreateRegistration />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update" element={<UpdateRegistration />} />
                <Route path="delete" element={<DeleteRegistration />} />
            </Routes>
        </main>
        </>
    );
}

export default RegistrationsPage;