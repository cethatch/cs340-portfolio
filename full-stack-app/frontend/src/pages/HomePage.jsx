/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

import React from "react";

function HomePage() {
    return (
        <>
        <main>
        <section>
            <h2>Home Page</h2>
            
            <article id="aboutDB">
                <h3>Project Description</h3>
                <p> 
                    GigaBite Culinary Classes is a unique, casual cooking school 
                    designed for food lovers of all skill levels. Across both locations 
                    in Seattle and San Francisco, the company welcomes 5,000 new and 
                    returning students each year for a fun, social environment to explore 
                    their culinary creativity. Each location hosts 250 classes annually, 
                    or about 5 classes per week, in various teaching kitchens. Students 
                    may register for multiple classes, and each class may have one or more 
                    instructors. Each location employs approximately 10 instructors. 
                    Combined with two administrative personnel, one for each geographical 
                    location, the company has a total of 23 employees. This project’s 
                    goal is to design and implement a database driven website to track 
                    student, instructor, and class data for GigaBite Culinary Classes. The 
                    completed tool will facilitate administrative tasks such as scheduling 
                    upcoming classes, student registration, tracking enrollment, and collecting 
                    billing information. The billing and payroll will be handled by a separate 
                    external system but will rely on information collected by the database 
                    that will make the processes run smoothly. By centralizing this 
                    information, the database-driven website will streamline operations, and 
                    provide the foundation for efficient growth while ensuring that GigaBite 
                    Culinary Classes can continue offering exceptional culinary experiences.

                </p>
                <h3>Database Entity Tables</h3>
                <p>
                    ...intro here...
                </p>
                <table class="tableDescriptions">
                    <tbody>
                        <tr>
                            <th>Table Name</th>
                            <th>Table Description</th>
                        </tr>
                        <tr>
                            <td><strong>Classes</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        <tr>
                            <td><strong>Kitchens</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        <tr>
                            <td><strong>ClassInstances</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        <tr>
                            <td><strong>Instructors</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        <tr>
                            <td><strong>Specialties</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        <tr>
                            <td><strong>Students</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        <tr>
                            <td><strong>Registrations</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        <tr>
                            <td><strong>Invoices</strong></td>
                            <td>Description of table...</td>
                        </tr>
                        </tbody>
                    </table>
                </article>

            </section>
        </main>
        </>
    );
}

export default HomePage