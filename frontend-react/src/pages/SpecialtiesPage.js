import React from "react";

function SpecialtiesPage() {
    return (
        <>
        <main>
        <section>
            <h2>Instructor Specialties</h2>
            
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>Specialty ID</th>
                            <th>Specialty Name</th>
                            <th>Delete Entry</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Pastry Arts</td>
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

export default SpecialtiesPage