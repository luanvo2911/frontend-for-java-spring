-- INSERT INTO users(id, username, email)
-- VALUES('4', '21e3123', 'scsacac')

-- INSERT INTO todos(id, user_id, todo, status)
-- VALUES('2', '1', 'go jogging', true)

-- SELECT * FROM users;

SELECT * FROM todos;

-- UPDATE todos
-- SET todo = 'do something else',status = 'true'
-- WHERE todos.id = '1'

-- SELECT * FROM users, todos 
-- WHERE users.id = todos.user_id and users.id = '1'
-- DELETE FROM users WHERE users.id = '4'


-- SELECT todos.id as todoID, username, email, todo, status 
-- FROM users, todos
-- WHERE users.id = todos.user_id