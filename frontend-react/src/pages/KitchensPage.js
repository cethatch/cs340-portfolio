import React from "react";

function KitchensPage() {
    return (
        <>
        <main>
        <section>
            <h2>Teaching Kitchens</h2>
            
            <article>
                <table>
                    <tbody>
                        <tr>
                            <th>Kitchen ID</th>
                            <th>Kitchen Location</th>
                            <th>Persons Capacity</th>
                            <th>Delete Entry</th>
                        </tr>
                        <tr>
                            
                            <td>1</td>
                            <td>123 Market St, San Francisco, CA 94103</td>
                            <td>20</td>
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

export default KitchensPage