# GigaBite Culinary Classes Internal Database Project

**Authors:**  
Group 123 — Christine Thatcher & Ingrid Gunderson Thomas  
**Date Submitted:** December 9, 2024  

> ⚠️ **Note:** The deployed site is **no longer live**. Please see the **Screenshots** section for visuals of the user interface.

---

## Table of Contents
- [Executive Summary](#executive-summary)
- [Project Overview](#project-overview)
- [Database Outline](#database-outline)
  - [Entity Tables](#entity-tables)
  - [Join Tables](#join-tables)
- [Entity-Relationship Diagram](#entity-relationship-diagram)
- [Schema](#schema)
- [UI Screenshots](#ui-screenshots)
- [Project Requirements Checklist](#project-requirements-checklist)
- [How to Boot Up the UI (Local / Classwork Server)](#how-to-boot-up-the-ui-local--classwork-server)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Project Citations](#project-citations)

---

## Executive Summary

Our project started as a simple schema for a cooking school but evolved significantly through **normalization**, **peer feedback**, and **iterative redesign**.  

- Early design: 4 entity tables + 2 join tables.  
- Major feedback led to **invoicing support** → attributes `invoiceAmount` and `invoicePaid` were added.  
- Iterations refined schema:
  - **ClassInstances table** created to avoid redundancy.  
  - **Specialties table** introduced to separate instructor expertise.  
  - **Invoices table** added (moved invoice attributes from Registrations).  
- **Unique constraints on emails** (Students & Instructors) improved usability.  
- **generateInvoice boolean** added to Registrations to streamline registration → invoice workflow.  

Through multiple iterations, the design grew more sophisticated and user-focused, supporting efficient operations for **GigaBite Culinary Classes**.  

---

## Project Overview

**GigaBite Culinary Classes** is a casual cooking school with locations in **Seattle** and **San Francisco**, offering:  
- ~5,000 students annually  
- 250 classes per location per year  
- ~10 instructors per location  
- 23 employees in total  

The database-driven website supports:  
- **Class scheduling**  
- **Student registration & enrollment tracking**  
- **Instructor management**  
- **Billing information collection**  

While **payroll and billing** are handled externally, the database provides the data needed for smooth integration.  

This project had two main goals:

1. **Database Design (MariaDB)**
   - Designed to support the day-to-day operations of a casual cooking school.
   - Final schema has **9 tables**, including **2 intersection tables** to resolve M:N relationships.
   - Each table supports `INSERT` independently of other tables.

2. **User Interface (React + Node.js)**
   - **Frontend:** React (Vite)
   - **Backend:** Node.js/Express
   - Home page describes each table and the operations it supports.
   - Several pages use `JOIN` queries to show human-readable data rather than raw foreign key IDs.
   - Users can `READ` and `INSERT` into each table individually; dropdowns and filtered tables remove the need to type foreign keys.

---

## Database Outline

### Entity Tables

#### **Classes**
- Tracks class offerings.  
- **Attributes:** `classID`, `className`, `duration`, `registrationCost`, `classDescription`.  
- **Relationships:** 1:M with `ClassInstances`.

#### **ClassInstances (Schedule)**
- Tracks each scheduled instance of a class.  
- **Attributes:** `classInstanceID`, `classID`, `classDate`, `classTime`, `kitchenID`, `privateEvent`.  
- **Relationships:**  
  - 1:M with `Registrations`  
  - M:N with `Instructors` (via ClassInstructors)  
  - M:1 with `Kitchens`  

#### **Students**
- Stores student data.  
- **Attributes:** `studentID`, `firstName`, `lastName`, `phoneNumber`, `email (UQ)`.  
- **Relationships:**  
  - M:N with `ClassInstances` (via Registrations)  
  - 1:M with `Registrations`  

#### **Instructors**
- Stores instructor data.  
- **Attributes:** `instructorID`, `instFirstName`, `instLastName`, `email (UQ)`, `phoneNumber`, `hireDate`, `specialtyID`, `hourlyRate`.  
- **Relationships:**  
  - M:N with `ClassInstances` (via ClassInstructors)  
  - M:1 with `Specialties`  

#### **Specialties**
- Stores instructor specialties.  
- **Attributes:** `specialtyID`, `specialtyName (UQ)`.  
- **Relationships:** 1:M with `Instructors`.

#### **Kitchens**
- Tracks classroom kitchens.  
- **Attributes:** `kitchenID`, `kitchenLocation`, `capacity`.  
- **Relationships:** 1:M with `ClassInstances`.  

#### **Invoices**
- Tracks student invoices.  
- **Attributes:** `invoiceID`, `studentID`, `invoiceDate`, `invoiceTotal`, `invoicePaid`, `comments`.  
- **Relationships:**  
  - M:1 with `Students`  
  - 1:M with `Registrations`  

---

### Join Tables

#### **ClassInstructors**
- Resolves M:N between `ClassInstances` and `Instructors`.  
- **Attributes:** `classInstructorID`, `instructorID`, `classInstanceID`.  

#### **Registrations**
- Resolves M:N between `Students` and `ClassInstances`.  
- **Attributes:** `registrationID`, `studentID`, `classInstanceID`, `generateInvoice (BOOL)`, `invoiceID`.  
- **Relationships:**  
  - M:1 with `Students`  
  - M:1 with `ClassInstances`  
  - M:1 with `Invoices`  

---

## Entity-Relationship Diagram

*(Insert ERD image here)*  
`![Entity-Relationship Diagram](screenshots/erd.jpg)`

---

## Schema

*(Insert schema diagram or SQL snippet here)*  
`![Schema](screenshots/schema.png)`

---

## UI Screenshots

Each screenshot demonstrates CRUD functionality and special handling of foreign keys.  

- **Home Page**  
  `![Home Page](screenshots/home.png)`  

- **Classes** — Read, Create, Update  
  `![Read Classes](screenshots/classes-READ.png)`  
  `![Create Class](screenshots/classes-CREATE.png)`  
  `![Update Class](screenshots/classes-UPDATE.png)`  

- **ClassInstances (Schedule)** — Read, Create, Update  
  `![Read Schedule](screenshots/classInstance-READ.png)`  
  `![Create Schedule](screenshots/classInstance-CREATE.png)`  
  `![Update Schedule](screenshots/classInstance-UPDATE.png)`  

- **Students** — Read, Create, Update, Delete  
  `![Read Students](screenshots/students-READ.png)`  
  `![Create Student](screenshots/students-CREATE.png)`  
  `![Update Student](screenshots/students-UPDATE.png)`  
  `![Delete Student](screenshots/students-DELETE.png)`  

- **Instructors & Specialties** — CRUD  
  `![Read Instructors](screenshots/instructors-READ.png)`  
  `![Create Instructor](screenshots/instructors-CREATE.png)`  
  `![Update Instructor](screenshots/instructors-UPDATE.png)`  
  `![Delete Instructor](screenshots/instructors-DELETE.png)`  
  `![Read Specialties](screenshots/specialties-READ.png)`  
  `![Create Specialty](screenshots/specialties-CREATE.png)`  
  `![Update Specialty](screenshots/specialties-UPDATE.png)`  
  `![Delete Specialty](screenshots/specialties-DELETE.png)`  

- **Kitchens** — CRUD  
  `![Read Kitchens](screenshots/kitchens-READ.png)`  
  `![Create Kitchen](screenshots/kitchens-CREATE.png)`  
  `![Update Kitchen](screenshots/kitchens-UPDATE.png)`  
  `![Delete Kitchen](screenshots/kitchens-DELETE.png)`  

- **Invoices** — CRUD  
  `![Read Invoices](screenshots/invoices-READ.png)`  
  `![Create Invoice](screenshots/invoices-CREATE.png)`  
  `![Update Invoice](screenshots/invoices-UPDATE.png)`  

- **ClassInstructors (M:N)** — CRUD  
  `![Read ClassInstructors](screenshots/instructorAssignments-READ.png)`  
  `![Create ClassInstructor](screenshots/instructorAssignments-CREATE.png)`  
  `![Update ClassInstructor](screenshots/instructorAssignments-UPDATE.png)`  
  `![Delete ClassInstructor](screenshots/instructorAssignments-DELETE.png)`  

- **Registrations (M:N)** — CRUD  
  `![Read Registrations](screenshots/registrations-READ.png)`  
  `![Create Registration](screenshots/registrations-CREATE.png)`  
  `![Update Registration](screenshots/registrations-UPDATE.png)`  
  `![Delete Registration](screenshots/registrations-DELETE.png)`  

---

## Project Requirements Checklist

- ✅ ≥ 3 rows of sample data per table  
- ✅ ≥ 4 entity tables + ≥ 1 intersection table  
- ✅ Web UI with full interaction  
- ✅ INSERT supported in every table  
- ✅ Each table queried at least once  
- ✅ UPDATE in all tables  
- ✅ DELETE in selected tables  
- ✅ Foreign keys handled with dropdowns/checkboxes (not manual input)  
- ✅ At least one NULLable FK (`kitchenID`, `specialtyID`, `studentID`, `instructorID`)  
- ✅ Safe deletion from M:N without anomalies  

---

## How to Boot Up the UI (Local / Classwork Server)

> Assumes the database is hosted on `classwork.engr.oregonstate.edu` and the backend runs there as well.

### Backend Setup

1. In the `backend` directory, create a `.env` file:
   ```
   DB_HOST="classmysql.engr.oregonstate.edu"
   DB_USER=""                 # your ONID
   DB_DATABASE="cs340_ONID"   # replace ONID
   DB_PASSWORD=""             # last 4 digits of OSU ID
   PORT=                      # choose an available port
    ```

2. Install dependencies and start the server:
```
npm install
# temporary run
npm run start
# persistent (uses forever)
npm run serve
```

3. (Optional) Check forever status:
```
alias forever='./node_modules/forever/bin/forever'
forever list
```

### Frontend Setup
1. In the `frontend` directory, create a `.env` file:
    ```
    VITE_PORT=33693
    REACT_SERVER_PORT=45895
    VITE_API_URL='http://classwork.engr.oregonstate.edu:BACKENDPORT/api/'  # replace BACKENDPORT with your backend port
    ```
2. Install dependencies and run:
    ```
    npm install
    # temporary run
    npm run start
    # build + persistent (forever)
    npm run build
    npm run serve
    ```
3. Open the app in your browser using the value of `REACT_SERVER_PORT`.
---

## Project Citations

- **Frontend & Backend Starter Code** — adapted from:  
  https://github.com/osu-cs340-ecampus/react-starter-app  
  Authors: Zac Maes & Devin Daniels (Fall 2024)  

- **Styling (App.css)** — adapted from OSU CS290 course material:  
  https://replit.com/@PamVanLonden/a-Global-Stylesheet#App.css  
  Author: Pam VanLonden (Spring 2024)  
