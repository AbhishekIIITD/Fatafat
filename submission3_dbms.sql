show databases;
CREATE database FATAFAT;
USE FATAFAT;
Show tables;
CREATE TABLE Customers (
    Customer_id INT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) ,
    Email VARCHAR(50) UNIQUE,
    Password Varchar(50) UNIQUE
);

CREATE TABLE cart (
    cartID INT AUTO_INCREMENT PRIMARY KEY,
    productID INT,
    customerID INT,
    quantity INT,
    FOREIGN KEY (productID) REFERENCES products(productID),
    FOREIGN KEY (customerID) REFERENCES customers(Customer_id)
);
select * from cart;

CREATE TABLE Cust_PHONE_NO(
	Customer_id INT,
    Phone_no char(10),
    FOREIGN KEY (Customer_id) REFERENCES Customers(Customer_id)
);

CREATE TABLE Store(
	Store_Id INT PRIMARY KEY,
    Name TEXT,
    State VARCHAR(50),
    CITY VARCHAR(100),
    PINCODE INT NOT NULL
);

CREATE TABLE Store_PHONE_NO(
	Store_Id INT,
    Phone_no char(10),
    FOREIGN KEY (Store_Id) REFERENCES Store(Store_Id)
);

-- ALTER TABLE Products
-- ADD COLUMN store_id INT,
-- ADD CONSTRAINT fk_store_id FOREIGN KEY (store_id) REFERENCES Store(Store_Id);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    Store_id INT,
    ProductName VARCHAR(100) NOT NULL,
    Category ENUM('Groceries', 'Clothes', 'Electronics') NOT NULL,
    Product_Image varchar(100),
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Brand VARCHAR(100),
    StockQuantity INT DEFAULT 0,
    CONSTRAINT CHK_Price CHECK (Price >= 0),
    FOREIGN KEY (Store_Id) REFERENCES Store(Store_Id)
    -- Add more attributes as needed
);

CREATE TABLE Groceries(
	Category_ID INT PRIMARY KEY,
	ProductID INT,
    ExpirationDate DATE, 
    Nutritional_value json,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)

);

CREATE TABLE Cloths(
	Category_ID INT PRIMARY KEY,
	ProductID INT,
    Size varchar(4), 
    Material varchar(50),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)

);

CREATE TABLE Electronics(
	Category_ID INT PRIMARY KEY,
	ProductID INT,
    Manufacturer_date DATE, 
    warrenty INT,
    Description TEXT,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);


CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    Customer_id INT,
    StoreID INT,
    ProductID INT,
    OrderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Order_status ENUM('Pending', 'In Transit', 'Delivered'),
	FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    FOREIGN KEY (Customer_id) REFERENCES Customers(Customer_id),
    FOREIGN KEY (StoreID) REFERENCES Store(store_id)
    
);


CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY,
    OrderID INT,
    PaymentMethod VARCHAR(50) NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATE,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE
);

CREATE TABLE Discounts (
    DiscountID INT PRIMARY KEY,
    DiscountCode VARCHAR(20) UNIQUE NOT NULL,
    DiscountValue DECIMAL(10, 2) NOT NULL,
    MinimumOrderAmount DECIMAL(10, 2),
    StartDate DATE,
    EndDate DATE,
    IsActive BOOLEAN NOT NULL DEFAULT TRUE
);


CREATE TABLE Deliveries (
    DeliveryID INT PRIMARY KEY,
    OrderID INT UNIQUE,
    Agent_Name VARCHAR(50) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
   
);


CREATE TABLE DELIVERY_PHONE_NO(
	Delivery_Id INT,
    Phone_no char(10),
    FOREIGN KEY (Delivery_Id) REFERENCES Deliveries(DeliveryID)
);

-- adding into customers
INSERT INTO Customers (Customer_id, First_Name, Last_Name, Email, Password)
VALUES
(1, 'John', 'Doe', 'john.doe@example.com', 'password1'),
(2, 'Jane', 'Smith', 'jane.smith@example.com', 'password2'),
(3, 'Michael', 'Johnson', 'michael.johnson@example.com', 'password3'),
(4, 'Emily', 'Williams', 'emily.williams@example.com', 'password4'),
(5, 'David', 'Brown', 'david.brown@example.com', 'password5'),
(6, 'Sarah', 'Jones', 'sarah.jones@example.com', 'password6'),
(7, 'Christopher', 'Davis', 'christopher.davis@example.com', 'password7'),
(8, 'Jessica', 'Miller', 'jessica.miller@example.com', 'password8'),
(9, 'Daniel', 'Taylor', 'daniel.taylor@example.com', 'password9'),
(10, 'Jennifer', 'Wilson', 'jennifer.wilson@example.com', 'password10');

