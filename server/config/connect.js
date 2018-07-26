import pg from 'pg';
import config from './config';

const db = new pg.Pool(config.database);
export default db;
