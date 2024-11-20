import { useState, useEffect } from "react";
import { RiCreativeCommonsZeroFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import TableRow from "./InstructorAssignmentsTableRow";
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

// import axios from "axios";

const DeleteInstructorAssignment = () => {
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

  const handleSubmit = () => {
    navigate("/instructor_assignments");
  }

  return (
    <div>
      <h3>Delete Instructor Assignment Entry</h3>
      <p style={{color:"red", fontWeight:"bold"}}>Are you sure you would like to delete the following entry?</p>
      {/* {classes.length === 0 ? (
        <div>
          <RiCreativeCommonsZeroFill size={70} color="#ccc" />
          <p>No classes found.</p>
        </div>
      ) : ( */}

      {/* {classes.map((class) => (
              <TableRow key={class.id} class={class} fetchClasses={fetchClasses} />
            ))} */}
    
    <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>

        <table>
          <tbody>
            <tr>
              <td>Assignment ID</td>
              <td></td>
            </tr>
            <tr>
              <td>Instructor First Name</td>
              <td></td>
            </tr>
            <tr>
              <td>Instructor Last Name</td>
              <td></td>
            </tr>
            <tr>
              <td>Class Name</td>
              <td></td>
            </tr>
            <tr>
              <td>Date</td>
              <td></td>
            </tr>
            <tr>
              <td>Time</td>
              <td></td>
            </tr>
            <tr>
              <td>Kitchen Address</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        
        <button type="submit" className="submitButton">Delete Instructor</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructor_assignments")}>
          Cancel
        </button>
      {/* )} */}
      </form>
    </div>
    
  );
};

export default DeleteInstructorAssignment;