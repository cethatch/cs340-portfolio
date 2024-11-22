/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function CreateInstructorAssignment() {
  const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     className: "",
//     duration: "",
//     cost: "",
//     description: "",
//   });
  
//   const handleSubmit = async (e) => {
//     // Prevent page reload
//     e.preventDefault();
//     // Create a new person object from the formData
//     const newClass = {
//         className: formData.className,
//         duration: formData.duration,
//         cost: formData.cost,
//         description: formData.description,
//     };

//     try {
//       const URL = import.meta.env.VITE_API_URL + "classes";
//       const response = await axios.post(URL, newClass);
//       if (response.status === 201) {
//         navigate("/classes");
//       } else {
//         alert("Error creating class.");
//       }
//     } catch (error) {
//       alert("Error creating class.");
//       console.error("Error creating class:", error);
//     }
//     // Reset the form fields
//     resetFormFields();
//   };

//   const resetFormFields = () => {
//     setFormData({
//         className: "",
//         duration: "",
//         cost: "",
//         description: "",
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

    const handleSubmit = () => {
        navigate("/instructor_assignments");
    }

  return (
    <>
        <h3>Add a new instructor assignment:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="instName">Instructor name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <select id="instName" 
                            name="instName" 
                            required
                            // defaultValue={formData.specialty}
                            // onChange={handleInputChange}
                            style={{width: 300, height: 30}} 
                            >
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="classDate">Class date:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="date"
                            name="classDate"
                            required
                            // defaultValue={formData.instLastName}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="classTime">Class time:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="time"
                            name="classTime"
                            required
                            // defaultValue={formData.phoneNumber}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="kitchenAddress">Kitchen address: </label>
                        </td>
                        <td>
                            <select id="kitchenAddress" 
                            name="kitchenAddress" 
                            required
                            // defaultValue={formData.specialty}
                            // onChange={handleInputChange}
                            style={{width: 300, height: 30}} 
                            >
                            </select>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Assignment</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructor_assignments")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateInstructorAssignment;