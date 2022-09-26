// connect nodejs server to db
import { Sequelize } from 'sequelize';

const db = new Sequelize('sqlite::memory:');

// database connection
db.authenticate().then(() => {
    console.log('Database connected...');
}).catch((err) => {
    console.log(err);
});
// update database with changes related to database structure
db.sync().then(() => {}).catch((err) => console.log(`Error:${err}`));

export default db;
