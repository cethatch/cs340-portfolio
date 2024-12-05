/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import axios from "axios";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const TableRow = ( {registration} ) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit class page
  const handleEdit = () => {
    // We can access the id (and query the person) with useParams() in the UpdatePerson component
    navigate("/registrations/update/" + registration.registrationID, { state: { registration } });
  };

  const deleteRow = async () => {
    navigate(`/registrations/delete/${registration.registrationID}`, {state: {registration}});
  };

  return (
      <tr>
        <td>{registration.registrationID}</td>
        <td>{registration.firstName + " " + registration.lastName}</td>
        <td>{registration.className}</td>
        <td>{registration.classInstanceID}</td>
        <td>{registration.invoiceID}</td>

        <td class="editCol">
          <BiEditAlt onClick={handleEdit} size={25} style={{ cursor: "pointer" }}/>
        </td>
        <td>
        <MdDelete onClick={deleteRow} size={25} style={{ cursor: "pointer"}} />
      </td>
      </tr>

  );
};

export default TableRow;