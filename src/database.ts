import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Gomezbga09',
  database: 'sensores',
  port: 3306,
});

interface SensorData {
  humidity: number;
  temperature: number;
  motor_speed: number;
}

async function saveSensorData(data: SensorData) {
  const { humidity, temperature, motor_speed } = data;
  const query = 'INSERT INTO sensores (humidity, temperature, motor_speed) VALUES (?, ?, ?)';
  const values = [humidity, temperature, motor_speed];
  await pool.query(query, values);
}

async function getSensorData() {
  const query = 'SELECT * FROM sensores ORDER BY timestamp DESC LIMIT 100';
  const [rows] = await pool.query(query);
  return rows;
}

export { saveSensorData, getSensorData };
