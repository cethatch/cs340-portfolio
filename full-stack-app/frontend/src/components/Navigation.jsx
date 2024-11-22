/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from 'react';
import { Link } from 'react-router-dom';

// Import icons
import { HiCurrencyDollar, HiHome, HiCalendar } from "react-icons/hi";
import { PiStudent, PiChalkboardTeacherFill } from "react-icons/pi";
import { TbToolsKitchen2 } from "react-icons/tb";
import { FaRegListAlt, FaStar, FaLink } from "react-icons/fa";
import { BsClipboard2PlusFill } from "react-icons/bs";


function Navigation() {
  return (
    <nav id="globalNav">
        <Link to="/"><i><HiHome /></i> Home</Link>
        <Link to="/classes"><FaRegListAlt /> Classes</Link>
        <Link to="/kitchens"><TbToolsKitchen2 /> Kitchens</Link>
        <Link to="/schedule"><HiCalendar /> Schedule</Link>
        <Link to="/instructors"><PiChalkboardTeacherFill /> Instructors</Link>
        <Link to="/instructor_assignments"><FaLink /> Instructor Assignments</Link>
        <Link to="/specialties"><FaStar /> Specialties</Link>
        <Link to="/students"><PiStudent /> Students</Link>
        <Link to="/registrations"><BsClipboard2PlusFill /> Registrations</Link>
        <Link to="/invoices"><i><HiCurrencyDollar /></i> Invoices</Link>
    </nav>
  );
}

export default Navigation;
