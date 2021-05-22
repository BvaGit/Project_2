CREATE TABLE persons (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    lname VARCHAR(255),
    age INTEGER,
    city VARCHAR(255),
    phoneNumber VARCHAR(255),
    email VARCHAR(255),
    companyName VARCHAR(255), 
    user_id INTEGER,
    deleted BOOLEAN
);


INSERT INTO persons (fname, lname, age, city, phoneNumber, email, companyName, user_id, deleted) VALUES ('Ivan', 'Ivanov', 25, 'Dnepr', '12345678', 'ivan@gmail.com', 'WoW', 1, FALSE);