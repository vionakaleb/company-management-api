CREATE DATABASE company_management;

CREATE TABLE company (id serial PRIMARY KEY, name varchar(255) NOT NULL, address varchar(255) NOT NULL, revenue integer NOT NULL, phone_code integer NOT NULL, phone_number integer NOT NULL);
CREATE TABLE office (id serial PRIMARY KEY, name varchar(255) NOT NULL, location_latitude varchar(255) NOT NULL, location_longitude varchar(255) NOT NULL, office_start_date varchar(255) NOT NULL, company_id integer NOT NULL, FOREIGN KEY (company_id) REFERENCES company (id));

INSERT INTO company (name, address, revenue, phone_code, phone_number) VALUES ('Test Company', 'Jakarta Selatan', 100000000000, 62, 82112345);
INSERT INTO office (name, location_latitude, location_longitude, office_start_date, company_id) VALUES ('Blok M', '1232412', '-4233211', '04/18/2022', 1);