#!/usr/bin/env python3
import mysql.connector
import os
import sys

# Get database credentials
host = os.environ.get('MYSQL_HOST')
user = os.environ.get('MYSQL_USER') 
password = os.environ.get('MYSQL_PASSWORD')
database = os.environ.get('MYSQL_DATABASE')

if not all([host, user, password, database]):
    print('Error: Missing database credentials')
    sys.exit(1)

try:
    # Connect to database
    conn = mysql.connector.connect(
        host=host,
        port=3306,
        user=user,
        password=password,
        database=database
    )
    
    cursor = conn.cursor()
    
    # Read and execute migration file
    with open('sqlfiles/migration.sql', 'r') as f:
        sql = f.read()
    
    # Split by semicolon and execute each statement
    for statement in sql.split(';'):
        statement = statement.strip()
        if statement and not statement.upper().startswith('USE'):
            cursor.execute(statement)
    
    conn.commit()
    cursor.close()
    conn.close()
    
    print('Migration completed successfully')
    
except Exception as e:
    print(f'Migration failed: {e}')
    sys.exit(1)
