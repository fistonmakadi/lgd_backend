-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 02 juil. 2022 à 11:28
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lgd_bd`
--

-- --------------------------------------------------------

--
-- Structure de la table `cellule`
--

DROP TABLE IF EXISTS `cellule`;
CREATE TABLE IF NOT EXISTS `cellule` (
  `code` varchar(10) NOT NULL,
  `description` varchar(200) NOT NULL,
  `adresse_rencontre` varchar(500) NOT NULL,
  `fkMembreChef` varchar(20) NOT NULL,
  `province` varchar(100) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `commune` varchar(100) DEFAULT NULL,
  `territoire` varchar(100) DEFAULT NULL,
  `quartier` varchar(100) DEFAULT NULL,
  `dateCreate` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `departement`
--

DROP TABLE IF EXISTS `departement`;
CREATE TABLE IF NOT EXISTS `departement` (
  `code` varchar(1) NOT NULL,
  `description` varchar(100) NOT NULL,
  `mission` text NOT NULL,
  `fkMembreChef` varchar(20) NOT NULL,
  `dateCreate` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `fonction`
--

DROP TABLE IF EXISTS `fonction`;
CREATE TABLE IF NOT EXISTS `fonction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(100) NOT NULL,
  `fkMembre` varchar(20) NOT NULL,
  `membre` varchar(100) NOT NULL,
  `fkDepartement` varchar(20) NOT NULL,
  `departement` varchar(100) NOT NULL,
  `date_nomination` date NOT NULL,
  `dateCreate` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `membre`
--

DROP TABLE IF EXISTS `membre`;
CREATE TABLE IF NOT EXISTS `membre` (
  `code` int(250) NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) CHARACTER SET utf8 NOT NULL,
  `postnom` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `prenom` varchar(100) CHARACTER SET utf8 NOT NULL,
  `username` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(850) CHARACTER SET utf8 NOT NULL,
  `telephone` varchar(20) CHARACTER SET utf8 NOT NULL,
  `sexe` varchar(20) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `type` varchar(100) CHARACTER SET utf8 NOT NULL,
  `adresse` varchar(300) CHARACTER SET utf8 DEFAULT NULL,
  `quartier` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `commune` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `ville` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `district` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `province` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `province_origine` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `date_naissance` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `lieu_naissance` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `profession` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `photo` varchar(1000) CHARACTER SET utf8 DEFAULT NULL,
  `bio` text CHARACTER SET utf8,
  `status` tinyint(1) NOT NULL,
  `dateCreate` varchar(100) NOT NULL,
  PRIMARY KEY (`code`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `nom` (`nom`,`postnom`,`prenom`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `membre`
--

INSERT INTO `membre` (`code`, `nom`, `postnom`, `prenom`, `username`, `password`, `telephone`, `sexe`, `email`, `type`, `adresse`, `quartier`, `commune`, `ville`, `district`, `province`, `province_origine`, `date_naissance`, `lieu_naissance`, `profession`, `photo`, `bio`, `status`, `dateCreate`) VALUES
(10, 'Makadi', 'Kabala', 'Fiston', 'fmak12', 'fmak4512', '243819483434', 'Homme', 'fistonmakadi@gmail.com', 'Effectif', '63 avenue Ndjoko', 'Ndanu', 'Limet', NULL, 'Funa', 'Kinshasa', 'Kasaï', '1995-06-14', 'Kinshasa', 'Informaticien', 'http://192.168.43.52:8800/public/uploads/images/membre/1656321934660_fmak12.png', 'Ingénieur logiciel et développeur mobile', 0, '2022-06-27'),
(11, 'Munganga', 'Mwamba', 'Jules César', 'César Munganga', '001994jcJC', '243844466024', 'Homme', 'cesarmunganga@gmail.com', 'Adherent', '01munganga', 'gb', 'bandalungwa', 'Kinshasa', 'lukunga', 'Kinshasa', 'manièma', '1995-06-22', 'kindu', 'informaticien ', 'http://192.168.43.52:8800/public/uploads/images/membre/1656415732628_César Munganga.png', 'lgd', 1, '2022-06-28');

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `code` varchar(10) NOT NULL,
  `type` varchar(100) NOT NULL COMMENT 'Contribution ou Don',
  `motif` varchar(500) NOT NULL,
  `valeur` decimal(10,0) NOT NULL,
  `dateCreate` date NOT NULL,
  `status` tinyint(1) NOT NULL,
  `fkMembre` varchar(10) NOT NULL,
  `devise` varchar(100) NOT NULL,
  `mode_paiement` varchar(100) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
