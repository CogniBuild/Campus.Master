--Create Database
CREATE DATABASE AntiBlogDB

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

CREATE TABLE [BlogSubscribers]
(
    UserId INT NOT NULL,
    BlogId INT NOT NULL,
    PRIMARY KEY (UserId, BlogId),
    FOREIGN KEY (UserId) REFERENCES [User] (Id),
    FOREIGN KEY (BlogId) REFERENCES [Blog] (Id),
)

CREATE TABLE [Post]
(
    Id      INT IDENTITY  NOT NULL PRIMARY KEY,
    Header  NVARCHAR(300) NOT NULL,
    Preview NVARCHAR(MAX),--Allow null because we need to cover US with not available preview in order to keep intrigue  
    Content NVARCHAR(MAX) NOT NULL,
    BlogId  INT FOREIGN KEY REFERENCES [Blog] (Id)
)

CREATE TABLE [Tag]
(
    Id     INT IDENTITY NOT NULL PRIMARY KEY,
    Name   NVARCHAR(50) NOT NULL,
    PostId INT FOREIGN KEY REFERENCES [Post] (Id)
)

CREATE TABLE Comment
(
    Id       INT IDENTITY  NOT NULL PRIMARY KEY,
    Summary  NVARCHAR(MAX) NOT NULL,
    Content  NVARCHAR(MAX) NOT NULL,
    Date     DATETIME      NOT NULL,
    ParentId INT FOREIGN KEY REFERENCES [Comment] (Id),
    UserId   INT FOREIGN KEY REFERENCES [User] (Id),
    PostId   INT FOREIGN KEY REFERENCES [Post] (Id)
)