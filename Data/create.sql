--Create Database
CREATE DATABASE AntiBlogDB ON PRIMARY

USE AntiBlogDB

CREATE TABLE [Role]
(
    Id   INT IDENTITY NOT NULL PRIMARY KEY,
    Name VARCHAR(50)  NOT NULL
)

CREATE TABLE [User]
(
    Id               INT IDENTITY NOT NULL PRIMARY KEY,
    Login            VARCHAR(60)  NOT NULL,
    PasswordHash     VARCHAR(MAX) NOT NULL,
    RegistrationDate DATETIME     NOT NULL,
    RoleId           INT FOREIGN KEY REFERENCES [Role] (Id)
)

CREATE TABLE [Blog]
(
    Id          INT IDENTITY  NOT NULL PRIMARY KEY,
    Name        NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    OwnerId     INT FOREIGN KEY REFERENCES [User] (Id)
)