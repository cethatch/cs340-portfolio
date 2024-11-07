-- Authors: Christine Thatcher and Ingrid Gunderson Thomas
-- Team 123
-- Course: CS340 Introduction to Databases
-- Date: November 7, 2024
-- Project Step 3 Draft - Data Manipulation Queries

-------------------------------------------------
-- Display contents of Classes table
SELECT * FROM Classes;

-- Display classNames for dropdown:
SELECT className FROM Classes;

-- Add a new class to Classes table
INSERT INTO Classes (className, duration, registrationCost, classDescription)
VALUES (:classNameInput, :durationInput, :registrationCostInput, :classDescriptionInput);

-- Update a class in Classes table
UPDATE Classes SET className = :classNameInput, duration = :durationInput, registration = :registrationCostInput, classDescription = :classDescriptionInput
WHERE classID = :classIDFromUpdateForm ;

-------------------------------------------------
-- Display contents of Kitchens table
SELECT * FROM Kitchens;

-- Display Kitchen Locations for dropdowns:
SELECT kitchenLocation FROM Kitchens;

-- Add a new kitchen to Kitchens table
INSERT INTO Kitchens (kitchenLocation, capacity)
VALUES (:kitchenLocationInput, :capacityInput);

-- Update a kitchen in Kitchens table
UPDATE Kitchens SET kitchenLocation = :kitchenLocationInput, capacity = :capacityInput
WHERE kitchenID = :kitchenIDFromUpdateForm ;

-- Delete a kitchen from Kitchens table
DELETE FROM Kitchens WHERE kitchenID = :kitchenIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of ClassInstances table (Include class name from Classes and kitchen location from Kitchens)
SELECT classInstanceID, Classes.className, classDate, classTime, Kitchens.kitchenLocation, privateEvent FROM ClassInstances 
INNER JOIN Classes ON ClassInstances.classID = Classes.classID 
INNER JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID;

