# OverviewSDC

## Products Overview
This is the backend API for an e-commerce application. This component is responsible for supplying the front-end with information about the products currently stored in the database.

## Usage
### 1. Clone the repo
```bash
git clone https://github.com/TypeRave/Products.git
```
### 2. CD into the file directory
```bash
cd filename/OverviewSDC
```
### 3. Run npm install to install all necessary dependencies
```bash
npm install
```
### 4. Create a copy of the example.env file and rename it .env
This is where you will be adding in the information about your postgres database

### 5. Start up the postgres database
On linux, this would be done through
```bash
sudo service postgresql start
```
### 6. Navigate the postgres client and then import the database schema
On Linux (if you have a port different from the default, then use -p port number )
```bash
sudo -u postgres psql
```
In the postgres shell, use \i filePathToFile

### 7. Run npm start to start the application
```bash
npm start
```
## Routes
### /product
returns a list of 5 products unless otherwise specified through the page and count parameters product-list

![product](https://github.com/TypeRave/OverviewSDC/blob/main/Assets/Product.png)

### /product/:product_id
returns information about a particular product

![product_id](https://github.com/TypeRave/OverviewSDC/blob/main/Assets/Product%20ID.png)

### /product/styles
returns stlye information about a particular product and how many items of each style/size are available. product-styles-part1 product-styles-part2

![styles](https://github.com/TypeRave/OverviewSDC/blob/main/Assets/Skus.png)
![styles2](https://github.com/TypeRave/OverviewSDC/blob/main/Assets/Skus2.png)

### /product/related
returns a list of product ids that are related to the currently selected product. related-products

![related](https://github.com/TypeRave/OverviewSDC/blob/main/Assets/Related.png)


