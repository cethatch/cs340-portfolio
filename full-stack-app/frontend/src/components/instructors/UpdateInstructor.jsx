/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateInstructor = () => {
//   const { id } = useParams();
  const navigate = useNavigate();
//   const location = useLocation();
//   const prevPerson = location.state.person;

//   const [formData, setFormData] = useState({
//     fname: prevPerson.fname || '',
//     lname: prevPerson.lname || '',
//     homeworld: prevPerson.homeworld || '',
//     age: prevPerson.age || '',
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));
//   };

//   function isUpdate(){
//     // Check if formData is equal to prevPerson
//     if (JSON.stringify(formData) === JSON.stringify({
//       fname: prevPerson.fname || '',
//       lname: prevPerson.lname || '',
//       homeworld: prevPerson.homeworld || '',
//       age: prevPerson.age || '',
//     })) {
//       alert("No changes made.");
//       return false;
//     }
//     return true
//   }

//   const handleSubmit = async (event) => {
//     // Stop default form behavior which is to reload the page
//     event.preventDefault();
//     // Check if formData is equal to prevPerson
//     if (isUpdate()){
//       try {
//         const URL = import.meta.env.VITE_API_URL + "people/" + id;
//         const response = await axios.put(URL, formData);
//         if (response.status !== 200) {
//           alert("Error updating person");
//         } else {
//           alert(response.data.message);
//           // Redirect to people page
//           navigate("/people");
//         }
//       } catch (err) {
//         console.log("Error updating person:", err);
//       }
//     }
//   };

    // Remove once backend is working and use the method above:
    const handleSubmit = () => {
        navigate("/instructors");
    }

  return (
    <div>
      <h3>Update Instructor:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
          <tr>
              <td><label htmlFor="instFirstName">First Name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="instFirstName"
                    // onChange={handleInputChange}
                    required
                    // defaultValue={prevInstructor.instFirstName}
                  />
              </td>
          </tr>
          <tr>
              <td><label htmlFor="instLastName">Last Name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="instLastName"
                    // onChange={handleInputChange}
                    required
                    // defaultValue={prevInstructor.instLastName}
                  />
              </td>
          </tr>
        
        <tr>
          <td><label htmlFor="phoneNumber">Phone number: <span className='req'> * </span></label></td>
          <td>
              <input
                type="number"
                name="phoneNumber"
                // onChange={handleInputChange}
                // defaultValue={prevInstructor.phoneNumber}
              />
          </td>
        </tr>
        <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td>
                  <input
                    type="text"
                    name="email"
                    // onChange={handleInputChange}
                    // defaultValue={prevInstructor.email}
                  />
              </td>
          </tr>
          <tr>
              <td><label htmlFor="hireDate">Hire date:</label></td>
              <td>
                  <input
                    type="date"
                    name="hireDate"
                    // onChange={handleInputChange}
                    // defaultValue={prevInstructor.hireDate}
                  />
              </td>
          </tr>
          <tr>
            <td>
                <label htmlFor="instSpecialty">Specialty: </label>
            </td>
            <td>
                <select id="instSpecialty" 
                name="instSpecialty" 
                required
                // defaultValue={prevInstructor.specialty}
                // onChange={handleInputChange}
                style={{width: 300, height: 30}} 
                >
                </select>
            </td>
          </tr>
          <tr>
              <td>
                  <label htmlFor="hourlyRate">Hourly rate: </label>
              </td>
              <td>
                  <input
                  type="number"
                  name="hourlyRate"
                  min={0}
                  // defaultValue={prevInstructor.hourlyRate}
                  // onChange={handleInputChange}
                  />
              </td>
          </tr>
        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/instructors")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateInstructor;