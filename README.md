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
cd TypeRave/Products
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
```
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": 140
    },
    {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": 69
    },
    {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": 40
    },
    {
        "id": 4,
        "name": "Slacker's Slacks",
        "slogan": "Comfortable for everything, or nothing",
        "description": "I'll tell you how great they are after I nap for a bit.",
        "category": "Pants",
        "default_price": 65
    },
    {
        "id": 5,
        "name": "Heir Force Ones",
        "slogan": "A sneaker dynasty",
        "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
        "category": "Kicks",
        "default_price": 99
    }
]
```

### /product/features
returns information about a particular product product-info

### /product/styles
returns stlye information about a particular product and how many items of each style/size are available. product-styles-part1 product-styles-part2

### /product/related
returns a list of product ids that are related to the currently selected product. related-products
