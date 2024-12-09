/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ({ class_entry }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    // We can access the id using the state variable an use it to navigate to the update page
    navigate(`/classes/update/${class_entry.classID}`, { state: { class_entry } });
  
  };

  return (
    <tr key={class_entry.classID}>
      <td>{class_entry.classID}</td>
      <td>{class_entry.className}</td>
      <td>{class_entry.duration}</td>
      <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(class_entry.registrationCost)}</td>
      <td>{class_entry.classDescription}</td>
      <td className="editCol">
        <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }} />
      </td>
    </tr>
  );
};

export default TableRow;
