const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'company_management',
  password: 'admin123',
  port: 5432,
})

/* OFFICE */
const getOffices = (request, response) => {
  const companyId = parseInt(request.params.id);

  pool.query('SELECT * FROM office WHERE company_id = $1', [companyId], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const getOfficeById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('SELECT * FROM office WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  })
}

const createOffice = (request, response) => {
  const { name, location_latitude, location_longitude, office_start_date, company_id } = request.body;

  pool.query('INSERT INTO office (name, location_latitude, location_longitude, office_start_date, company_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  [name, location_latitude, location_longitude, office_start_date, company_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Office added with ID: ${results.rows[0].id}`);
  })
}

const updateOffice = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, location_latitude, location_longitude, office_start_date, company_id } = request.body;

  pool.query('UPDATE office SET name = $1, address = $2, revenue = $3, phone_code = $4, phone_number = $5 WHERE id = $6',
  [name, location_latitude, location_longitude, office_start_date, company_id, id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(201).send(`Office modified with ID: ${id}`);
  })
}

const deleteOffice = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM office WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Office deleted with ID: ${id}`)
  })
}

module.exports = {
  getOffices,
  getOfficeById,
  createOffice,
  updateOffice,
  deleteOffice
}
