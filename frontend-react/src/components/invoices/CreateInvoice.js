import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

function CreateInvoice() {
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
        navigate("/invoices");
    }

  return (
    <>
        <h3>Add a new invoice:</h3>
        <p><span className='req'>* </span> - Required field.</p>
        
        <form className="form-container"  id="addNewForm" onSubmit={handleSubmit}>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label htmlFor="studentName">Student name:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <select id="studentName" 
                            name="studentName" 
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
                            <label htmlFor="invoiceDate">Invoice date:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="date"
                            name="invoiceDate"
                            required
                            // defaultValue={formData.instLastName}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="totalDue">Total Due:<span className='req'> * </span></label>
                        </td>
                        <td>
                            <input
                            type="number"
                            name="totalDue"
                            required
                            // defaultValue={formData.phoneNumber}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="paymentComplete">Payment complete?</label>
                        </td>
                        <td>
                            <input
                            type="checkbox"
                            name="paymentComplete"
                            // defaultValue={formData.phoneNumber}
                            // onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="comments">Comments: </label>
                        </td>
                        <td>
                            <select id="comments" 
                            name="comments" 
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
            <button type="submit" className="submitButton">Create Invoice</button>
            <button type="button" id="cancelButton" className="submitButton" onClick={() => navigate("/invoices")}>
          Cancel
        </button>
        </form>
    </>
  );
}

export default CreateInvoice;