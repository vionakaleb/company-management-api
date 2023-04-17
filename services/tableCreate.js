const Pool = require("pg").Pool;
require("dotenv").config();

// CREATE DATABASE company_management;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
})

pool.on("connect", () => {
  console.log("connected to the Database");
});

const createTables = () => {
  const tableCompany = `CREATE TABLE IF NOT EXISTS
    company (
      id serial PRIMARY KEY, 
      name varchar(255) NOT NULL, 
      address varchar(255) NOT NULL, 
      revenue bigint NOT NULL, 
      phone_code bigint NOT NULL, 
      phone_number bigint NOT NULL
    );
  `;
  const tableOffice = `CREATE TABLE IF NOT EXISTS
    office (
      id serial PRIMARY KEY, 
      name varchar(255) NOT NULL, 
      location_latitude varchar(255) NOT NULL, 
      location_longitude varchar(255) NOT NULL, 
      office_start_date varchar(255) NOT NULL, 
      company_id integer NOT NULL, 
      FOREIGN KEY (company_id) REFERENCES company (id)
    );
  `;
  const insertCompany = `INSERT INTO 
    company (
      name, 
      address, 
      revenue, 
      phone_code, 
      phone_number
    ) VALUES (
      'Test Company Viona', 
      'Tangerang Selatan', 
      18000000, 
      62, 
      8119144444
    );
  `;
  const insertOffice = `INSERT INTO 
    office (
      name, 
      location_latitude, 
      location_longitude, 
      office_start_date, 
      company_id
    ) VALUES (
      'BSD Green Office', 
      '1232412', 
      '-4233211', 
      '04/18/2022', 
      1
    );
  `;
  pool
    .query(`${tableCompany} ${tableOffice} ${insertCompany} ${insertOffice}`)
    .then((res) => {
      console.log(res, "Success creating & inserting tables.");
      pool.end();
    })
    .catch((err) => {
      console.log(err, "Error creating & inserting tables.");
      pool.end();
    });
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

//export pool and createTables to be accessible from anywhere within the application
module.exports = {
  createTables,
  pool,
};

require("make-runnable");
