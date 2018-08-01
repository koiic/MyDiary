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
 * @param {String} columnName  where, from client matches data from user
 * @param {String} value the value coming from the client
 */
export const findOne = (selectedColumn, tableName, columnName, value) => (`SELECT ${selectedColumn} FROM 
${tableName} WHERE
 ${columnName} = '${value}'`);


/**
 * @name CreateEntriesQuery
 * @description script to create a new entry
 */
export const createNewEntry = (title, note, imageUrl, isFavourite, userId) => (`INSERT INTO entries(
  "title", 
  "note", 
  "is_favourite",
  "image_url", 
  "user_id")
VALUES ('${title}', '${note}','${isFavourite}', '${imageUrl}',  '${userId}')
RETURNING *`);

export const getSingleEntry = (userId, entryId) => `
SELECT * FROM entries
WHERE 
entries.user_id = ${userId} and
entries.id = ${entryId}  
`;

export const fetchEntries = userId => (`SELECT * FROM entries WHERE entries.user_id  = '${userId}'`);


/**
 * @name UpdateEntry
 * @description script to update entry by Id
 */
export const modifyEntry = (userId, entryId, title, note, isFavourite, imageUrl) => (`UPDATE entries 
SET title = '${title}',
note = '${note}',
is_Favourite = '${isFavourite}',
image_url = '${imageUrl}'
 WHERE entries.user_id = ${userId}
 and entries.id = ${entryId} and
 created_at::date = CURRENT_DATE
 RETURNING *`);


/**
 * @name DeleteENtry
 * @description script to delete entry by Id
 */
export const deleteEntry = (tableName, columnName, value) => (`DELETE FROM '${tableName} 
where '${columnName} = '${value}`);

/**
 * @name CreateAuthQuery
 * @description script to create user authentication
 */
export const createAuth = (username, password, userId) => (`INSERT INTO auth("username", "password", "user_id")

  VALUES('${username}', '${password}', '${userId}')
  RETURNING *`);


  /**
 * @description for finding one or more items in a database
 * @param {String} selectedColumn the column you'll like to return
 * @param {String} tableName the name of the table you're selecting from
 * @param {String} columnName  where, from client matches data from user
 * @param {String} value the value coming from the client
 */
export const checkUser = request => (`SELECT email,username FROM users
 LEFT OUTER JOIN auth ON users.id = auth.user_id 
 WHERE email = '${request.email}' 
 or username = '${request.username}'`);

export const checkTitle = (title, userId) => (`SELECT title FROM entries  WHERE entries.user_id = '${userId}' and title = '${title}' `);

export const checkEntryDate = (userId, entryId) => (`SELECT id FROM entries WHERE entries.user_id = '${userId}' and id = '${entryId}' and created_at = CURRENT_DATE`);


export const updateEntriesTable = (entryId, userId, request) => {
  let updateQuery = 'UPDATE entries SET ';
  let changeUpdate = false;

  if (request.title) {
    updateQuery += ` ${(changeUpdate) ? ',' : ''} title = '${request.title}'`;
    changeUpdate = true;
  }
  if (request.note) {
    updateQuery += ` ${(changeUpdate) ? ',' : ''} note = '${request.note}'`;
    changeUpdate = true;
  }
  if (request.imageUrl) {
    updateQuery += ` ${(changeUpdate) ? ',' : ''} image_url= '${request.imageUrl}'`;
    changeUpdate = true;
  }
  if (request.isFavourite) {
    updateQuery += ` ${(changeUpdate) ? ',' : ''} is_favourite = '${request.isFavourite}'`;
    changeUpdate = true;
  }

  if (changeUpdate) {
    updateQuery += `WHERE entries.user_id = ${userId} and entries.id = ${entryId} 
    and created_at::date = CURRENT_DATE RETURNING *`;
  }
  return updateQuery;
};
