const Pool = require('pg').Pool
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})

/* COMPANY */
const getCompanies = (request, response) => {
  pool.query('SELECT * FROM company ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const getCompanyById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM company WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const createCompany = (request, response) => {
  const { name, address, revenue, phone_code, phone_number } = request.body

  pool.query('INSERT INTO company (name, address, revenue, phone_code, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [name, address, revenue, phone_code, phone_number], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Company added with ID: ${results.rows[0].id}`);
  })
}

const updateCompany = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, address, revenue, phone_code, phone_number } = request.body;

  pool.query('UPDATE company SET name = $1, address = $2, revenue = $3, phone_code = $4, phone_number = $5 WHERE id = $6',
  [name, address, revenue, phone_code, phone_number, id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Company modified with ID: ${id}`);
  })
}

const deleteCompany = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM company WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Company deleted with ID: ${id}`)
  })
}

module.exports = {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
}
