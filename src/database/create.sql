CREATE TABLE IF NOT EXISTS employee(
    mst VARCHAR(255) PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    gender INT NOT NULL CHECK (gender IN (1, 0)),
    birthday TEXT NOT NULL,
    cccd VARCHAR(255) NOT NULL UNIQUE,
    cccdDate TEXT NOT NULL,
    cccdAt TEXT NOT NULL,
    phone VARCHAR(255) NOT NULL UNIQUE,
    address TEXT NOT NULL,
    work VARCHAR(255) NOT NULL,
    workPlace TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now')),
    update_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS print_history(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    print_at TEXT DEFAULT (datetime('now')),
    employee_mst VARCHAR(255),
    FOREIGN KEY (employee_mst) REFERENCES employee(mst)
        ON DELETE CASCADE
);
