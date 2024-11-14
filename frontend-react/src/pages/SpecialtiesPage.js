import React from "react";
import SpecialtiesTable from "../components/specialties/SpecialtiesTable";
import CreateSpecialty from "../components/specialties/CreateSpecialty";
import UpdateSpecialty from "../components/specialties/UpdateSpecialty";
import DeleteSpecialty from "../components/specialties/DeleteSpecialty";
import { Link, Routes, Route } from 'react-router-dom';


function SpecialtiesPage() {
    return (
        <>
        <main>
            <h2>Specialties</h2>
            <nav>
                <p><Link to="/">Specialties Table</Link></p>
                <p><Link to="create">Add a Specialty</Link></p>
                {/* <p><Link to="update">Update a Class</Link></p> */}
            </nav> 
            <Routes>
                <Route path="/" element={<SpecialtiesTable />} />
                <Route path="create" element={<CreateSpecialty />} />
                {/* <Route path="update/:id" element={<UpdateClass />} /> */}
                <Route path="update" element={<UpdateSpecialty />} />
                <Route path="delete" element={<DeleteSpecialty />} />
            </Routes>
        </main>
        </>
    );
}

export default SpecialtiesPage;