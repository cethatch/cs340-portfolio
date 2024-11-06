import React from "react";

function ClassesPage() {
    return (
        <>
        <main>
            <section>
                <h2>Culinary Classes</h2>
                
                <article>
                    <table>
                        <tbody>
                            <tr>
                                <th>Class ID</th>
                                <th>Class Name</th>
                                <th>Duration (Minutes)</th>
                                <th>Registration Cost (USD)</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                
                                <td>1</td>
                                <td>Sushi Rolling Basics</td>
                                <td>90</td>
                                <td>$65.00</td>
                                <td>Learn how to prepare and roll sushi from scratch.</td>
                            </tr>
                            
                        </tbody>
                    </table>

                    <p><em>Note: Class entries may not be deleted.</em></p>

                </article>

            </section>
        </main>
        </>
    );
}

export default ClassesPage