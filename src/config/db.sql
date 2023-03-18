
        
CREATE TABLE Account
(
  accountId INT       NOT NULL,
  username  varchar   NOT NULL,
  email     varchar   NOT NULL,
  password  varchar   NOT NULL,
  createdAt timestamp NOT NULL,
  updatedAt timestamp,
  PRIMARY KEY (accountId)
);

CREATE TABLE Answer
(
  id         INT     NOT NULL,
  value      varchar NOT NULL,
  nie        varchar NOT NULL,
  questionId INT     NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Evaluate
(
  formId    INT NOT NULL,
  teacherId INT NOT NULL,
  PRIMARY KEY (formId, teacherId)
);

CREATE TABLE Form
(
  formId      INT     NOT NULL,
  title       varchar NOT NULL,
  description varchar,
  level       varchar NOT NULL,
  date        date    NOT NULL,
  accessKey   varchar NOT NULL,
  state       varchar NOT NULL DEFAULT 'new',
  name        varchar NOT NULL,
  email       varchar NOT NULL,
  comment     varchar,
  accountId   INT     NOT NULL,
  PRIMARY KEY (formId)
);

CREATE TABLE Option
(
  optionId   INT     NOT NULL,
  value      varchar NOT NULL,
  questionId INT     NOT NULL,
  PRIMARY KEY (optionId)
);

CREATE TABLE Question
(
  questionId INT     NOT NULL,
  title      varchar NOT NULL,
  formId     INT     NOT NULL,
  required   BOOLEAN NOT NULL DEFAULT true,
  answerType varchar NOT NULL DEFAULT 'text',
  sectionId  INT    ,
  PRIMARY KEY (questionId)
);

CREATE TABLE Section
(
  sectionId INT     NOT NULL,
  title     varchar NOT NULL,
  PRIMARY KEY (sectionId)
);

CREATE TABLE Student
(
  nie       varchar NOT NULL,
  lastname  varchar NOT NULL,
  firstname varchar NOT NULL,
  level     varchar NOT NULL,
  PRIMARY KEY (nie)
);

CREATE TABLE Teacher
(
  teacherId INT     NOT NULL,
  lastname  varchar NOT NULL,
  firstname varchar NOT NULL,
  PRIMARY KEY (teacherId)
);

ALTER TABLE Answer
  ADD CONSTRAINT FK_Student_TO_Answer
    FOREIGN KEY (nie)
    REFERENCES Student (nie);

ALTER TABLE Question
  ADD CONSTRAINT FK_Form_TO_Question
    FOREIGN KEY (formId)
    REFERENCES Form (formId);

ALTER TABLE Option
  ADD CONSTRAINT FK_Question_TO_Option
    FOREIGN KEY (questionId)
    REFERENCES Question (questionId);

ALTER TABLE Answer
  ADD CONSTRAINT FK_Question_TO_Answer
    FOREIGN KEY (questionId)
    REFERENCES Question (questionId);

ALTER TABLE Evaluate
  ADD CONSTRAINT FK_Form_TO_Evaluate
    FOREIGN KEY (formId)
    REFERENCES Form (formId);

ALTER TABLE Evaluate
  ADD CONSTRAINT FK_Teacher_TO_Evaluate
    FOREIGN KEY (teacherId)
    REFERENCES Teacher (teacherId);

ALTER TABLE Question
  ADD CONSTRAINT FK_Section_TO_Question
    FOREIGN KEY (sectionId)
    REFERENCES Section (sectionId);

ALTER TABLE Form
  ADD CONSTRAINT FK_Account_TO_Form
    FOREIGN KEY (accountId)
    REFERENCES Account (accountId);

        
      