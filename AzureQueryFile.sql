CREATE TABLE Customers (
    Customer_id INT PRIMARY KEY,
    First_Name VARCHAR(50) NOT NULL,
    Last_Name VARCHAR(50) ,
    Email VARCHAR(50) UNIQUE,
    Password Varchar(50) UNIQUE
);
CREATE TABLE Store(
	Store_Id INT PRIMARY KEY,
    Name TEXT,
    State VARCHAR(50),
    CITY VARCHAR(100),
    PINCODE INT NOT NULL
);
CREATE TABLE Cust_PHONE_NO(
	Customer_id INT,
    Phone_no char(10),
    FOREIGN KEY (Customer_id) REFERENCES Customers(Customer_id)
);

CREATE TABLE Discounts (
    DiscountID INT PRIMARY KEY,
    DiscountCode VARCHAR(20) UNIQUE NOT NULL,
    DiscountValue DECIMAL(10, 2) NOT NULL,
    MinimumOrderAmount DECIMAL(10, 2),
    StartDate DATE,
    EndDate DATE,
    IsActive BIT NOT NULL DEFAULT 1
);
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    Store_id INT,
    ProductName VARCHAR(100) NOT NULL,
    Category VARCHAR(50) NOT NULL,
    Product_Image VARCHAR(100),
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Brand VARCHAR(100),
    StockQuantity INT DEFAULT 0,
    CONSTRAINT CHK_Price CHECK (Price >= 0),
    CONSTRAINT CHK_Category CHECK (Category IN ('Groceries', 'Clothes', 'Electronics')),
    FOREIGN KEY (Store_id) REFERENCES Store(Store_id)
    -- Add more attributes as needed
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
CREATE TABLE cart (
    cartID INT IDENTITY(1,1) PRIMARY KEY,
    productID INT,
    customerID INT,
    quantity INT,
    FOREIGN KEY (productID) REFERENCES products(productID),
    FOREIGN KEY (customerID) REFERENCES customers(Customer_id)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    Customer_id INT,
    StoreID INT,
    ProductID INT,
    OrderDate DATETIME DEFAULT GETDATE(),
    Order_status VARCHAR(20) CHECK (Order_status IN ('Pending', 'In Transit', 'Delivered')),
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
CREATE TABLE Groceries(
	Category_ID INT PRIMARY KEY,
	ProductID INT,
    ExpirationDate DATE, 
    Nutritional_value json,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)

);

