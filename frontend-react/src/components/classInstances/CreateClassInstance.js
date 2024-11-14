import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const CreateClass = () => {
function CreateClassInstance() {
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
        navigate("/kitchens");
    }

  return (
    <>
        <h3>Schedule a class:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="className">Class Name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <select id="className" 
                            name="className" 
                            required
                            // defaultValue={formData.fname}
                            // onChange={handleInputChange}
                            style={{width: 300, height: 30}} 
                            >
                            </select>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="date">Date: <span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="date"
                            name="date"
                            // defaultValue={formData.lname}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="time">Time:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="time"
                            name="time"
                            // defaultValue={formData.lname}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="address">Kitchen Address:</label>
                        </td>
                        <td>
                            <input
                            type="text"
                            name="address"
                            // defaultValue={formData.lname}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="privateEvent">Private Event?</label>
                        </td>
                        <td>
                            <input
                            type="checkbox"
                            name="privateEvent"
                            style={{cursor: "pointer"}}
                            // defaultValue={formData.lname}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <button type="submit" className="submitButton">Add to Schedule</button>
        </form>
    </>
  );
}

export default CreateClassInstance;