-- Authors: Christine Thatcher and Ingrid Gunderson Thomas
-- Team 123
-- Course: CS340 Introduction to Databases
-- Date: October 30, 2024
-- Project Step 2 Draft SQL Portion

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-------------------------------------------------------------------------------------------
-- Create Database Tables:
-------------------------------------------------------------------------------------------

-- Create Students table for holding information about students:
CREATE OR REPLACE TABLE Students (
    studentID int(11) AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(15) NULL,
    email VARCHAR(100) NULL,
    PRIMARY KEY (studentID),
    UNIQUE (email)
);

-- Create Specialties table for holding information about specialties a instructor may have:
CREATE OR REPLACE TABLE Specialties (
    specialtyID int(11) AUTO_INCREMENT NOT NULL,
    specialtyName VARCHAR(100) NOT NULL,
    UNIQUE (specialtyName),
    PRIMARY KEY (specialtyID)
);

-- Create Instructor table for holding information about instructors:
CREATE OR REPLACE TABLE Instructors (
    instructorID int(11) AUTO_INCREMENT NOT NULL,
    instFirstName VARCHAR(50) NOT NULL,
    instLastName VARCHAR(50) NOT NULL,
    phoneNumber VARCHAR(15) NULL,
    email VARCHAR(100) NULL,
    hireDate DATE NOT NULL,
    specialtyID int(11) NULL,
    hourlyRate DECIMAL(5,2) NULL,
    PRIMARY KEY (instructorID),
    UNIQUE (email),
    FOREIGN KEY (specialtyID) REFERENCES Specialties(specialtyID) ON DELETE SET NULL
);

-- Create Classes table for holding information about class types:
CREATE OR REPLACE TABLE Classes (
    classID int(11) AUTO_INCREMENT NOT NULL,
    className VARCHAR(100) NOT NULL,
    duration INT NULL,
    registrationCost DECIMAL(6,2) NULL,
    classDescription TEXT NULL,
    PRIMARY KEY (classID),
    UNIQUE (className)
);

-- Create Kitchens table for holding information about teaching kitchens:
CREATE OR REPLACE TABLE Kitchens (
    kitchenID int(11) AUTO_INCREMENT NOT NULL,
    kitchenLocation VARCHAR(100) NOT NULL,
    capacity int(11) NOT NULL,
    PRIMARY KEY (kitchenID)
);

-- Create ClassInstances table for holding information each scheduled class type:
CREATE OR REPLACE TABLE ClassInstances (
    classInstanceID int(11) AUTO_INCREMENT NOT NULL,
    classID int(11) NOT NULL,
    classDate DATE NOT NULL,
    classTime TIME NOT NULL,
    kitchenID int(11) NULL,
    privateEvent TINYINT(1),
    PRIMARY KEY (classInstanceID),
    FOREIGN KEY (classID) REFERENCES Classes(classID) ON DELETE RESTRICT,
    FOREIGN KEY (kitchenID) REFERENCES Kitchens(kitchenID) ON DELETE SET NULL
);

-- Create Invoices table for holding information about invoices:
CREATE OR REPLACE TABLE Invoices (
    invoiceID int(11) AUTO_INCREMENT NOT NULL,
    studentID int(11) NULL,
    invoiceDate DATE NOT NULL,
    invoiceTotal DECIMAL(6,2) NULL,
    invoicePaid TINYINT(1),
    comments TEXT NULL,
    PRIMARY KEY (invoiceID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE SET NULL
);

-- Create Registrations table for associating students to classes they sign up for:
-- Trigger will automatically generate an invoice entry if generateInvoice is True.
CREATE OR REPLACE TABLE Registrations (
    registrationID int(11) AUTO_INCREMENT NOT NULL,
    studentID int(11) NOT NULL,
    classInstanceID int(11) NOT NULL,
    generateInvoice TINYINT(1) NOT NULL DEFAULT 1,
    invoiceID int(11) NULL,
    PRIMARY KEY (registrationID),
    FOREIGN KEY (studentID) REFERENCES Students(studentID) ON DELETE CASCADE,
    FOREIGN KEY (classInstanceID) REFERENCES ClassInstances(classInstanceID) ON DELETE RESTRICT,
    FOREIGN KEY (invoiceID) REFERENCES Invoices(invoiceID) ON DELETE RESTRICT
);

-- Create ClassInstructors table for associating instructors with the scheduled class type they will teach:
CREATE OR REPLACE TABLE ClassInstructors (
    classInstructorID int(11) AUTO_INCREMENT NOT NULL,
    classInstanceID int(11) NOT NULL,
    instructorID int(11) NULL,
    PRIMARY KEY (classInstructorID),
    FOREIGN KEY (classInstanceID) REFERENCES ClassInstances(classInstanceID) ON DELETE RESTRICT,
    FOREIGN KEY (instructorID) REFERENCES Instructors(instructorID) ON DELETE SET NULL
);

-------------------------------------------------------------------------------------------
-- Insert Example Data:
-------------------------------------------------------------------------------------------

-- Populate Students table with example data:
INSERT INTO Students (firstName, lastName, phoneNumber, email)
VALUES ('Sarah','Thompson','+447911123456','sarah.thompson@email.com'),
('James','Anderson','+819012345678','james.anderson@email.com'),
('Emily','Martinez','+14152345678','emily.martinez@email.com'),
('Michael','Brown','+16464567890','michael.brown@email.com'),
('Laura','Wilson','+15555678901','laura.wilson@email.com');

-- Populate Specialties table with example data:
INSERT INTO Specialties (specialtyName)
VALUES ('Pastry Arts'), ('French Cuisine'), ('Italian Cuisine'), ('Asian Cuisine'), ('Bread and Baking');

-- Populate Instructors table with example data:
INSERT INTO Instructors (instFirstName, instLastName, phoneNumber, email, hireDate, specialtyID, hourlyRate)
VALUES ('Olivia','Garcia','+12125551234','olivia.garcia@email.com', 20210415, (SELECT specialtyID FROM Specialties where specialtyName = 'Asian Cuisine'), 61.00),
('Ethan','Chen','+14155552345','ethan.chen@email.com', 20200608, (SELECT specialtyID FROM Specialties where specialtyName = 'French Cuisine'), 59.50),
('Mia','Patel','+13055553456','mia.patel@email.com', 20190923, (SELECT specialtyID FROM Specialties where specialtyName = 'Italian Cuisine'), 60.25),
('Benjamin', 'Lee', '+16175554567','benjamin.lee@email.com', 20220211, (SELECT specialtyID FROM Specialties where specialtyName = 'Asian Cuisine'), 58.75),
('Sophia', 'Kim','+13125555678','sophia.kim@email.com',20230117, (SELECT specialtyID FROM Specialties where specialtyName = 'Bread and Baking'), 60.75);

-- Populate Classes table with example data:
INSERT INTO Classes (className, duration, registrationCost, classDescription)
VALUES ('Sushi Rolling Basics', 90, 65.00, 'Learn how to prepare and roll sushi from scratch.'),
('French Sauces', 150, 80.00, 'Master the art of making classic French sauces.'),
('Bread Baking Basics', 180, 100.00, 'Class on artisan bread baking techniques.');

-- Populate Kitchens table with example data:
INSERT INTO Kitchens (kitchenLocation, capacity)
VALUES ('123 Market St, San Francisco, CA 94103', 20),
('456 Pine St, Seattle, WA 98101', 25),
('222 Geary St, San Francisco, CA 94102', 22);

-- Populate ClassInstances table with example data:
INSERT INTO ClassInstances (classID, classDate, classTime, kitchenID, privateEvent)
VALUES
((SELECT classID FROM Classes WHERE className = 'Sushi Rolling Basics'), 20241115, '17:30:00', (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '456 Pine St, Seattle, WA 98101'), 0),
((SELECT classID FROM Classes WHERE className = 'Sushi Rolling Basics'), 20241115, '17:30:00', (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103'), 0),
((SELECT classID FROM Classes WHERE className = 'French Sauces'), 20241116, '17:30:00', (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103'), 0),
((SELECT classID FROM Classes WHERE className = 'French Sauces'), 20241117, '18:00:00', (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '456 Pine St, Seattle, WA 98101'), 0),
((SELECT classID FROM Classes WHERE className = 'Bread Baking Basics'), 20241120, '10:00:00', (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103'), 1);

-- Populate Invoices table with example data:
INSERT INTO Invoices (studentID, invoiceDate, invoiceTotal, invoicePaid) 
VALUES (1, 20241130, 140.00, 1),
(4, 20241130, 65.00, 1),
(3, 20241130, 65.00, 1),
(2, 20241130, 100.00, 1);

-- Populate Registrations table with example data:
INSERT INTO Registrations (studentID, classInstanceID, invoiceID)
VALUES 
((SELECT studentID FROM Students WHERE email = 'sarah.thompson@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241115 AND classTime = '17:30:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '456 Pine St, Seattle, WA 98101')), 1),

((SELECT studentID FROM Students WHERE email = 'sarah.thompson@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241117 AND classTime = '18:00:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '456 Pine St, Seattle, WA 98101')), 1),

((SELECT studentID FROM Students WHERE email = 'michael.brown@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241115 AND classTime = '17:30:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '456 Pine St, Seattle, WA 98101')), 2),

((SELECT studentID FROM Students WHERE email = 'emily.martinez@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241115 AND classTime = '17:30:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103')), 3),

((SELECT studentID FROM Students WHERE email = 'james.anderson@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241120 AND classTime = '10:00:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103')), 4);

-- Populate ClassInstructors table with example data:
INSERT INTO ClassInstructors (instructorID, classInstanceID)
VALUES 
((SELECT instructorID FROM Instructors WHERE email='olivia.garcia@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241115 AND classTime = '17:30:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '456 Pine St, Seattle, WA 98101'))),

((SELECT instructorID FROM Instructors WHERE email='benjamin.lee@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241115 AND classTime = '17:30:00' AND kitchenID =
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103'))),

((SELECT instructorID FROM Instructors WHERE email='ethan.chen@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241116 AND classTime = '17:30:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103'))),

((SELECT instructorID FROM Instructors WHERE email='mia.patel@email.com'),
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241117 AND classTime = '18:00:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '456 Pine St, Seattle, WA 98101'))),

((SELECT instructorID FROM Instructors WHERE email='sophia.kim@email.com'), 
    (SELECT classInstanceID FROM ClassInstances WHERE classDate = 20241120 AND classTime = '10:00:00' AND kitchenID = 
        (SELECT kitchenID FROM Kitchens WHERE kitchenLocation = '123 Market St, San Francisco, CA 94103')));

SET FOREIGN_KEY_CHECKS=1;
COMMIT;