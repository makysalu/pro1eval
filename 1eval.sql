-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.3.16-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando datos para la tabla virtualmarket.clientes: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`dniCliente`, `nombre`, `direccion`, `email`, `pwd`, `admin`) VALUES
	(1, 'diego', 'nose', 'nose', '2117', _binary 0x31),
	(2, 'juan', 'nose', 'nose', '2117', _binary 0x30),
	(3, 'julia', 'nose', 'nose', '2117', _binary 0x30);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando datos para la tabla virtualmarket.productos: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`idProducto`, `nombre`, `foto`, `marca`, `categoria`, `unidades`, `precio`) VALUES
	(1, 'Basketball Schuch', 'Basketballschuch.jpg', 'Naik', 'zapatillas', 4, 100),
	(2, 'Box Logo', 'BoxLogo.jpg', 'Snipes', 'camiseta', 5, 20),
	(3, 'Cayler Sons', 'CaylerSons.jpg', 'Cayler Sons', 'camiseta', 6, 30),
	(4, 'Columbia Sportswear', 'ColumbiaSportswear.jpg', 'Snipes', 'camisa', 4, 35),
	(5, 'Karl kani sport', 'Karlkani.jpg', 'Karl kani', 'camiseta', 6, 20),
	(6, 'KK College Sweatpants', 'KKCollegeSweatpants.jpg', 'Karl kani', 'pantalones', 3, 40),
	(7, 'KK Denim Baggy', 'KKDenimBaggy.jpg', 'Karl kani', 'pantalones', 4, 50),
	(8, 'NSW Subset', 'NSWsubset.jpg', 'Naik', 'camiseta', 6, 20),
	(9, 'Trainingshose', 'Trainingshose.jpg', 'Naik', 'pantalones', 7, 30);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
