/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import TableRow from "./SpecialtiesTableRow";
import axios from "axios";

const SpecialtiesTable = () => {
  const [specialties, setSpecialties] = useState([]);

  const fetchSpecialties = async () => {
    try {
        const URL = import.meta.env.VITE_API_URL + "specialties";
        const response = await axios.get(URL);
        setSpecialties(response.data);
      } catch (error) {
        alert("Error fetching specialties from the server.");
        console.error("Error fetching specialties:", error);
      }
    };

  useEffect(() => {
    fetchSpecialties();
  }, []);

  return (
    <>
      <h2>Specialties Table</h2>
      {specialties.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No specialties found.</p>
        </div>
      ) : (
        <div>
        <table>
          <thead>
            <tr>
              <th>Specialty ID</th>
              <th>Specialty Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {specialties.map((specialty) => (
              <TableRow key={specialty.specialtyid} specialty={specialty} fetchSpecialties={fetchSpecialties} />
            ))}
          </tbody>
        </table></div>
      )}
    </>

  );
};

export default SpecialtiesTable;