-- Add a new class schedule to ClassInstances table
INSERT INTO ClassInstances (classID, classDate, classTime, kitchenID, privateEvent)
VALUES (
    (SELECT classID FROM Classes WHERE className = :classNameInput),
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
FROM Instructors INNER JOIN Specialties ON Instructors.specialtyID = Specialties.specialtyID;

-- Get Instructor Names for dropdown:
SELECT instFirstName, instLastName FROM Instructors;

-- Add a new instructor to Instructors table
INSERT INTO Instructors (instFirstName, instLastName, phoneNumber, email, hireDate, specialtyID, hourlyRate)
VALUES (:instFirstNameInput, :instLastNameInput, :phoneNumberInput, :emailInput, :hireDateInput, :specialtyIDInputFromDropdown, :hourlyRateInput);

-- Update an instructor in Instructors table
UPDATE Instructors SET instFirstName = :instFirstNameInput, instLastName = :instLastNameInput, phoneNumber = :phoneNumberInput, email = :emailInput, hireDate = :hireDateInput, specialtyID = :specialtyIDFromDropdown, hourlyRate = :hourlyRateInput
WHERE instructorID = :instructorIDFromUpdateForm;

-- Delete an instructor from Instructors table
DELETE FROM Instructors WHERE instructorID = :instructorIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of ClassInstructors table
SELECT classInstructorID, Instructors.instFirstName, Instructors.instLastName, ClassInstances.classInstanceID, Classes.className, ClassInstances.classDate, ClassInstances.classTime,
Kitchens.kitchenLocation, ClassInstances.privateEvent FROM ClassInstructors
INNER JOIN Instructors ON ClassInstructors.instructorID = Instructors.instructorID
INNER JOIN ClassInstances ON ClassInstructors.classInstanceID = ClassInstances.classInstanceID 
INNER JOIN Kitchens ON ClassInstances.kitchenID = Kitchens.kitchenID
INNER JOIN Classes ON ClassInstances.classID = Classes.classID;

-- Add a new instructor assignment to ClassInstructors table
-- TODO: This query may need some workshopping
INSERT INTO ClassInstructors (instructorID, classInstanceID)
VALUES ( :instructorIDFromDrowdown, 
    ((SELECT classInstanceID FROM ClassInstances WHERE classID = :classIDFromDropdown
        AND classDate = :classDateInput 
        AND classTime = :classTimeInput 
        AND kitchenId = :kitchenIDFromDropdown
    ))
);

-- Update an instructor assignment in ClassInstructors table
-- TODO: This query may need some workshopping
UPDATE ClassInstructors SET instructorID = :instructorIDFromDropdown, 
classInstanceID = 
    ((SELECT classInstanceID FROM ClassInstances WHERE classID = :classIDFromDropdown
        AND classDate = :classDateInput 
        AND classTime = :classTimeInput 
        AND kitchenId = :kitchenIDFromDropdown
    ))
WHERE classInstructorID = :classInstructorIDFromUpdateForm;

-- Delete an instructor assignment from ClassInstructors table
DELETE FROM ClassInstructors WHERE classInstructorID = classInstructorIDSelectedFromBrowsePage;


-------------------------------------------------
-- Display contents of Specialties table
SELECT * FROM Specialties;

-- Get specialties for drop down menus
SELECT specialtyName FROM Specialties;

-- Add a new specialty to Specialties table
INSERT INTO Specialties (specialtyName)
VALUES (:specialtyNameInput);

-- Update a specialty in Specialties table
UPDATE Specialties SET specailtyName = :specialtyNameInput
WHERE specialtyID = :specialtyIDFromUpdateForm;

-- Delete a specialty from Specialties table
DELETE FROM Specialties WHERE specialtyID = :specialtyIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of Students table
SELECT * FROM Students;

-- Get students first and last names for drop down menus
SELECT firstName, lastName from Students;

-- Add a new student to Students table
INSERT INTO Students (firstName, lastName, phoneNumber, email)
VALUES (:firstNameInput, :lastNameInput, :phoneNumberInput, :emailInput);

-- Update a student in Students table
UPDATE Students SET firstName = :firstNameInput, lastName = :lastNameInput, phoneNumber = :phoneNumberInput, email = :emailInput
WHERE studentID = :studentIDFromUpdateForm;

-- Delete a student from Students table
DELETE FROM Students WHERE studentID = :studentIDSelectedFromBrowsePage;

-------------------------------------------------
-- Display contents of Registrations table
SELECT registrationID, Students.firstName, Students.lastName, Classes.className, Invoices.invoiceID FROM Registrations 
INNER JOIN Students ON Registrations.studentID = Students.studentID
INNER JOIN ClassInstances ON Registrations.classInstanceID = ClassInstances.classInstanceID
INNER JOIN Invoices ON Registrations.invoiceID = Invoices.invoiceID
INNER JOIN Classes ON ClassInstances.classID = Classes.classID;

-- Add a new registration to Registrations table
-- Since we are using a trigger to automatically generate an invoice if specified, we need to add a check to ask the user
-- if they want to generate one. This ensures we satisfy the project requirement that we must allow an INSERT into each table
-- independently.
INSERT INTO Registrations (studentID, classInstanceID, generateInvoice) 
VALUES (
    :studentIDFromDropdown, 
    classInstanceID = 
    (SELECT classInstanceID FROM ClassInstances WHERE classID = :classIDFromDropdown
        AND classDate = :classDateInput 
        AND classTime = :classTimeInput 
        AND kitchenId = :kitchenIDFromDropdown
    ),
    :generateInvoiceBoolSelection
);

-- Update a registration in Registrations table
UPDATE Registrations SET studentID = :studentIDFromDropdown, 
classInstanceID = (
SELECT classInstanceID FROM ClassInstances WHERE classID = :classIDFromDropdown
    AND classDate = :classDateInput 
    AND classTime = :classTimeInput 
    AND kitchenId = :kitchenIDFromDropdown
), generateInvoiceBoolSelection 
ON registrationID = :registrationIDFromUpdateForm;

-- Delete a registration from Registrations table
DELETE FROM Registrations WHERE registrationID = :registrationIDSelectedFromBrowsePage;


-------------------------------------------------
-- Display contents of Invoices table (with student first and last name)
SELECT invoiceID, Students.studentID, Students.firstName, Students.lastName, invoiceDate, invoiceTotal, invoicePaid, comments FROM Invoices
INNER JOIN Students ON Invoices.studentID = Students.studentID;

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

