
-- CREATE SCHEMA sdc

-- CREATE TABLE IF NOT EXISTS product (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(30) NOT NULL,
--   slogan VARCHAR(200),
--   description VARCHAR(1000),
--   category VARCHAR(20) NOT NULL,
--   default_price INTEGER
-- )

-- CREATE TABLE IF NOT EXISTS styles (
--   id SERIAL PRIMARY KEY,
--   productId INTEGER REFERENCES product(id) NOT NULL,
--   name VARCHAR(30) NOT NULL,
--   sale_price DECIMAL NULL,
--   original_price DECIMAL NOT NULL,
--   default_style INTEGER
-- )

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL PRIMARY KEY,
  styleId INTEGER REFERENCES styles(id) NOT NULL,
  size VARCHAR(10) NOT NULL,
  quantity SMALLINT NOT NULL
)

-- CREATE TABLE IF NOT EXISTS related (
--   id SERIAL PRIMARY KEY,
--   current_product_id INTEGER REFERENCES product(id) NOT NULL,
--   related_product_id INTEGER REFERENCES product(id) NULL
-- )

-- CREATE TABLE IF NOT EXISTS photos (
--   id SERIAL PRIMARY KEY,
--   styleId INTEGER REFERENCES styles(id) NOT NULL,
--   url VARCHAR(2100) NULL,
--   thumbnail_url VARCHAR(2100) NULL
-- )

-- CREATE TABLE IF NOT EXISTS features (
--   id SERIAL PRIMARY KEY,
--   productId INTEGER REFERENCES product(id) NOT NULL,
--   feature VARCHAR(30) NULL,
--   value VARCHAR(30) NULL
-- )

/*

    psql productdb < server/schema.sql
*/


