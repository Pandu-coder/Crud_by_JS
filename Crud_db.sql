create database if not exists pandu;
use pandu;

create table if not exists students(
id int auto_increment primary key,
name varchar(50),
age int unsigned,
city varchar(50));


select* from students;




