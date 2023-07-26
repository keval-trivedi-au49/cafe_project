create table user(
    id int primary key AUTO_INCREMENT,
    name varchar(255),
    contactnumber varchar(20),
    email varchar(255),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE(email)
);

insert into user(name, contactnumber, email, password, status, role) values('Admin','1234567890','admin@gmail.com','admin','true','admin');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    primary key(id)
);

create table product(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    categoryId integer NOT NULL,
    description varchar(255),
    price integer,
    status varchar(20),
    primary key(id)
);

create table bill(
    id int NOT NULL AUTO_INCREMENT,
    uuid varchar(200) NOT NULL,
    name varchar(200) NOT NULL,
    email varchar(200) NOT NULL,
    contactnumber varchar(20) NOT NULL,
    paymentmethod varchar(50) NOT NULL,
    total int NOT NULL,
    productdetails JSON DEFAULT NULL,
    primary key(id)
);

