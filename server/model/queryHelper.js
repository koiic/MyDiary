/**
 * @name CreateUserQuery
 * @description script to create a new user
 */

export const createNewUser = (email, firstname, lastname) => (`INSERT INTO users("email", "firstname", "lastname")
VALUES('${email}', '${firstname}', '${lastname}')
  RETURNING *`);


/**
 * @description for finding one or more items in a database
 * @param {String} selectedColumn the column you'll like to return
 * @param {String} tableName the name of the table you're selecting from
 * @param {String} columnName  where from client matches data from user
 * @param {String} value the value coming from the client
 */
export const find = (selectedColumn, tableName, columnName, value) => (`SELECT ${selectedColumn} FROM ${tableName} WHERE ${columnName} = '${value}'`);

/**
 * @name CreateEntriesQuery
 * @description script to create a new entry
 */
export const createNewEntry =  `
INSERT INTO entries("title", "note", "is_favourite",created_at,updated_at, userId)
VALUE($1, $2, $3, $4, $5, $6)
RETURNING *`;

/**
 * @name DeleteENtry
 * @description script to update entry by Id
 */
export const updateEntry = (selectedColumn, tableName, columnName, value, id) => (`UPDATE '${tableName}' SET '${selectedColumn}' = '${value} where '${columnName} = '${id}`);


/**
 * @name DeleteENtry
 * @description script to delete entry by Id
 */
export const deleteEntry = (tableName, columnName, value) => (`DELETE FROM '${tableName} where '${columnName} = '${value}`);

/**
 * @name CreateAuthQuery
 * @description script to create user authentication
 */
export const createAuth = (username, password, userId) => (`INSERT INTO auth("username", "password", "userid")
  VALUES('${username}', '${password}', '${userId}')
  RETURNING *`);
