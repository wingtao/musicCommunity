CREATE TABLE sing (
    name            varchar(100) not null,
    id         	    varchar(50) primary key,
    size	    float not null,           
    time            date not null,
    number	    bigint
);

CREATE TABLE csuUser (
    company         varchar(100) ,
    id         	    varchar(50) primary key,
    password	    varchar(30),           
    address         varchar(80),
    cellphone	    int not null,
    phone	    int,
    email 	    varchar(50)
);

CREATE TABLE comment (
    id         	    varchar(50) primary key,
    commentText    text not null,           
    time            date not null
);
