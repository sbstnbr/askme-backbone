-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2013 at 07:20 AM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `taw2013`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendee`
--

CREATE TABLE IF NOT EXISTS `attendee` (
  `event_id` int(10) unsigned NOT NULL,
  `enterprise_id` varchar(255) NOT NULL,
  PRIMARY KEY (`event_id`,`enterprise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `attendee`
--

INSERT INTO `attendee` (`event_id`, `enterprise_id`) VALUES
(1, 'a.leon.escalera'),
(1, 'john.doe'),
(1, 'matthew.d.lancaster'),
(2, 'a.leon.escalera'),
(2, 'foo.bar'),
(2, 'matthew.d.lancaster');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE IF NOT EXISTS `event` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start` varchar(25) NOT NULL,
  `end` varchar(25) DEFAULT NULL,
  `allDay` tinyint(1) NOT NULL DEFAULT '0',
  `subject` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `start`, `end`, `allDay`, `subject`, `location`, `description`) VALUES
(1, '2013-07-22', '2013-07-26', 1, 'Front End technologies training', 'Training Room #302', 'Training including HTML5, CSS3, Javascript with libraries (jQuery, BackboneJS, NodeJS, RequireJS)'),
(2, '2013-07-10T08:00:00-05:00', '2013-07-10T10:00:00-05:00', 0, 'Design Session', 'Phone', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `enterprise_id` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  PRIMARY KEY (`enterprise_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`enterprise_id`, `first_name`, `last_name`) VALUES
('a.leon.escalera', 'Alejandro', 'Leon'),
('foo.bar', 'Foo', 'Bar'),
('john.doe', 'John', 'Doe'),
('matthew.d.lancaster', 'Matt', 'Lancaster');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