INSERT INTO Cust_PHONE_NO (Customer_id,Phone_no) VALUES
(1, '1234567890'), 
(1, '9876543210'), 
(2, '5555555555'),
(3, '9998887777'),
(3, '1112223333'), 
(4, '4444444444'), 
(4, '8888888888'), 
(5, '7777777777'),
(5, '6666666666'),
(6, '2222222222'), 
(7, '3333333333'); 


-- adding into stores

INSERT INTO Store (Store_Id, Name, State, CITY, PINCODE)
VALUES
(1, 'SuperMart', 'California', 'Los Angeles', 90001),
(2, 'Grocery Kingdom', 'New York', 'New York City', 10001),
(3, 'Fresh Market', 'Texas', 'Houston', 77001),
(4, 'Mega Foods', 'Florida', 'Miami', 33001),
(5, 'Healthy Harvest', 'Illinois', 'Chicago', 60601),
(6, 'Quick Shop', 'Washington', 'Seattle', 98001),
(7, 'Farmers Market', 'Georgia', 'Atlanta', 30301),
(8, 'Fresh Grocers', 'Ohio', 'Columbus', 43001),
(9, 'City Market', 'Colorado', 'Denver', 80201),
(10, 'Big Mart', 'Michigan', 'Detroit', 48201),
(11, 'Family Foods', 'North Carolina', 'Charlotte', 28201),
(12, 'Green Valley', 'Arizona', 'Phoenix', 85001),
(13, 'Urban Groove', 'Massachusetts', 'Boston', 02101),
(14, 'Wholesome Fare', 'Pennsylvania', 'Philadelphia', 19101),
(15, 'Corner Store', 'Tennessee', 'Nashville', 37201),
(16, 'Sunshine Supermarket', 'Florida', 'Orlando', 32801),
(17, 'Market Fresh', 'California', 'San Francisco', 94101),
(18, 'Friendly Foods', 'Texas', 'Dallas', 75201);



INSERT INTO Store_PHONE_NO (Store_Id, Phone_no)
VALUES
(1, '1234567890'), 
(1, '9876543210'), 
(2, '5555555555'),
(3, '9998887777'), 
(3, '1112223333'),
(4, '4444444444'),
(4, '8888888888'),
(5, '7777777777'),
(5, '6666666666'),
(6, '2222222222'),
(7, '3333333333'); 


-- adding into products

INSERT INTO Products (ProductID, Store_id, ProductName, Category, Product_Image, Description, Price, Brand, StockQuantity)
VALUES
(1, 1, 'Apples', 'Groceries', 'apple.jpg', 'Fresh and juicy apples', 2.50, 'Apple Inc.', 100),
(2, 1, 'Bananas', 'Groceries', 'banana.jpg', 'Ripe and healthy bananas', 1.99, 'Banana Co.', 150),
(3, 1, 'T-shirt', 'Clothes', 'tshirt.jpg', 'Comfortable cotton t-shirt', 15.99, 'XYZ Clothing', 50),
(4, 1, 'Jeans', 'Clothes', 'jeans.jpg', 'Classic denim jeans', 29.99, 'Denim Co.', 30),
(5, 1, 'Laptop', 'Electronics', 'laptop.jpg', 'Powerful laptop for productivity', 999.99, 'ABC Electronics', 10),
(6, 2, 'Milk', 'Groceries', 'milk.jpg', 'Fresh and nutritious milk', 3.49, 'Dairy Farms', 75),
(7, 2, 'Eggs', 'Groceries', 'eggs.jpg', 'Farm-fresh eggs', 2.99, 'Eggcellent Farms', 100),
(8, 2, 'Dress', 'Clothes', 'dress.jpg', 'Elegant evening dress', 49.99, 'Fashion Boutique', 20),
(9, 2, 'Sneakers', 'Clothes', 'sneakers.jpg', 'Stylish sports sneakers', 39.99, 'Athletic Gear', 40),
(10, 2, 'Smartphone', 'Electronics', 'phone.jpg', 'Feature-packed smartphone', 799.99, 'Tech Solutions', 15);

INSERT INTO Groceries (Category_ID, ProductID, ExpirationDate, Nutritional_value)
VALUES
(1, 1, '2024-02-28', '{"calories": 52, "fat": 0.3, "carbs": 14, "protein": 0.3}'),
(2, 2, '2024-03-05', '{"calories": 89, "fat": 0.4, "carbs": 23, "protein": 1.1}'),
(3, 6, '2024-02-10', '{"calories": 146, "fat": 8, "carbs": 13, "protein": 8}'),
(4, 7, '2024-02-15', '{"calories": 72, "fat": 4.8, "carbs": 0.4, "protein": 6.3}');


