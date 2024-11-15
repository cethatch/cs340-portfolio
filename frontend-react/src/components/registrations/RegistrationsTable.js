import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import TableRow from "./RegistrationsTableRow";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

// import axios from "axios";

const RegistrationsTable = () => {
  // const [classes, setClasses] = useState([]);
  const navigate = useNavigate();


  // const fetchClasses = async () => {
  //   try {
  //     const URL = import.meta.env.VITE_API_URL + "classes";
  //     const response = await axios.get(URL);
  //     setClasses(response.data);
  //   } catch (error) {
  //     alert("Error fetching classes from the server.");
  //     console.error("Error fetching classes:", error);
  //   }
  // };

  // useEffect(() => {
  //   // fetchClasses();
  // }, []);

  return (
    <div>
      <h2>Registrations Table</h2>
      {/* {classes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No classes found.</p>
        </div>
      ) : ( */}
        <table>
          <thead>
            <tr>
              <th>Registration ID</th>
              <th>Student first name</th>
              <th>Student last name</th>
              <th>Class name</th>
              <th>Invoice ID</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* {classes.map((class) => (
              <TableRow key={class.id} class={class} fetchClasses={fetchClasses} />
            ))} */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="editCol">
                <BiEditAlt 
                onClick={() => navigate("/registrations/update")} 
                size={25} 
                style={{ cursor: "pointer" }} />
              </td>
              <td class="editCol">
                <MdDelete
                onClick={() => navigate("/registrations/delete")} 
                size={25} 
                style={{ cursor: "pointer"}} />
              </td>
            </tr>
            
          </tbody>
        </table>
      {/* )} */}
    </div>
  );
};

export default RegistrationsTable;