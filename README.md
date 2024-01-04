# OverviewSDC

Products
Overview
This is the backend for an e-commerce app. This component is responsible for supplying the front-end with information about the products currently stored in the database.

Usage
1. Clone the repo
git clone https://github.com/TypeRave/Products.git
2. CD into the file directory
cd TypeRave/Products
3. Run npm install to install all necessary dependencies
npm install
4 Create a copy of the example.env file and rename it .env
This is where you will be adding in the information about your postgres database

5. Start up the postgres database
On linux, this would be done through

sudo service postgresql start
6. Navigate the postgres client and then import the database schema
On Linux (if you have a port different from the default, then use -p port number )

sudo -u postgres psql
In the postgres shell, use \i filePathToFile

7. Run npm start to start the application
npm start
Routes
/products
returns a list of 5 products unless otherwise specified through the page and count parameters product-list

/products/:product_id
returns information about a particular product product-info

/products/:product_id/styles
returns stlye information about a particular product and how many items of each style/size are available. product-styles-part1 product-styles-part2

/products/:product_id/related
returns a list of product ids that are related to the currently selected product. related-products
