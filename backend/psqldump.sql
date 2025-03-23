-- PostgreSQL dump for database "v4"
BEGIN;


CREATE TABLE master (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);


INSERT INTO master (id, name) VALUES
(1, 'Иванова Д.Д.');

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

INSERT INTO role (id, code, name) VALUES
(1, 'user', 'Зарегистрированный пользователь'),
(2, 'admin', 'Администратор');


CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);

INSERT INTO status (id, code, name) VALUES
(1, 'new', 'Новое'),
(3, 'canceled', 'Отменено'),
(4, 'confirmed', 'Подтверждено');

CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    id_role INTEGER NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user_role FOREIGN KEY (id_role) REFERENCES role(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO "user" (id, id_role, login, password, full_name, phone) VALUES
(3, 1, 'user', 'user', 'Иванов Иван Иванович', '91111111111');


CREATE TABLE request (
    id SERIAL PRIMARY KEY,
    id_user INTEGER NOT NULL,
    id_master INTEGER NOT NULL,
    id_status INTEGER NOT NULL,
    booking_datetime TIMESTAMP,
    CONSTRAINT fk_request_user FOREIGN KEY (id_user) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_request_master FOREIGN KEY (id_master) REFERENCES master(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_request_status FOREIGN KEY (id_status) REFERENCES status(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO request (id, id_user, id_master, id_status, booking_datetime) VALUES
(3, 3, 1, 1, '2023-08-21 10:00:00');

COMMIT;

SELECT setval(pg_get_serial_sequence('master', 'id'), (SELECT MAX(id) FROM master));
SELECT setval(pg_get_serial_sequence('role', 'id'), (SELECT MAX(id) FROM role));
SELECT setval(pg_get_serial_sequence('status', 'id'), (SELECT MAX(id) FROM status));
SELECT setval(pg_get_serial_sequence('"user"', 'id'), (SELECT MAX(id) FROM "user"));
SELECT setval(pg_get_serial_sequence('request', 'id'), (SELECT MAX(id) FROM request));
