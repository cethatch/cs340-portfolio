/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

// import axios from "axios";

const ClassInstanceTable = () => {
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
      <h3>Class Schedule Table</h3>
      {/* {classes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No classes found.</p>
        </div>
      ) : ( */}
        <table>
          <thead>
            <tr>
              <th>ClassInstance ID</th>
              <th>Class Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Kitchen Address</th>
              <th>Private Event?</th>
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
              <td></td>
              <td class="editCol">
                <BiEditAlt 
                onClick={() => navigate("/schedule/update")} 
                size={25} 
                style={{ cursor: "pointer" }} />
              </td>
              <td class="editCol">
                <MdDelete
                onClick={() => navigate("/schedule/delete")} 
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

export default ClassInstanceTable;