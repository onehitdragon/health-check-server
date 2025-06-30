CREATE TABLE IF NOT EXISTS employee(
    mst VARCHAR(255) PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    gender INT NOT NULL CHECK (gender IN (1, 0)),
    birthday DATE NOT NULL,
    cccd VARCHAR(255) NOT NULL UNIQUE,
    cccdDate DATE NOT NULL,
    cccdAt TEXT NOT NULL,
    phone VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    work VARCHAR(255) NOT NULL,
    workPlace TEXT NOT NULL,
    created_at DATE DEFAULT (datetime('now')),
    update_at DATE DEFAULT (datetime('now'))
);