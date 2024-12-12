-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Dec 10, 2024 at 04:43 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pastry_palette2`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_table`
--

CREATE TABLE `account_table` (
  `Username` varchar(255) NOT NULL,
  `Role_ID` int(10) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `First_Name` varchar(128) NOT NULL,
  `Last_Name_` varchar(128) NOT NULL,
  `Birthdate` date NOT NULL,
  `Phone_Number` varchar(11) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Status` tinyint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `account_table`
--

INSERT INTO `account_table` (`Username`, `Role_ID`, `Password`, `First_Name`, `Last_Name_`, `Birthdate`, `Phone_Number`, `Email`, `Status`) VALUES
('Allyza', 1, 'Allyza123', 'Allyza', 'Crisostomo', '2025-01-17', '09087561432', 'test@gmail.com', 1),
('jaypee', 1, 'jaypee123', 'John Paul', 'Marcelo', '2003-06-02', '09095909812', 'test@gmail.com', 1),
('Jericho', 1, 'Jericho123', 'Jericho', 'Yap', '2014-05-07', '09090252312', 'test@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `inventory_table`
--

CREATE TABLE `inventory_table` (
  `Product_ID` varchar(100) NOT NULL,
  `Product_Name` varchar(128) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Price` varchar(50) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `Quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory_table`
--

INSERT INTO `inventory_table` (`Product_ID`, `Product_Name`, `Description`, `Price`, `Image`, `Quantity`) VALUES
('SET1', 'Christmas Set A', 'Box of 6 Christmas Donuts', '₱450', '', 12),
('SET2', 'Christmas Set B', 'Box of 6 Christmas Cupcakes', '₱450', '', 13),
('SET3', 'Holloween Set A', 'Box of 6 Holloween Donuts', '₱400', '', 5),
('SET4', 'Halloween Set B', 'Box of 6 Halloween Éclairs', '₱400', '', 8);

-- --------------------------------------------------------

--
-- Table structure for table `order_line_table`
--

CREATE TABLE `order_line_table` (
  `Order_ID` int(100) NOT NULL,
  `Product_ID` varchar(100) NOT NULL,
  `Quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_table`
--

CREATE TABLE `order_table` (
  `Order_ID` int(100) NOT NULL,
  `Account_ID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_table`
--

CREATE TABLE `permission_table` (
  `Permission_ID` int(10) NOT NULL,
  `Permission_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `permission_table`
--

INSERT INTO `permission_table` (`Permission_ID`, `Permission_Name`) VALUES
(1, 'Admin Permission'),
(2, 'Customer Permission');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission_table`
--

CREATE TABLE `role_permission_table` (
  `Permission_ID` int(10) NOT NULL,
  `Role_ID` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_permission_table`
--

INSERT INTO `role_permission_table` (`Permission_ID`, `Role_ID`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `role_table`
--

CREATE TABLE `role_table` (
  `Role_ID` int(10) NOT NULL,
  `Role_Name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role_table`
--

INSERT INTO `role_table` (`Role_ID`, `Role_Name`) VALUES
(1, 'Admin'),
(2, 'Customer');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_table`
--
ALTER TABLE `account_table`
  ADD PRIMARY KEY (`Username`),
  ADD KEY `Role_ID` (`Role_ID`);

--
-- Indexes for table `inventory_table`
--
ALTER TABLE `inventory_table`
  ADD PRIMARY KEY (`Product_ID`);

--
-- Indexes for table `order_line_table`
--
ALTER TABLE `order_line_table`
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Indexes for table `order_table`
--
ALTER TABLE `order_table`
  ADD PRIMARY KEY (`Order_ID`),
  ADD KEY `Account_ID` (`Account_ID`);

--
-- Indexes for table `permission_table`
--
ALTER TABLE `permission_table`
  ADD PRIMARY KEY (`Permission_ID`);

--
-- Indexes for table `role_permission_table`
--
ALTER TABLE `role_permission_table`
  ADD KEY `Role_ID` (`Role_ID`),
  ADD KEY `Permission_ID` (`Permission_ID`);

--
-- Indexes for table `role_table`
--
ALTER TABLE `role_table`
  ADD PRIMARY KEY (`Role_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_table`
--
ALTER TABLE `order_table`
  MODIFY `Order_ID` int(100) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_table`
--
ALTER TABLE `account_table`
  ADD CONSTRAINT `account_table_ibfk_1` FOREIGN KEY (`Role_ID`) REFERENCES `role_table` (`Role_ID`);

--
-- Constraints for table `order_line_table`
--
ALTER TABLE `order_line_table`
  ADD CONSTRAINT `order_line_table_ibfk_1` FOREIGN KEY (`Order_ID`) REFERENCES `order_table` (`Order_ID`),
  ADD CONSTRAINT `order_line_table_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `inventory_table` (`Product_ID`);

--
-- Constraints for table `order_table`
--
ALTER TABLE `order_table`
  ADD CONSTRAINT `order_table_ibfk_1` FOREIGN KEY (`Account_ID`) REFERENCES `account_table` (`Username`);

--
-- Constraints for table `role_permission_table`
--
ALTER TABLE `role_permission_table`
  ADD CONSTRAINT `role_permission_table_ibfk_1` FOREIGN KEY (`Role_ID`) REFERENCES `role_table` (`Role_ID`),
  ADD CONSTRAINT `role_permission_table_ibfk_2` FOREIGN KEY (`Permission_ID`) REFERENCES `permission_table` (`Permission_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
