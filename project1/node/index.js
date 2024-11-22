import pg from 'pg';
import express from 'express';

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  host: 'db',
  database: 'postgres',
  password: '1234',
  port: 5432,
});
client.connect();

const createTable = async () => {
  await client.query(`CREATE TABLE IF NOT EXISTS users
  (id serial PRIMARY KEY, 
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  CONSTRAINT unique_name_combination UNIQUE (first_name, last_name));`);
};
createTable();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => res.send('Hello'));

app.get('/api/all', async (req, res) => {
  try {
    const response = await client.query('SELECT * FROM users');
    if (response) {
      res.status(200).send(response.rows);
    }
  } catch (error) {
    res.status(500).send('Error');
    console.log(error);
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await client.query('DELETE FROM users WHERE id = $1', [userId]);
    if (result.rowCount === 1) {
      res.status(200).send('User deleted successfully');
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/form', async (req, res) => {
  try {
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;

    const existingUser = await client.query('SELECT * FROM users WHERE first_name = $1 AND last_name = $2', [first_name, last_name]);
    if (existingUser.rows.length > 0) {
      return res.status(400).send('This name is exists :(.');
    }

    const response = await client.query('INSERT INTO users (first_name, last_name) VALUES ($1, $2)', [first_name, last_name]);
    if (response) {
      res.status(200).send(req.body);
    }
  } catch (error) {
    res.status(500).send('BIg Error');
    console.log(error);
  }
});

app.listen(3000, () => console.log('app running' ));
