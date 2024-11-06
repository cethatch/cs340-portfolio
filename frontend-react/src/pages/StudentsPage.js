import React from "react";

function StudentsPage() {
    return (
        <>
        <main>
        <section>
            <h2>Students</h2>
            
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>Student ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Delete Entry</th>
                        </tr>
                        <tr>
                            
                            <td>1</td>
                            <td>Sarah</td>
                            <td>Thompson</td>
                            <td>+44 7911 123456</td>
                            <td>sarah.thompson@email.com</td>
                            <td>
                                <div class="deleteButton">
                                    <button>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                        
                    </tbody>
                </table>

            </article>

        </section>
        </main>
        </>
    );
}

export default StudentsPage