CREATE TABLE Store_PHONE_NO(
	Store_Id INT,
    Phone_no char(10),
    FOREIGN KEY (Store_Id) REFERENCES Store(Store_Id)
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
--correct untill now
-- adding to discounts

INSERT INTO Discounts (DiscountID, DiscountCode, DiscountValue, MinimumOrderAmount, StartDate, EndDate, IsActive)
VALUES
(1, 'NEW20', 20.00, 50.00, '2024-01-01', '2024-01-31', 1),
(2, 'SALE50', 50.00, 100.00, '2024-02-01', '2024-02-28', 1),
(3, 'FREESHIP', 0.00, 75.00, '2024-01-15', '2024-03-15', 1),
(4, 'WELCOME10', 10.00, NULL, '2024-01-01', '2024-12-31', 1),
(5, 'HOLIDAY25', 25.00, 150.00, '2024-11-01', '2024-12-31', 1),
(6, 'SUMMER15', 15.00, 80.00, '2024-06-01', '2024-08-31', 0);

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

INSERT INTO Products (ProductID, Store_id, ProductName, Category, Product_Image, Description, Price, Brand, StockQuantity)
VALUES
(11, 3, 'Orange Juice', 'Groceries', 'orange_juice.jpg', 'Freshly squeezed orange juice', 4.50, 'Citrus Farms', 60),
(12, 3, 'Broccoli', 'Groceries', 'broccoli.jpg', 'Organic green broccoli', 2.25, 'Green Farms', 80),
(13, 3, 'Sweater', 'Clothes', 'sweater.jpg', 'Warm wool sweater', 25.99, 'Warm Wear', 45),
(14, 3, 'Jacket', 'Clothes', 'jacket.jpg', 'Stylish winter jacket', 79.99, 'Outerwear Inc.', 25),
(15, 3, 'Tablet', 'Electronics', 'tablet.jpg', 'Lightweight and powerful tablet', 499.99, 'Gizmo Tech', 20),
(16, 4, 'Bread', 'Groceries', 'bread.jpg', 'Freshly baked bread', 2.99, 'Bakers Delight', 50),
(17, 4, 'Cheese', 'Groceries', 'cheese.jpg', 'Aged cheddar cheese', 5.99, 'Dairy Delight', 40),
(18, 4, 'Hat', 'Clothes', 'hat.jpg', 'Stylish summer hat', 14.99, 'Headwear Co.', 35),
(19, 4, 'Socks', 'Clothes', 'socks.jpg', 'Comfortable cotton socks', 7.99, 'Footwear Essentials', 100),
(20, 4, 'Headphones', 'Electronics', 'headphones.jpg', 'Noise-cancelling headphones', 199.99, 'Sound Masters', 25),
(21, 5, 'Grapes', 'Groceries', 'grapes.jpg', 'Seedless green grapes', 3.75, 'Vineyard Fresh', 55),
(22, 5, 'Carrots', 'Groceries', 'carrots.jpg', 'Organic crunchy carrots', 1.89, 'Garden Fresh', 70),
(23, 5, 'Skirt', 'Clothes', 'skirt.jpg', 'Elegant summer skirt', 24.99, 'Fashion Forward', 30),
(24, 5, 'Blouse', 'Clothes', 'blouse.jpg', 'Chic silk blouse', 35.99, 'Silk Style', 20),
(25, 5, 'Camera', 'Electronics', 'camera.jpg', 'High-resolution digital camera', 549.99, 'Photo Gear', 15),
(26, 6, 'Tomatoes', 'Groceries', 'tomatoes.jpg', 'Juicy red tomatoes', 2.99, 'Farm Fresh', 50),
(27, 6, 'Cucumber', 'Groceries', 'cucumber.jpg', 'Crisp cucumbers', 1.49, 'Green Garden', 65),
(28, 6, 'Jeans Jacket', 'Clothes', 'jeans_jacket.jpg', 'Classic jeans jacket', 45.99, 'Denim World', 20),
(29, 6, 'Scarf', 'Clothes', 'scarf.jpg', 'Warm woolen scarf', 19.99, 'Winter Wear', 40),
(30, 6, 'Monitor', 'Electronics', 'monitor.jpg', '4K UHD monitor', 299.99, 'Screen Tech', 10),
(31, 7, 'Cereal', 'Groceries', 'cereal.jpg', 'Healthy breakfast cereal', 4.99, 'Morning Crunch', 80),
(32, 7, 'Yogurt', 'Groceries', 'yogurt.jpg', 'Creamy Greek yogurt', 3.49, 'Dairy Fresh', 60),
(33, 7, 'Pants', 'Clothes', 'pants.jpg', 'Comfortable casual pants', 29.99, 'Casual Wear', 50),
(34, 7, 'Jumpsuit', 'Clothes', 'jumpsuit.jpg', 'Trendy jumpsuit', 49.99, 'Fashion Line', 30),
(35, 7, 'Smartwatch', 'Electronics', 'smartwatch.jpg', 'Feature-rich smartwatch', 199.99, 'Gadget Pro', 25),
(36, 8, 'Peaches', 'Groceries', 'peaches.jpg', 'Sweet and juicy peaches', 4.50, 'Fruit Basket', 55),
(37, 8, 'Lettuce', 'Groceries', 'lettuce.jpg', 'Fresh lettuce', 1.99, 'Garden Fresh', 50),
(38, 8, 'Sweatshirt', 'Clothes', 'sweatshirt.jpg', 'Cozy fleece sweatshirt', 25.99, 'Comfort Wear', 40),
(39, 8, 'Belt', 'Clothes', 'belt.jpg', 'Leather belt', 19.99, 'Accessory Shop', 50),
(40, 8, 'Keyboard', 'Electronics', 'keyboard.jpg', 'Mechanical keyboard', 99.99, 'Tech Essentials', 30),
(41, 9, 'Oranges', 'Groceries', 'oranges.jpg', 'Juicy oranges', 3.50, 'Citrus World', 60),
(42, 9, 'Potatoes', 'Groceries', 'potatoes.jpg', 'Fresh potatoes', 1.99, 'Farm Fresh', 70),
(43, 9, 'Blazer', 'Clothes', 'blazer.jpg', 'Formal blazer', 59.99, 'Business Wear', 25),
(44, 9, 'Gloves', 'Clothes', 'gloves.jpg', 'Warm winter gloves', 12.99, 'Winter Essentials', 40),
(45, 9, 'Router', 'Electronics', 'router.jpg', 'High-speed Wi-Fi router', 129.99, 'Network Solutions', 15),
(46, 10, 'Watermelon', 'Groceries', 'watermelon.jpg', 'Seedless watermelon', 5.99, 'Summer Fruits', 45),
(47, 10, 'Pepper', 'Groceries', 'pepper.jpg', 'Fresh bell pepper', 2.99, 'Farm Fresh', 50),
(48, 10, 'Coat', 'Clothes', 'coat.jpg', 'Elegant winter coat', 99.99, 'Winter Fashion', 20),
(49, 10, 'Tie', 'Clothes', 'tie.jpg', 'Silk tie', 15.99, 'Accessory World', 35),
(50, 10, 'Laptop Stand', 'Electronics', 'laptop_stand.jpg', 'Ergonomic laptop stand', 49.99, 'Office Essentials', 25);


INSERT INTO Groceries (Category_ID, ProductID, ExpirationDate, Nutritional_value)
VALUES
(5, 21, '2024-03-20', '{"calories": 69, "fat": 0.2, "carbs": 18, "protein": 0.7}'),
(6, 26, '2024-02-28', '{"calories": 33, "fat": 0.2, "carbs": 7, "protein": 1.2}'),
(7, 31, '2024-03-05', '{"calories": 120, "fat": 1.5, "carbs": 25, "protein": 3.5}'),
(8, 36, '2024-03-15', '{"calories": 64, "fat": 0.4, "carbs": 16, "protein": 1.2}'),
(9, 41, '2024-03-25', '{"calories": 47, "fat": 0.2, "carbs": 12, "protein": 0.9}'),
(10, 46, '2024-03-30', '{"calories": 30, "fat": 0.2, "carbs": 8, "protein": 0.6}');


INSERT INTO Cloths (Category_ID, ProductID, Size, Material)
VALUES
(1, 3, 'M', 'Cotton'),
(2, 8, 'S', 'Silk'),
(3, 13, 'L', 'Wool'),
(4, 18, 'M', 'Polyester'),
(5, 23, 'S', 'Cotton'),
(6, 28, 'M', 'Denim'),
(7, 33, 'L', 'Cotton'),
(8, 38, 'M', 'Fleece'),
(9, 43, 'M', 'Polyester'),
(10, 48, 'L', 'Wool');

INSERT INTO Electronics (Category_ID, ProductID, Manufacturer_date, Warrenty, Description)
VALUES
(1, 5, '2024-01-15', 1, '1-year warranty included'),
(2, 10, '2024-01-20', 2, '2-year warranty included'),
(3, 15, '2024-02-01', 1, '1-year warranty included'),
(4, 20, '2024-02-10', 1, '1-year warranty included'),
(5, 25, '2024-01-05', 2, '2-year warranty included'),
(6, 30, '2024-02-15', 1, '1-year warranty included'),
(7, 35, '2024-01-30', 2, '2-year warranty included'),
(8, 40, '2024-01-25', 1, '1-year warranty included'),
(9, 45, '2024-02-20', 2, '2-year warranty included'),
(10, 50, '2024-02-05', 1, '1-year warranty included');


select * from cart where customerID=1;