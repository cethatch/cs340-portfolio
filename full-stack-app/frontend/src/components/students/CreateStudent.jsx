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

function CreateStudent() {
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
        navigate("/students");
    }

  return (
    <>
        <h3>Add a new student:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                <tr>
                        <td>
                            <label htmlFor="firstName">First name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="firstName"
                            maxLength={50}
                            required
                            // defaultValue={formData.instFirstName}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="lastName">Last name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="lastName"
                            maxLength={50}
                            required
                            // defaultValue={formData.instLastName}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="phoneNumber">Phone number:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="phoneNumber"
                            maxLength={15}
                            
                            // defaultValue={formData.phoneNumber}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="email">Email: </label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="email"
                            maxLength={100}
                            // defaultValue={formData.email}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>  
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create student</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/students")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateStudent;