CREATE TABLE User_Detail (
    Email VARCHAR(50),
    Password VARCHAR(500),
	PRIMARY KEY(Email)
);

CREATE TABLE User_subject (
    Subject VARCHAR(50),
    Email VARCHAR(50),
	FOREIGN KEY (Email) REFERENCES User_Detail(Email),
	PRIMARY KEY(Email,Subject)
);


CREATE TABLE User_subject_question (
    Subject VARCHAR(50),
    Email VARCHAR(50),
    Question_No INT(4),
    Question VARCHAR(500),
    Answer VARCHAR(1000),
	FOREIGN KEY (Email,Subject) REFERENCES User_subject(Email,Subject),
	PRIMARY KEY(Email,Subject,Question_No)
);





INSERT INTO User_Detail (Email, Password)
VALUES
('user1@example.com', FLOOR(10000 + RAND() * 90000)), 
('user2@example.com', FLOOR(10000 + RAND() * 90000)), 
('user3@example.com', FLOOR(10000 + RAND() * 90000)), 
('user4@example.com', FLOOR(10000 + RAND() * 90000)), 
('user5@example.com', FLOOR(10000 + RAND() * 90000)),
('user6@example.com', FLOOR(10000 + RAND() * 90000)), 
('user7@example.com', FLOOR(10000 + RAND() * 90000)), 
('user8@example.com', FLOOR(10000 + RAND() * 90000)), 
('user9@example.com', FLOOR(10000 + RAND() * 90000)), 
('user10@example.com', FLOOR(10000 + RAND() * 90000)); 







INSERT INTO user_subject (email, subject)
VALUES
('user1@example.com', 'Mathematics'),
('user2@example.com', 'Science'),
('user3@example.com', 'History'),
('user4@example.com', 'English'),
('user5@example.com', 'Geography'),
('user6@example.com', 'Physics'),
('user7@example.com', 'Literature'),
('user8@example.com', 'Chemistry'),
('manith', 'Biology'),
('manith', 'Mathematics'),
('manith', 'Science'),
('manith', 'Art'),
('manith', 'English'),
('manith', 'History'),
('manith', 'Geography'),
('manith', 'Literature'),
('manith', 'Physics'),
('manith', 'Chemistry');


select * from User_subject;
select * from User_Detail;

