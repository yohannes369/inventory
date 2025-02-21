# inventory
CREATE TABLE users (
    emp_id INT PRIMARY KEY,              -- Employee ID as the primary key
    account_type VARCHAR(50) NOT NULL,  -- Account type (e.g., admin, employee)
    password VARCHAR(255) NOT NULL,     -- Password (hashed for security)
    fname VARCHAR(100) NOT NULL,        -- First name
    lname VARCHAR(100) NOT NULL,        -- Last name
    email VARCHAR(100) NOT NULL,        -- Email address
    phone_no VARCHAR(15) NOT NULL,      -- Phone number
    block_no VARCHAR(50) NOT NULL,      -- Block number (e.g., building or section)
    office_no VARCHAR(50) NOT NULL,     -- Office number
    reg_date DATE NOT NULL,             -- Registration date
    status INT DEFAULT 2 NOT NULL       -- Status (default value is 2)
);
hh