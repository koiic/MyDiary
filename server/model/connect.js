import pg from 'pg';
import config from '../config/config';

const nodeEnv = process.env.NODE_ENV;

let db = null;

switch (nodeEnv) {
    case 'production':
        db = config.production;
        break;
    case 'test':
        db = config.test;
        break;
    default:
        db = config.database;
}

export default new pg.Pool(db);
