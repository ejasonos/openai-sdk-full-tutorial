-- create database ragdb;
-- use ragdb;
-- show tables;
create table company(
	id int auto_increment primary key,
	title varchar(255),
    content blob,
	created_at datetime
);
-- drop table company; 