use fatafat;
DELETE FROM Products WHERE StockQuantity = 0;
select * from payments
SELECT c.productID, c.quantity, p.Store_id
      FROM cart c
      INNER JOIN products p ON c.productID = p.ProductID
      WHERE c.customerID = 1
SELECT ProductId FROM Products where ProductName='Milk'
SELECT * FROM Products WHERE Category = 'GROCERIES';
select * from cloths;
SELECT * FROM Products WHERE Category = 'electronics'
SELECT * FROM Products WHERE Category = 'clothes'

select * from store;
select * from electronics
-- select * from electronics;
Select * from Customers;
select * from orders;
delete from orders where orderID >11;
select * from cart
SELECT * FROM orders WHERE Customer_id=1
-- query to fetch order details
SELECT Orders.OrderID, Customers.First_Name, Products.ProductName
FROM Orders
INNER JOIN Customers ON Orders.Customer_id = Customers.Customer_id
INNER JOIN Products ON Orders.ProductID = Products.ProductID;

-- select * from store;
-- select * from products;
SELECT Store_Id, COUNT(*) AS Total_Products
FROM Products
GROUP BY Store_Id;

-- select * from customers;
-- command to change the last name of a customer
UPDATE Customers
SET Last_Name = 'goyal'
WHERE Customer_id = 1;

UPDATE products
SET StockQuantity = 100
WHERE productID=5;
-- i will have to disable the safe mode from preferences->sql_editor
select * from products;
select * from products;
select * from electronics;
DELETE FROM Products WHERE Category = 'Clothes' AND StockQuantity = 0;

-- subqueries in sql
SELECT ProductID, ProductName, Price
FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);

select * from orders;
-- inserting new value
-- we can check here the default time is being stored
INSERT INTO Orders (OrderID,Customer_id, StoreID, ProductID, Order_status)
VALUES (11,3, 2, 7, 'Pending');

select * from products;
SELECT * FROM GROCERIES;
select * from electronics;


(SELECT ProductID FROM Groceries)
UNION
(SELECT ProductID FROM Electronics);

(SELECT ProductID, ProductName FROM Groceries natural join products)
INTERSECT
(SELECT ProductID, ProductName FROM Products WHERE Price < 10);

(SELECT ProductID, ProductName FROM Products WHERE Category = 'Clothes')
EXCEPT
(SELECT ProductID, ProductName FROM Products WHERE StockQuantity > 50);

-- Create a trigger named "delete_item_if_zero_quantity"
DELIMITER //

CREATE TRIGGER delete_item_if_zero_quantity
AFTER UPDATE ON cart FOR EACH ROW
BEGIN
    IF NEW.quantity = 0 THEN
        -- Delete the row from the cart table
        DELETE FROM cart WHERE productID = NEW.productID AND customerID = NEW.customerID;
    END IF;
END;
//

DELIMITER ;


INSERT INTO Electronics (Category_ID, ProductID, Manufacturer_date, Warrenty, Description)
VALUES
(6, 11, '2024-04-10', 3, '3-year warranty included');

INSERT INTO Products (ProductID, Store_id, ProductName, Category, Product_Image, Description, Price, Brand, StockQuantity)
VALUES
(11, 3, 'High-Performance Laptop', 'Electronics', 'high-performance-laptop.jpg', 'Powerful high-performance laptop', 1199.99, 'Tech Innovators', 20);


UPDATE Electronics
SET Description = '3-year warranty included', StockQuantity = 1
WHERE ProductID = 11;

-- Update the StockQuantity in Products table
UPDATE Products
SET StockQuantity = 1
WHERE ProductID = 11;

select * from groceries
delete from products where ProductID>30
INSERT INTO Products (
    ProductID,
    Store_id,
    ProductName,
    Category,
    Product_Image,
    Description,
    Price,
    Brand,
    StockQuantity
) VALUES (
    31,
    1,
    'Zara',
    'Clothes',
    'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg',
    'Zara product description',
    100,
    'Zara',
    50
);

INSERT INTO Products (
    ProductID,
    Store_id,
    ProductName,
    Category,
    Product_Image,
    Description,
    Price,
    Brand,
    StockQuantity
) VALUES (
    32,
    1,
    'Gucci',
    'Clothes',
    'https://images.pexels.com/photos/953271/pexels-photo-953271.jpeg',
    'Gucci product description',
    200,
    'Gucci',
    30
);

INSERT INTO Products (
    ProductID,
    Store_id,
    ProductName,
    Category,
    Product_Image,
    Description,
    Price,
    Brand,
    StockQuantity
) VALUES (
    33,
    1,
    'Ajumaro',
    'Clothes',
    'https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg',
    'Ajumaro product description',
    10,
    'Ajumaro',
    100
);
INSERT INTO Products (ProductID, Store_id, ProductName, Category, Product_Image, Description, Price, Brand, StockQuantity) 
VALUES (34, 1, 'Denim', 'clothes', 'https://images.pexels.com/photos/2863554/', 'Description for Denim', 49.99, 'BrandName', 50);
