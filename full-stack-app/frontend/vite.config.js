/*
The code used on this page was adapted from the CS340 React Starter App, 
and made to suit our portfolio project's topic and database.

Authors: Zac Maes and Devin Daniels.
https://github.com/osu-cs340-ecampus/react-starter-app 
Accessed during the Fall 2024 term.
*/

// FILE: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
plugins: [react()],
esbuild: {
   loader: "jsx"
},
server: {
   // Use VITE_PORT from your .env, or default to a port if not specified
   port: parseInt(process.env.VITE_PORT, 10) || 5173
},
// root: './frontend', // Adjust this to the directory containing index.html
})

