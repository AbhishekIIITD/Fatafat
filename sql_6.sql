-- INSERT INTO Products (ProductID,Store_id,ProductName,Category,Product_Image,Description, Price,Brand,StockQuantity) VALUES (12,2,'New Product','Clothes','jeans.jpg','lololol', 1.00, 'gucci',50);
-- UPDATE Products SET Price = 2.55 WHERE ProductID = 1;
-- INSERT INTO Orders (OrderID,Customer_ID,storeID, ProductID, OrderDate,Order_Status) VALUES (40,1, 1, 2, NOW(),"pending");
-- DELETE FROM Customers WHERE Customer_id = 12;



delete from products where ProductID=12;
delete from orders where orderID=40;
-- INSERT INTO Customers (Customer_id,First_Name, Last_Name, Email, Password) 
-- VALUES (12,'Rein', 'Heimer', 'ReinHeimer@gmail.com', '444444');
-- Transaction 1: Insert a new customer
START TRANSACTION;
INSERT INTO Products (ProductID,Store_id,ProductName,Category,Product_Image,Description, Price,Brand,StockQuantity) VALUES (12,2,'New Product','Clothes','jeans.jpg','lololol', 1.00, 'gucci',50);
COMMIT;

-- Transaction 2: Update customer email
START TRANSACTION;
INSERT INTO Orders (OrderID,Customer_ID,storeID, ProductID, OrderDate,Order_Status) VALUES (40,1, 1, 2, NOW(),"pending");
COMMIT;

-- Transaction 3: Insert a new product
START TRANSACTION;
UPDATE Products SET Price = 2.55 WHERE ProductID = 1;
COMMIT;

-- Transaction 4: Delete a Customer
START TRANSACTION;
DELETE FROM Customers WHERE Customer_id = 12;
COMMIT;

START TRANSACTION;
UPDATE payments SET Amount=Amount*0.5 where PaymentID=1;
UPDATE products set StockQuantity=StockQuantity-2 where productID=1;

COMMIT;

START TRANSACTION;
UPDATE payments SET Amount=Amount+15.00 where PaymentID=1;
UPDATE products set StockQuantity=StockQuantity+4 where productID=1;
COMMIT;
UPDATE products set StockQuantity=4 where productID=11;

select * from products
select * from payments

