/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for taw2013
DROP DATABASE IF EXISTS `taw2013`;
CREATE DATABASE IF NOT EXISTS `taw2013` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `taw2013`;


-- Dumping structure for table taw2013.event
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `start` varchar(25) NOT NULL,
  `end` varchar(25) DEFAULT NULL,
  `allDay` tinyint(1) NOT NULL DEFAULT '0',
  `subject` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


-- Dumping structure for table taw2013.presenter
CREATE TABLE IF NOT EXISTS `presenter` (
  `event_id` int(10) unsigned NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `question` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(1024) DEFAULT NULL,
  `votes` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE USER 'taw2013'@'localhost' IDENTIFIED BY 'x2YfU8vHqAATS7Sh';
GRANT ALL PRIVILEGES ON taw2013.* TO 'taw2013'@'%';


/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
