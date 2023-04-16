const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const queryCompany = require('./query/company');
const queryOffice = require('./query/office');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const prefix = '/api';
const url = {
    company: '/company',
    companyId: '/company/:id',
    office: '/office',
    officeId: '/office/:id',
}

/* COMPANY */
app.get(prefix + url.company, queryCompany.getCompanies);
app.get(prefix + url.companyId, queryCompany.getCompanyById);
app.post(prefix + url.company, queryCompany.createCompany);
app.put(prefix + url.companyId, queryCompany.updateCompany);
app.delete(prefix + url.companyId, queryCompany.deleteCompany);

/* OFFICE */
app.get(prefix + url.office + url.companyId, queryOffice.getOffices);
app.get(prefix + url.officeId, queryOffice.getOfficeById);
app.post(prefix + url.office, queryOffice.createOffice);
app.put(prefix + url.officeId, queryOffice.updateOffice);
app.delete(prefix + url.officeId, queryOffice.deleteOffice);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

// CREATE TABLE company (id serial PRIMARY KEY, name varchar(255) NOT NULL, address varchar(255) NOT NULL, revenue integer NOT NULL, phone_code integer NOT NULL, phone_number integer NOT NULL);
// CREATE TABLE office (id serial PRIMARY KEY, name varchar(255) NOT NULL, location_latitude varchar(255) NOT NULL, location_longitude varchar(255) NOT NULL, office_start_date varchar(255) NOT NULL, company_id integer NOT NULL, FOREIGN KEY (company_id) REFERENCES company (id));

// INSERT INTO company (name, address, revenue, phone_code, phone_number) VALUES ('Gojek', 'Jakarta Selatan', 100000000000, 62, 82112345);
// INSERT INTO office (name, location_latitude, location_longitude, office_start_date, company_id) VALUES ('Pasaraya Blok M', '1232412', '-4233211', '04/18/2022', 1);