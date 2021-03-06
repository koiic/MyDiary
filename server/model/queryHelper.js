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
export const findUser = (selectedColumn, tableName, columnName, value) => (`SELECT ${selectedColumn} FROM 
${tableName} WHERE
 ${columnName} = '${value}'`);

 export const findUserById = userId => (`SELECT * FROM 
users WHERE id = '${userId}'`);

/**
 * @name CreateEntriesQuery
 * @description script to create a new entry
 */
export const createNewEntry = (title, note, imageUrl, userId) => (`INSERT INTO entries(
  "title", 
  "note", 
  "image_url", 
  "user_id")
VALUES ('${title}', '${note}', '${imageUrl}',  '${userId}')
RETURNING *`);

export const getSingleEntry = (userId, entryId) => `
SELECT * FROM entries 
WHERE entries.user_id  = ${userId} 
and entries.id = ${entryId} ;`;

export const fetchEntries = userId => (`
SELECT * FROM 
entries 
WHERE 
entries.user_id  = '${userId}' 
AND
is_archived = 'no'
ORDER BY id DESC
`);


/**
 * @name UpdateEntry
 * @description script to update entry by Id
 */
export const modifyEntry = (userId, entryId, title, note, imageUrl) => (`UPDATE entries 
SET title = '${title}',
note = '${note}',
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
export const createAuth = (username, password, userId) => (`
INSERT INTO 
auth("username", "password", "user_id")
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
 
  if (changeUpdate) {
    updateQuery += `WHERE entries.user_id = ${userId} and entries.id = ${entryId} 
    and created_at::date = CURRENT_DATE RETURNING *`;
  }
  return updateQuery;
};

export const deleteSingleEntry = (entryId,userId) => `
DELETE FROM entries 
USING users 
WHERE 
entries.user_id = ${userId} 
and entries.id = ${entryId}
RETURNING *
`;

export const fetchEntriesCount = (userId) => (`
SELECT COUNT(id) FROM entries 
WHERE 
entries.user_id = ${userId}

`);

export const todaysEntriesCount = (userId) => (`
SELECT COUNT(id) FROM entries 
WHERE 
entries.user_id = ${userId}
AND
created_at::date = CURRENT_DATE 

`);

export const archiveSingleEntries = (entryId, userId) =>(`
UPDATE entries 
SET is_archived = 'yes'
WHERE  entries.user_id = ${userId} 
and entries.id = ${entryId} RETURNING *
`)

export const archiveEntryCount = (userId) => (`
SELECT COUNT(id) FROM entries 
WHERE 
entries.user_id = ${userId}
AND
is_archived ='yes'

`);

export const fetchSubscribedUser = () => (`
SELECT * FROM users
WHERE 
subcribe_reminder = 'yes';
`);


// 'UPDATE entries SET is_archived == true WHERE  entries.user_id = ${userId} 
// and entries.id = ${entryId}'
