-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.6-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando datos para la tabla virtualmarket.clientes: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`dniCliente`, `nombre`, `direccion`, `email`, `pwd`, `admin`) VALUES
	('11111111', 'antonio', 'C/ valeras 22', 'antonio@midominio.es', '2117', 0),
	('11111112', 'diego', '3', '4', '2117', 1),
	('12345678', 'isabel', 'C/ Virgen del Puerto 3', 'isabel@midominio.es', '777777', 0),
	('22222222', 'maria', 'C/ Moreras 12', 'maria@midominio.es', '222222', 0),
	('44444444', 'marta', 'C/ Valeras 4', 'marta@midominio.es', '444444', 0),
	('55555555', 'juan', 'Plaza Miguel de Unamuno', 'juan@midominio.es', '555555', 0),
	('66666666', 'manuel', 'C/Atocha 14', 'manuel@midominio.es', '666666', 0);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando datos para la tabla virtualmarket.lineaspedidos: ~5 rows (aproximadamente)
/*!40000 ALTER TABLE `lineaspedidos` DISABLE KEYS */;
INSERT INTO `lineaspedidos` (`idPedido`, `nlinea`, `idProducto`, `cantidad`) VALUES
	(1, 1, 3, 10),
	(1, 2, 4, 10),
	(1, 3, 9, 10),
	(2, 1, 5, 10),
	(2, 2, 7, 10);
/*!40000 ALTER TABLE `lineaspedidos` ENABLE KEYS */;

-- Volcando datos para la tabla virtualmarket.pedidos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` (`idPedido`, `fecha`, `dirEntrega`, `nTarjeta`, `fechaCaducidad`, `matriculaRepartidor`, `dniCliente`) VALUES
	(1, '2016-01-20', 'C/ Valeras, 22', '111111', '2020-02-02', 'pbf-1144', '11111111'),
	(2, '2016-02-10', 'C/ Princesa, 15', '333333', '2020-02-02', 'bbc-2589', '33333333'),
	(3, '2019-11-08', '', NULL, NULL, NULL, '11111111'),
	(4, '2019-11-08', '', NULL, NULL, NULL, '11111111');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;

-- Volcando datos para la tabla virtualmarket.productos: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`idProducto`, `nombre`, `foto`, `marca`, `categoria`, `unidades`, `precio`) VALUES
	(1, 'Columbia Sportswear', 'ColumbiaSportswear.jpg', 'Columbia', 'camiseta', 100, 79.99),
	(2, 'C&S WL A Dream Tee', 'CaylerSons.jpg', 'Cayler & Sons', 'camiseta', 100, 24.99),
	(3, 'KK Signature Stripe Tee', 'KarlKani.jpg', 'Karl Kani', 'camiseta', 100, 34.99),
	(4, 'KK College Sweatpants', 'KKCollegeSweatpants.jpg', 'Karl Kani', 'pantalon', 100, 69.99),
	(5, 'KK Denim Baggy', 'KKDenimBaggy.jpg', 'Karl Kani', 'pantalon', 100, 79.99),
	(6, 'Box Logo', 'BoxLogo.jpg', 'Snipes', 'camiseta', 100, 19.99),
	(7, 'Trainingshose Sportswear', 'Trainingshose.jpg', 'Nike', 'pantalon', 100, 39.99),
	(8, 'NSW Subset tee', 'NSWsubset.jpg', 'Nike', 'camiseta', 100, 39.99),
	(9, 'Basketballschuh Air Force 1', 'Basketballschuch.jpg', 'Nike', 'zapatillas', 100, 99.99);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
