-- Authors: Christine Thatcher and Ingrid Gunderson Thomas
-- Team 123
-- Course: CS340 Introduction to Databases
-- Date: November 7, 2024
-- Project Step 3 Draft - Data Manipulation Queries

-------------------------------------------------
-- Display contents of Classes table
SELECT * FROM Classes;

-- Get class by classID
SELECT * FROM Classes WHERE classID = :classIDReceived;

-- Add a new class to Classes table
INSERT INTO Classes (className, duration, registrationCost, classDescription)
VALUES (:classNameInput, :durationInput, :registrationCostInput, :classDescriptionInput);

-- Update a class in Classes table
UPDATE Classes SET className = :classNameInput, duration = :durationInput, registration = :registrationCostInput, classDescription = :classDescriptionInput
WHERE classID = :classIDFromUpdateForm;

-------------------------------------------------
-- Display contents of Kitchens table
SELECT * FROM Kitchens;

-- Display Kitchen Locations for dropdowns:
SELECT kitchenLocation FROM Kitchens;

-- Get kitchen by kitchenID
SELECT * FROM Kitchens WHERE kitchenID = :kitchenIDReceived;

-- Add a new kitchen to Kitchens table
INSERT INTO Kitchens (kitchenLocation, capacity)
VALUES (:kitchenLocationInput, :capacityInput);

-- Update a kitchen in Kitchens table
UPDATE Kitchens SET kitchenLocation = :kitchenLocationInput, capacity = :capacityInput
WHERE kitchenID = :kitchenIDFromUpdateForm ;

-- Delete a kitchen from Kitchens table
DELETE FROM Kitchens WHERE kitchenID = :kitchenIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of ClassInstances table
SELECT * FROM ClassInstances 
LEFT JOIN Classes ON ClassInstances.classID = Classes.classID 
LEFT JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID;

-- Get classInstance by classInstanceID
SELECT * FROM ClassInstances WHERE classInstanceID = :classInstanceReceived

-- Add a new class schedule to ClassInstances table
INSERT INTO ClassInstances (classID, classDate, classTime, kitchenID, privateEvent)
VALUES (
    :classIDFromDropdown,
    :classDateInput,
    :classTimeInput,
    :kitchenIDFromDropdown,
    :privateEventInput
);

-- Update a scheduled class in ClassInstances table
UPDATE ClassInstances SET 
classID = :classIDFromDropdown,
classDate = :classDateInput,
classTime = :classTimeInput,
kitchenID = :kitchenIDFromDropdown,
privateEvent = :privateEventInput 
WHERE classInstanceID = :classInstanceIDFromUpdateForm;

-------------------------------------------------
-- Display contents of Instructors table (Include specialties using a join)
SELECT instructorID, instFirstName, instLastName, phoneNumber, email, hireDate, Specialties.specailtyName, hourlyRate 
FROM Instructors LEFT JOIN Specialties ON Instructors.specialtyID = Specialties.specialtyID;

-- Get Instructor Names for dropdown:
SELECT instFirstName, instLastName FROM Instructors;

-- Get instructor by instructorID
SELECT * FROM Instructors WHERE instructorID = :instructorID_recvd;

-- Add a new instructor to Instructors table
INSERT INTO Instructors (instFirstName, instLastName, phoneNumber, email, hireDate, specialtyID, hourlyRate)
VALUES (:instFirstNameInput, :instLastNameInput, :phoneNumberInput, :emailInput, :hireDateInput, :specialtyIDInputFromDropdown, :hourlyRateInput);

-- Update an instructor in Instructors table
UPDATE Instructors SET instFirstName = :instFirstNameInput, instLastName = :instLastNameInput, phoneNumber = :phoneNumberInput, email = :emailInput, hireDate = :hireDateInput, specialtyID = :specialtyIDFromDropdown, hourlyRate = :hourlyRateInput
WHERE instructorID = :instructorIDFromUpdateForm;

-- Check if an instructor exists
SELECT 1 FROM Instructors WHERE instructorID = :instructorIDReceived;

-- Delete an instructor from Instructors table
DELETE FROM Instructors WHERE instructorID = :instructorIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of ClassInstructors table
SELECT * FROM ClassInstructors
LEFT JOIN Instructors ON ClassInstructors.instructorID = Instructors.instructorID
LEFT JOIN ClassInstances ON ClassInstructors.classInstanceID = ClassInstances.classInstanceID 
LEFT JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID
LEFT JOIN Classes ON ClassInstances.classID = Classes.classID;

-- Get classInstructor by classInstructorID
SELECT * FROM ClassInstructors WHERE classInstructorID = :classInstructorIDReceived;

-- Add a new instructor assignment to ClassInstructors table
INSERT INTO ClassInstructors (instructorID, classInstanceID)
VALUES (:instructorIDFromDropdown, :classInstanceFromCheckbox);

