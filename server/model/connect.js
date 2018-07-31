import pg from 'pg';
import config from '../config/config';

const db = (process.env.NODE_ENV === 'test') ? new pg.Pool(config.test) : new pg.Pool(config.database);

export default db;