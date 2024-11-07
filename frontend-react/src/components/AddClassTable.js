import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export const AddClassTable = () => {

    const [name, setName]            = useState('');
    const [date, setDate]            = useState('');
    const [amount, setAmount]        = useState('');
    
    const redirect = useNavigate();

    const addExpense = async () => {
        const newExpense = { category, amount, date };
        const response = await fetch('/expenses', {
            method: 'post',
            body: JSON.stringify(newExpense),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(response.status === 201){
            alert(`The expense was successfully logged.`);
            redirect("/expenses");
        } else {
            alert(`The expense was not recorded due to missing data. Please try again. Status = ${response.status}`);
            redirect("/create");
        }
        
    };


    return (
        <>
        <article>

            <p>To add a new expense record to the log, please fill out the form below and press submit.
            </p>

            <p>Required fields are outlined with a red-dotted border.</p>
            
            <table id="expenses">
                <caption>Please input the details for an expense you would like to add.</caption>
                <thead>
                    <tr>
                        <th>Transaction Date</th>
                        <th>Expense Category</th>
                        <th>Expense Amount</th>
                    </tr>
                </thead>
                <tbody>
                <tr>
                <td><label for="date"></label>
                        <input
                            type="date"
                            value={date}
                            placeholder="Date of the expense"
                            required
                            onChange={e => setDate(e.target.value)} 
                            id="date" />
                    </td>

                <td><label for="category"></label>
                        <input
                            type="text"
                            required
                            placeholder="Expense Category"
                            value={category}
                            onChange={e => setCategory(e.target.value)} 
                            id="category" />
                    </td>

                    
                    <td><label for="amount"></label>
                        $<input
                            type="number"
                            placeholder="Transaction amount"
                            value={amount}
                            required
                            onChange={e => setAmount(e.target.value)} 
                            id="amount" />
                    </td>

                </tr>
                </tbody>
            </table>
            <button
                type="submit"
                onClick={addExpense}
                id="submit"
                >Add Expense</button>
        </article>
    </>
);
}

export default AddExpensePageTable;
  