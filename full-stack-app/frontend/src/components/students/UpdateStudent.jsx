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

const UpdateStudent = () => {
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
        navigate("/students");
    }

  return (
    <div>
      <h3>Update student:</h3>
      <p><span className='req'>* </span> - Required field.</p>
      
      <form onSubmit={handleSubmit} className="form-container" id="addNewForm">
        <table>
            <tbody>
            <tr>
              <td><label htmlFor="studentID">Student ID:</label></td>
              <td>
                  
              </td>
          </tr>
          <tr>
              <td><label htmlFor="firstName">First name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="firstName"
                    // onChange={handleInputChange}
                    required
                    maxLength={50}
                    // defaultValue={prevKitchen.address}
                  />
              </td>
          </tr>
          <tr>
              <td><label htmlFor="lastName">Last name:<span className='req'> * </span></label></td>
              <td>
                  <input
                    type="text"
                    name="lastName"
                    maxLength={50}
                    // onChange={handleInputChange}
                    required
                    // defaultValue={prevKitchen.address}
                  />
              </td>
          </tr>

          <tr>
              <td><label htmlFor="phoneNumber">Phone number:</label></td>
              <td>
                  <input
                    type="text"
                    name="phoneNumber"
                    maxLength={15}
                    // onChange={handleInputChange}
                    // defaultValue={prevKitchen.address}
                  />
              </td>
          </tr>

          <tr>
              <td><label htmlFor="email">Email:</label></td>
              <td>
                  <input
                    type="text"
                    name="email"
                    maxLength={100}
                    // onChange={handleInputChange}
                    // defaultValue={prevKitchen.address}
                  />
              </td>
          </tr>
        
        </tbody>
        </table>
        
        <button type="submit" className="submitButton">Update</button>
        <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/students")}>
          Cancel
        </button>
      </form>
      
    </div>
  );
};

export default UpdateStudent;