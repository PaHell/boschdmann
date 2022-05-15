-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Mai 2022 um 20:41
-- Server-Version: 10.4.24-MariaDB
-- PHP-Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `boschdmann`
--
CREATE DATABASE IF NOT EXISTS `boschdmann` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `boschdmann`;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `departments`
--

DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `departments`
--

INSERT INTO `departments` (`ID`, `Name`) VALUES
(1, 'IT'),
(2, 'Sales');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `userdepartments`
--

DROP TABLE IF EXISTS `userdepartments`;
CREATE TABLE `userdepartments` (
  `UserID` int(11) NOT NULL,
  `DepartmentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `userdepartments`
--

INSERT INTO `userdepartments` (`UserID`, `DepartmentID`) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `EMail` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `users`
--

INSERT INTO `users` (`ID`, `FirstName`, `LastName`, `EMail`) VALUES
(1, 'Johannes', 'Kielmann', 'johannes.kielmann@de.bosch.com'),
(2, 'Patrick', 'Hellebrand', 'patrick.hellebrand@de.bosch.com'),
(3, 'Dominik', 'Müller', 'dominik.mueller@de.bosch.com');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `userdepartments`
--
ALTER TABLE `userdepartments`
  ADD PRIMARY KEY (`UserID`,`DepartmentID`) USING BTREE,
  ADD KEY `DepartmentID` (`DepartmentID`);

--
-- Indizes für die Tabelle `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `departments`
--
ALTER TABLE `departments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `userdepartments`
--
ALTER TABLE `userdepartments`
  ADD CONSTRAINT `userdepartments_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`),
  ADD CONSTRAINT `userdepartments_ibfk_2` FOREIGN KEY (`DepartmentID`) REFERENCES `departments` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

GRANT USAGE ON *.* TO `boschdmann`@`%` IDENTIFIED BY PASSWORD '*6E1761F931C457C5A992A7A8F7E83750ED1FF3BF';

GRANT ALL PRIVILEGES ON `boschdmann`.* TO `boschdmann`@`%` WITH GRANT OPTION;
