import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import TableRow from "./ClassesTableRow";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import UpdateClass from "./UpdateClass";


// import axios from "axios";

const ClassesTable = () => {
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
      <h2>Classes Table</h2>
      {/* {classes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No classes found.</p>
        </div>
      ) : ( */}
        <table>
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Class Name</th>
              <th>Duration (minutes)</th>
              <th>Registration Cost (USD)</th>
              <th>Description</th>
              <th>Edit</th>
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
                onClick={() => navigate("/classes/update")} 
                size={25} 
                style={{ cursor: "pointer" }} />
              </td>
            </tr>
            
          </tbody>
        </table>
        <p><em>Note: Class entries may not be deleted.</em></p>
      {/* )} */}
    </div>
  );
};

export default ClassesTable;