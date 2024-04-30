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



