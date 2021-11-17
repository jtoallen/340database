-- ConcessionItems

--  SELECT itemname and memberPrice from ConcessionItems
SELECT itemName, memberPrice FROM ConcessionItems; 

-- Insert for ConcessionItems
INSERT INTO `ConcessionItems`(`itemName`, `standardPrice`, `memberPrice`) 
VALUES (:inputName, :inputStandardPrice, :inputMemberPrice);

-- Delete for ConcessionItems
SET @deleteItemID = (SELECT `itemID` from `ConcessionItems` WHERE `itemName` = :inputName);
UPDATE `Members` SET `recentConcessionItem`= NULL WHERE recentConcessionItem = @deleteItemID;
DELETE FROM `MembersConcessions` WHERE `itemID` = @deleteItemID;
DELETE FROM `ConcessionItems` WHERE `itemID` = @deleteItemID;

-- update for ConcessionItems
UPDATE `ConcessionItems` SET `standardPrice` = (:inputStandardPrice),`memberPrice`= (:inputMemberPrice) 
WHERE `itemName` = :inputName;



-- Films 

-- SELECT filmID from Films
SELECT Films.filmID, Members.firstName, Members.memberID, Members.latestFilmViewed 
FROM Films
INNER JOIN Members ON Members.latestFilmViewed = Films.filmID; 


-- Insert for Films
INSERT INTO `Films`(`title`) VALUES (:inputTitle);

-- delete for Films
SET @deleteFilmID = (SELECT `filmID` FROM `Films` WHERE `title` = :inputTitle);
UPDATE `Members` SET `latestFilmViewed` = NULL WHERE `latestFilmViewed` = @deleteFilmID;
DELETE FROM `MembersFilms` WHERE `filmID` = @deleteFilmID;
DELETE FROM `Films` WHERE `filmID` = @deleteFilmID;


-- Members

-- SELECT latestFilmViewed and recentConcessionItem from all  Members
SELECT latestFilmViewed, recentConcessionItem FROM Members; 

-- insert for Members
INSERT INTO `Members`(`firstName`, `lastName`, `email`, `latestFilmViewed`, `recentConcessionItem`) 
VALUES (:inputFirstName, :inputLastName, :inputEmail, NULL, NULL);

-- delete for Members
SET @deleteMemberID = (SELECT `memberID` FROM `Members` WHERE `firstName` = :firstNameInput AND `lastName` = :lastNameInput) AND `email` = :emailInput);
DELETE FROM `MembersConcessions` WHERE `memberID` = @deleteMemberID;
DELETE FROM `MembersFilms` WHERE `memberID` = @deleteMemberID;
DELETE FROM `Members` WHERE `memberID` = @deleteMemberID;

-- update for Members ***THIS IS NOT DONE YET**
-- UPDATE `Members` SET `firstName`= (:firstNameInput),`lastName`= (:lastNameInput),`email`=(:emailInput) 
-- WHERE memberID = (:memberID) 


-- insert for MembersFilms
INSERT INTO `MembersFilms`(`receiptID`, `filmID`, `memberID`, `quantityPurchased`) 
VALUES (NULL, :filmIdInput, :memberIdInput, :quantityInput);
UPDATE `Members` SET `latestFilmViewed`= (:filmIdInput) WHERE `memberID` = (:memberIdInput);

INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), (9.99 * (SELECT `quantityPurchased` FROM `MembersFilms` WHERE `memberID` = :memberIdInput ORDER BY `orderID` DESC LIMIT 1)));
SET @newReceiptID = (SELECT `receiptID` FROM `SalesReceipts` ORDER BY `receiptID` DESC LIMIT 1);

UPDATE `MembersFilms` SET `receiptID`= @newReceiptID WHERE orderID = (:memberIdInput);

-- delete for MembersFilms
DELETE FROM `MembersFilms` WHERE `orderID` = (:orderIdInput);

-- insert for MemberConcessions
INSERT INTO `MembersConcessions`(`itemID`, `memberID`, `quantityPurchased`) 
VALUES (:itemIdInput, :memberIdInput, :quantityInput);
UPDATE `Members` SET `recentConcessionItem` = (:itemIdInput) WHERE `memberID` = (:memberIdInput);

SET @concessionsPaid = (SELECT SUM(`memberPrice` * `quantityPurchased`) 
FROM `ConcessionItems` ci JOIN `MembersConcessions` mc ON ci.itemID = mc.itemID);

INSERT INTO `SalesReceipts`(`date`, `totalPaid`) 
VALUES (CURRENT_DATE(), @concessionsPaid);
SET @newReceiptID = (SELECT `receiptID` FROM `SalesReceipts` ORDER BY `receiptID` DESC LIMIT 1);

UPDATE `MemberConcessions` SET `receiptID`= @newReceiptID WHERE orderID = (:memberIdInput);


-- SalesReceipts

-- SELECT receiptID, totalPaid and memberID from SalesReceipts JOIN with MemberFilms
-- to show receiptID and totalPaid as related to memberID
SELECT SalesReceipts.receiptID, totalPaid, MembersFilms.memberID FROM SalesReceipts
INNER JOIN MembersFilms ON SalesReceipts.receiptID = MembersFilms.receiptID; 


-- insert SalesReceipts
INSERT INTO `SalesReceipts`(`date`, `totalPaid`) VALUES (CURRENT_DATE(), :totalPaidInput);

-- delete SalesReceipts
DELETE FROM `SalesReceipts` WHERE `receiptID` = (:receiptIdInput);


--  Update totalPaid on a SalesReceipt
UPDATE `SalesReceipts` SET `totalPaid`= (:totalPaid) WHERE `receiptID` = (:receiptIDInput)  ;
