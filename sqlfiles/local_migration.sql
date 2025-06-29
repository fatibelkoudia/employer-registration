-- Local development database setup
-- Run this on local MySQL server

CREATE DATABASE IF NOT EXISTS ynov_ci_local;
USE ynov_ci_local;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    birth_date DATE NOT NULL,
    city VARCHAR(100),
    postal_code VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample data for testing
INSERT INTO users (first_name, last_name, email, birth_date, city, postal_code) VALUES
('John', 'Doe', 'john.doe@example.com', '1990-01-15', 'Paris', '75001'),
('Jane', 'Smith', 'jane.smith@example.com', '1988-05-22', 'Lyon', '69001')
ON DUPLICATE KEY UPDATE id=id; -- Avoid duplicates if running multiple times
