
SET foreign_key_checks = 0;

-- define tables
DROP TABLE IF EXISTS `ConcessionItems`;
CREATE TABLE `ConcessionItems` (
  `itemID` int(11) NOT NULL AUTO_INCREMENT,
  `itemName` varchar(255) NOT NULL,
  `standardPrice` decimal(5,2) DEFAULT NULL,
  `memberPrice` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`itemID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `Films`;
CREATE TABLE `Films` (
  `filmID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
   PRIMARY KEY (`filmID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `Members`;
CREATE TABLE `Members` (
  `memberID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `latestFilmViewed` int(11) DEFAULT NULL,
  `recentConcessionItem` int(11) DEFAULT NULL,
  PRIMARY KEY (`memberID`), KEY `latestFilmViewed` (`latestFilmViewed`),
  KEY `recentConcessionItem` (`recentConcessionItem`),
  CONSTRAINT `Members_ibfk_1` FOREIGN KEY (`latestFilmViewed`) REFERENCES `Films` (`filmID`) ON DELETE CASCADE,
  CONSTRAINT `Members_ibfk_2` FOREIGN KEY (`recentConcessionItem`) REFERENCES `ConcessionItems` (`itemID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `SalesReceipts`;
CREATE TABLE `SalesReceipts` (
  `receiptID` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `totalPaid` decimal(5,2) NOT NULL,
  PRIMARY KEY (`receiptID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `MembersConcessions`;
CREATE TABLE `MembersConcessions` (
  `transactionID` int(11) NOT NULL AUTO_INCREMENT,
  `receiptID` int(11) DEFAULT NULL,
  `itemID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL, 
  `quantityPurchased` int(11) NOT NULL,
  PRIMARY KEY (`transactionID`),
  KEY `receiptID` (`receiptID`),
  KEY `itemID` (`itemID`),
  KEY `memberID` (`memberID`),
  CONSTRAINT `MembersConcessions_ibfk_1` FOREIGN KEY (`receiptID`) REFERENCES `SalesReceipts` (`receiptID`) ON DELETE CASCADE,
  CONSTRAINT `MembersConcessions_ibfk_2` FOREIGN KEY (`itemID`) REFERENCES `ConcessionItems` (`itemID`) ON DELETE CASCADE,
  CONSTRAINT `MembersConcessions_ibfk_3` FOREIGN KEY (`memberID`) REFERENCES `Members` (`memberID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `MembersFilms`;
CREATE TABLE `MembersFilms` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `receiptID` int(11) DEFAULT NULL,
  `filmID` int(11) NOT NULL,
  `memberID` int(11) NOT NULL,
  `quantityPurchased` int(11) NOT NULL,
  PRIMARY KEY (`orderID`),
  KEY `receiptID` (`receiptID`),
  KEY `filmID` (`filmID`),
  KEY `memberID` (`memberID`),
  CONSTRAINT `MembersFilms_ibfk_1` FOREIGN KEY (`receiptID`) REFERENCES `SalesReceipts` (`receiptID`) ON DELETE CASCADE,
  CONSTRAINT `MembersFilms_ibfk_2` FOREIGN KEY (`filmID`) REFERENCES `Films` (`filmID`) ON DELETE CASCADE,
  CONSTRAINT `MembersFilms_ibfk_3` FOREIGN KEY (`memberID`) REFERENCES `Members` (`memberID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- add concessions
INSERT INTO `ConcessionItems`(`itemName`, `standardPrice`, `memberPrice`) 
VALUES ('Skittles', 1.99, 0.99), ('M&Ms', 1.99, 0.99), ('Large Popcorn', 7.99, 5.99), 
('Small Popcorn', 5.99, 3.99), ('Large Soda', 4.99, 2.99), ('Small Soda', 3.99, 1.99);

-- add films
INSERT INTO `Films`(`title`) 
VALUES ('Eternals'), ('Clifford'), ('Dune'), ('No Time To Die');

-- add members (Bob, et. al. is a new member, and its his first time at this theater so he doesn't have recent films or concessions yet.  Janice is a member with a recent movie and recent concession)
INSERT INTO `Members`(`firstName`, `lastName`, `email`, `latestFilmViewed`, `recentConcessionItem`) 
VALUES ('Bob','Jones','bob.jones@mailbox.com', NULL, NULL), 
('Janice','Johnson',' jj@bestmail.com', 3, 2), ("Jimi", "Hendrix", "jimi@hendrix.com", NULL, NULL), 
("Dave", "Matthews", "dave@matthews.com", NULL, NULL);

-- storing bobs member ID as a variable to avoid repeated subqueries
SET @bobID = (SELECT memberID FROM Members WHERE firstName = 'Bob' AND lastName = 'Jones');

-- bob buys a ticket to Eternals
INSERT INTO `MembersFilms`(`filmID`, `memberID`, `quantityPurchased`) 
VALUES (1, @bobID, 1);

-- now that bob bought the ticket we update his latest film viewed on his member record
UPDATE Members SET latestFilmViewed = 1 WHERE memberID = @bobID;
SET @bobNewOrderID = (SELECT orderID FROM MembersFilms ORDER BY orderID DESC LIMIT 1);

-- we create a receipt for bob's ticket purchase
INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), (9.99 * (SELECT quantityPurchased FROM MembersFilms WHERE memberID = @bobID ORDER BY orderID DESC LIMIT 1)));
SET @bobReceiptID = (SELECT receiptID FROM SalesReceipts ORDER BY receiptID DESC LIMIT 1);

-- we update bob's ticket order to tie to his receipt
UPDATE `MembersFilms` SET `receiptID`= @bobReceiptID WHERE orderID = @bobNewOrderID;

-- before bob goes to see his movie, he buys some concession items
INSERT INTO `MembersConcessions`(`itemID`, `memberID`, `quantityPurchased`) 
VALUES (2, @bobID, 2), (4, @bobID, 1), (6, @bobID, 1);

-- now that bob bought concessions we update his latest concession on his member record
UPDATE Members SET recentConcessionItem = 6 WHERE memberID = @bobID;
SET @bobNewTransactionID = (SELECT transactionID FROM MembersConcessions ORDER BY transactionID DESC LIMIT 1);

-- we have to add up the concession numbers for the receipt
SET @bobConcessionsPaid = (SELECT SUM(memberPrice * quantityPurchased) FROM ConcessionItems ci JOIN MembersConcessions mc ON ci.itemID = mc.itemID);

-- we create a receipt for bob's concession purchase
INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), @bobConcessionsPaid);


-- UPDATES BY JASON ALLEN 

-- storing jimi and dave member ID as a variable to avoid repeated subqueries
SET @daveID = (SELECT memberID FROM Members WHERE firstName = 'Dave' AND lastName = 'Matthews');
SET @jimiID = (SELECT memberID FROM Members WHERE firstName = 'Jimi' AND lastName = 'Hendrix');

-- member Jimi and Dave buy a ticket to film
INSERT INTO `MembersFilms`(`filmID`, `memberID`, `quantityPurchased`) 
VALUES (3, @jimiID, 3); 
-- member Jimi and Dave bought tickets. Update their latest film viewed on member record
UPDATE Members SET latestFilmViewed = 3 WHERE memberID = @jimiID;
SET @jimiNewOrderID = (SELECT orderID FROM MembersFilms ORDER BY orderID DESC LIMIT 1);

-- we create a receipt for Jimi and Dave ticket purchase
INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), (9.99 * (SELECT quantityPurchased FROM MembersFilms WHERE memberID = @jimiID ORDER BY orderID DESC LIMIT 1)));
SET @jimiReceiptID = (SELECT receiptID FROM SalesReceipts ORDER BY receiptID DESC LIMIT 1);

-- we update jimi's and dave's ticket order to tie to their receipt
UPDATE `MembersFilms` SET `receiptID`= @jimiReceiptID WHERE orderID = @jimiNewOrderID;




-- dave film
INSERT INTO `MembersFilms`(`filmID`, `memberID`, `quantityPurchased`) 
VALUES (4, @daveID, 41);
UPDATE Members SET latestFilmViewed = 4 WHERE memberID = @daveID;
SET @daveNewOrderID = (SELECT orderID FROM MembersFilms ORDER BY orderID DESC LIMIT 1);

-- dave ticket receipt
INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), (9.99 * (SELECT quantityPurchased FROM MembersFilms WHERE memberID = @daveID ORDER BY orderID DESC LIMIT 1)));
SET @daveReceiptID = (SELECT receiptID FROM SalesReceipts ORDER BY receiptID DESC LIMIT 1);

UPDATE `MembersFilms` SET `receiptID`= @daveReceiptID WHERE orderID = @daveNewOrderID;





-- jimi buys some concession items
INSERT INTO `MembersConcessions`(`itemID`, `memberID`, `quantityPurchased`) 
VALUES (3, @jimiID, 3);

--  update latest concession on their member record
UPDATE Members SET recentConcessionItem = 3 WHERE memberID = @jimiID;
SET @jimiNewTransactionID = (SELECT transactionID FROM MembersConcessions ORDER BY transactionID DESC LIMIT 1);

-- add up the concession numbers for the receipt
SET @jimiConcessionsPaid = (SELECT SUM(memberPrice * quantityPurchased) 
FROM ConcessionItems ci JOIN MembersConcessions mc ON ci.itemID = mc.itemID);

-- create a receipt for members' concession purchase
INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), @jimiConcessionsPaid);


-- dave buys some concession items
INSERT INTO `MembersConcessions`(`itemID`, `memberID`, `quantityPurchased`) 
VALUES (4, @daveID, 41);

UPDATE Members SET recentConcessionItem = 4 WHERE memberID = @daveID;
SET @daveNewTransactionID = (SELECT transactionID FROM MembersConcessions ORDER BY transactionID DESC LIMIT 1);

SET @daveConcessionsPaid = (SELECT SUM(memberPrice * quantityPurchased) 
FROM ConcessionItems ci JOIN MembersConcessions mc ON ci.itemID = mc.itemID);

INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), @daveConcessionsPaid);

SET foreign_key_checks = 1;