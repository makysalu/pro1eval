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

-- Volcando datos para la tabla virtualmarket.clientes: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`dniCliente`, `nombre`, `direccion`, `email`, `pwd`, `admin`) VALUES
	('1111', 'cliente', 'conselleria', 'cliente@gmail.com', '$2y$10$F2uy/TgOAQV3W2T7DzJYVugoU2V7lQLErdGwwkgCFV7BLhZxg8RYq', 0),
	('11111111', 'antonios', 'C/ valeras 22', 'antonio@midominio.es', '2117', 1),
	('1234', 'Profesor', 'conselleria', 'conselleria@gmail.com', '$2y$10$16d9yM1/9QhwVPNr5etahuK./xRtPbY03wg6fOjsgY0LRxxloJwwa', 1),
	('12345678', 'isabel', 'C/ Virgen del Puerto 3', 'isabel@midominio.es', '777777', 0),
	('2117', 'Diego', 'maximiliano', 'dimoal@gmail.com', '$2y$10$/z0Qb6Tz11DkxakPRtyqRuLzU2h9NNi/i5hE0idX38LfRIPp6U0qu', 1),
	('22222222', 'maria', 'C/ Moreras 12', 'maria@midominio.es', '222222', 0),
	('44444444', 'marta', 'C/ Valeras 4', 'marta@midominio.es', '444444', 0),
	('55555555', 'juan', 'Plaza Miguel de Unamuno', 'juan@midominio.es', '555555', 0),
	('66666666', 'manuel', 'C/Atocha 14', 'manuel@midominio.es', '666666', 0);
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Volcando datos para la tabla virtualmarket.lineaspedidos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `lineaspedidos` DISABLE KEYS */;
INSERT INTO `lineaspedidos` (`idPedido`, `nlinea`, `idProducto`, `cantidad`) VALUES
	(5, 1, 1, 2),
	(5, 2, 1, 2),
	(6, 1, 3, 1),
	(6, 2, 5, 1);
/*!40000 ALTER TABLE `lineaspedidos` ENABLE KEYS */;

-- Volcando datos para la tabla virtualmarket.pedidos: ~4 rows (aproximadamente)
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` (`idPedido`, `fecha`, `dirEntrega`, `nTarjeta`, `fechaCaducidad`, `matriculaRepartidor`, `dniCliente`) VALUES
	(5, '2019-11-14', '2', NULL, NULL, NULL, '11111111'),
	(6, '2019-11-14', '2', NULL, NULL, NULL, '11111111'),
	(7, '2019-11-14', '1', NULL, NULL, NULL, '11111112'),
	(8, '2019-11-15', '1', NULL, NULL, NULL, '11111111');
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;

-- Volcando datos para la tabla virtualmarket.productos: ~8 rows (aproximadamente)
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`idProducto`, `nombre`, `foto`, `marca`, `categoria`, `unidades`, `precio`) VALUES
	(1, 'Columbia Sportswear', 'ColumbiaSportswear.jpg', 'Columbia', 'camiseta', 100, 79.99),
	(2, 'C&S WL A Dream Tee', 'CaylerSons.jpg', 'Cayler & Sons', 'camiseta', 100, 24.99),
	(3, 'KK Signature Stripe Tee', 'KarlKani.jpg', 'Karl Kani', 'camiseta', 100, 34.99),
	(4, 'KK College Sweatpants', 'KKCollegeSweatpants.jpg', 'Karl Kani', 'pantalon', 100, 69.99),
	(5, 'KK Denim Baggy', 'KKDenimBaggy.jpg', 'Karl Kani', 'pantalon', 100, 79.99),
	(6, 'Box Logo', 'BoxLogo.jpg', 'Snipes', 'camiseta', 100, 19.99),
	(8, 'NSW Subset tee', 'NSWsubset.jpg', 'Nike', 'camiseta', 100, 39.99),
	(9, 'Basketballschuh Air Force 1', 'Basketballschuch.jpg', 'Nike', 'zapatillas', 100, 99.99);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