INSERT INTO Cloths (Category_ID, ProductID, Size, Material)
VALUES
(3, 3, 'M', 'Cotton'),
(4, 4, 'M', 'Denim'),
(8, 8, 'S', 'Silk'),
(9, 9, 'M', 'Leather');


INSERT INTO Electronics (Category_ID, ProductID, Manufacturer_date, Warrenty, Description)
VALUES
(5, 5, '2024-01-15', 1, '1-year warranty included'),
(10, 10, '2024-01-20', 2, '2-year warranty included');


-- adding into orders
INSERT INTO Orders (OrderID, Customer_id, StoreID, ProductID, OrderDate, Order_status)
VALUES
(1, 1, 1, 1, '2024-01-15 08:30:00', 'Pending'),
(2, 2, 2, 3, '2024-01-16 09:45:00', 'In Transit'),
(3, 3, 3, 5, '2024-01-17 11:20:00', 'Delivered'),
(4, 4, 4, 7, '2024-01-18 13:15:00', 'Pending'),
(5, 5, 5, 9, '2024-01-19 14:50:00', 'Pending'),
(6, 6, 6, 2, '2024-01-20 16:25:00', 'Pending'),
(7, 7, 7, 4, '2024-01-21 17:40:00', 'In Transit'),
(8, 8, 8, 6, '2024-01-22 18:55:00', 'Delivered'),
(9, 9, 9, 8, '2024-01-23 20:10:00', 'Pending'),
(10, 10, 10, 10, '2024-01-24 21:25:00', 'Pending');


INSERT INTO Payments (PaymentID, OrderID, PaymentMethod, Amount, PaymentDate)
VALUES
(1, 1, 'Credit Card', 30.00, '2024-01-15'),
(2, 2, 'PayPal', 25.99, '2024-01-16'),
(3, 3, 'Cash on Delivery', 999.99, '2024-01-17'),
(4, 4, 'Credit Card', 20.50, '2024-01-18'),
(5, 5, 'Debit Card', 45.99, '2024-01-19'),
(6, 6, 'Credit Card', 40.00, '2024-01-20'),
(7, 7, 'PayPal', 35.99, '2024-01-21'),
(8, 8, 'Cash on Delivery', 899.99, '2024-01-22'),
(9, 9, 'Credit Card', 30.50, '2024-01-23'),
(10, 10, 'Debit Card', 55.99, '2024-01-24');

-- adding to discounts
INSERT INTO Discounts (DiscountID, DiscountCode, DiscountValue, MinimumOrderAmount, StartDate, EndDate, IsActive)
VALUES
(1, 'NEW20', 20.00, 50.00, '2024-01-01', '2024-01-31', TRUE),
(2, 'SALE50', 50.00, 100.00, '2024-02-01', '2024-02-28', TRUE),
(3, 'FREESHIP', 0.00, 75.00, '2024-01-15', '2024-03-15', TRUE),
(4, 'WELCOME10', 10.00, NULL, '2024-01-01', '2024-12-31', TRUE),
(5, 'HOLIDAY25', 25.00, 150.00, '2024-11-01', '2024-12-31', TRUE),
(6, 'SUMMER15', 15.00, 80.00, '2024-06-01', '2024-08-31', FALSE);


INSERT INTO Deliveries (DeliveryID, OrderID, Agent_Name)
VALUES
(1, 1, 'John Doe'),
(2, 2, 'Jane Smith'),
(3, 3, 'Michael Johnson'),
(4, 4, 'Emily Brown'),
(5, 5, 'David Wilson'),
(6, 6, 'Jessica Lee'),
(7, 7, 'Andrew Taylor'),
(8, 8, 'Olivia Martinez'),
(9, 9, 'Daniel Anderson'),
(10, 10, 'Sophia Garcia');


INSERT INTO DELIVERY_PHONE_NO (Delivery_Id, Phone_no)
VALUES
(1, '1234567890'),
(2, '9876543210'),
(3, '5555555555'),
(4, '1111111111'),
(5, '2222222222'),
(6, '3333333333'),
(7, '4444444444'),
(8, '5555555555'),
(9, '6666666666'),
(10, '7777777777');


select * from customers;
select * from cust_phone_no;
select * from cloths;
select * from deliveries;
select * from delivery_phone_no;
select * from discounts;
select * from electronics;
select * from groceries;
select * from orders;
select * from payments;
select * from products;
select * from store;
select * from store_phone_no;




