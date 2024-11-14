import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function CreateInstructor() {
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
        navigate("/instructors");
    }

  return (
    <>
        <h3>Add a new instructor:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="instFirstName">First name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="instFirstName"
                            required
                            // defaultValue={formData.instFirstName}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="instLastName">Last name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="instLastName"
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
                            required
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
                    <tr>
                        <td>
                            <label htmlFor="hireDate">Hire date:</label>
                        </td>
                        <td>
                            <input
                            type="date"
                            name="hireDate"
                            // defaultValue={formData.hireDate}
                            // onChange={handleInputChange}
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
                            // defaultValue={formData.specialty}
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
                            // defaultValue={formData.hourlyRate}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Create Instructor</button>
        </form>
    </>
  );
}

export default CreateInstructor;