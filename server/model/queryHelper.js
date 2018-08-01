/**
 * @name CreateUserQuery
 * @description script to create a new user
 */

export const createNewUser = (email, firstname, lastname) =>
  (`INSERT INTO users("email", "firstname", "lastname")
VALUES('${email}', '${firstname}', '${lastname}')
  RETURNING *`);


/**
 * @description for finding one or more items in a database
 * @param {String} selectedColumn the column you'll like to return
 * @param {String} tableName the name of the table you're selecting from
 * @param {String} columnName  where, from client matches data from user
 * @param {String} value the value coming from the client
 */
export const findOne = (selectedColumn, tableName, columnName, value) =>
  (`SELECT ${selectedColumn} FROM 
${tableName} WHERE
 ${columnName} = '${value}'`);


/**
 * @name CreateEntriesQuery
 * @description script to create a new entry
 */
export const createNewEntry = (title, note, imageUrl,isFavourite, userId) =>  (`INSERT INTO entries(
  "title", 
  "note", 
  "is_favourite",
  "image_url", 
  "user_id")
VALUES ('${title}', '${note}','${isFavourite}', '${imageUrl}',  '${userId}')
RETURNING *`);


/**
 * @name UpdateEntry
 * @description script to update entry by Id
 */
export const updateEntry = (selectedColumn, tableName, columnName, value, id) => (`UPDATE '${tableName}' 
SET '${selectedColumn}' =
'${value} where 
'${columnName} =
'${id}`);


/**
 * @name DeleteENtry
 * @description script to delete entry by Id
 */
export const deleteEntry = (tableName, columnName, value) =>
  (`DELETE FROM '${tableName} 
where '${columnName} = '${value}`);

/**
 * @name CreateAuthQuery
 * @description script to create user authentication
 */
export const createAuth = (username, password, userId) =>
  (`INSERT INTO auth("username", "password", "user_id")

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


//  export const insert = (email, firstname, lastname, username, password) => (`WITH newusers as (INSERT INTO users (firstname, lastname, email)
//  VALUES('${email}', '${firstname}', '${lastname}')
//     returning id) INSERT INTO auth (username, password, userId) values
//   ( VALUES('${username}', '${password}',(select id from newusers)`);