-- Update an instructor assignment in ClassInstructors table
UPDATE ClassInstructors SET instructorID = :instructorIDFromDropdown, 
classInstanceID = :classInstanceFromCheckbox
WHERE classInstructorID = :classInstructorIDFromUpdateForm;

-- Check if an instructor assignment exists
SELECT 1 FROM ClassInstructors WHERE ClassInstructorID = :classInstructorIDReceived;

-- Delete an instructor assignment from ClassInstructors table
DELETE FROM ClassInstructors WHERE classInstructorID = :classInstructorIDReceived;

-------------------------------------------------
-- Display contents of Specialties table
SELECT * FROM Specialties ORDER BY specialtyID asc;

-- Get specialties for drop down menus
SELECT specialtyName FROM Specialties;

-- Get specialty by specialtyID
SELECT * FROM Specialties WHERE specialtyID = :specialtyIDReceived;

-- Add a new specialty to Specialties table
INSERT INTO Specialties (specialtyName)
VALUES (:specialtyNameInput);

-- Update a specialty in Specialties table
UPDATE Specialties SET specailtyName = :specialtyNameInput
WHERE specialtyID = :specialtyIDFromUpdateForm;

-- Check if specialty exists
SELECT 1 FROM Specialties WHERE specialtyID = :specialtyIDReceived;

-- Delete a specialty from Specialties table
DELETE FROM Specialties WHERE specialtyID = :specialtyIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of Students table
SELECT * FROM Students;

-- Get students first and last names for drop down menus
SELECT firstName, lastName from Students;

-- Get student by studentID
SELECT * FROM Students WHERE studentID = :studentIDReceived;

-- Add a new student to Students table
INSERT INTO Students (firstName, lastName, phoneNumber, email)
VALUES (:firstNameInput, :lastNameInput, :phoneNumberInput, :emailInput);

-- Update a student in Students table
UPDATE Students SET firstName = :firstNameInput, lastName = :lastNameInput, phoneNumber = :phoneNumberInput, email = :emailInput
WHERE studentID = :studentIDFromUpdateForm;

-- Check if a student exists
SELECT 1 FROM Students WHERE studentID = :studentIDReceived;

-- Delete a student from Students table
DELETE FROM Students WHERE studentID = :studentIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of Registrations table
SELECT Registrations.registrationID,
    Students.studentID, ClassInstances.classInstanceID, Invoices.invoiceID, 
    ClassInstances.classDate, ClassInstances.classTime, Classes.className, 
    Classes.classID, Kitchens.kitchenLocation, Students.studentID, 
    Students.firstName, Students.lastName
    FROM Registrations
    LEFT JOIN Students ON Registrations.studentID = Students.studentID
    JOIN ClassInstances ON Registrations.classInstanceID = ClassInstances.classInstanceID
    LEFT JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID
    LEFT JOIN Invoices ON Registrations.invoiceID = Invoices.invoiceID
    JOIN Classes ON ClassInstances.classID = Classes.classID
    ORDER BY Registrations.registrationID;

-- Add a new registration to Registrations table
INSERT INTO Registrations (studentID, classInstanceID, generateInvoice) 
VALUES (
    :studentIDFromDropdown, 
    :classInstanceIDFromUpdateForm
    :generateInvoiceBoolSelection
);

-- Update a registration in Registrations table
UPDATE Registrations SET studentID=studentIDFromDropdown, classInstanceID=classInstanceIDFromUpdateForm WHERE registrationID=registrationIDSelectedFromBrowsePage;

-- Check if a registration exists
SELECT 1 FROM Registrations WHERE registrationID = :registrationIDReceived;

-- Delete a registration from Registrations table
DELETE FROM Registrations WHERE registrationID = :registrationIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of Invoices table (with student first and last name)
SELECT invoiceID, Students.studentID, Students.firstName, Students.lastName, invoiceDate, invoiceTotal, invoicePaid, comments FROM Invoices
INNER JOIN Students ON Invoices.studentID = Students.studentID;

-- Get invoice by invoiceID
SELECT * FROM Invoices WHERE invoiceID = :invoiceIDReceived;

-- Get the latest invoice entry
SELECT * from Invoices WHERE invoiceID = LAST_INSERT_ID();

-- Add a new invoice to Invoices table
INSERT INTO Invoices (studentID, invoiceDate, invoiceTotal, invoicePaid, comments)
VALUES (
    :studentIDFromDropdown,
    :invoiceDateInput,
    :invoiceTotalInput,
    :invoicePaidInput,
    :commentsInput
);

-- Update an invoice in Invoices table
UPDATE Invoices SET studentID = :studentIDFromDropdown, invoiceDate = :invoiceDate, invoiceTotal = :invoiceTotalInput, invoicePaid = :invoicePaidInput, comments = :commentsInput
WHERE invoiceID = :invoiceIDFromUpdateForm;
