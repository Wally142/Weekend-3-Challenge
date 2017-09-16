CREATE TABLE list (
id SERIAL PRIMARY KEY,
task VARCHAR (200),
complete BOOLEAN
);

--INSERT INTO list (task, complete) VALUES ('Wash the dishes', true);