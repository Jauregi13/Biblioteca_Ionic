-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2018 a las 21:26:06
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bibliotecaionic`
--
CREATE DATABASE IF NOT EXISTS `bibliotecaionic` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `bibliotecaionic`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `id` int(11) NOT NULL,
  `titulo` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `autor` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `paginas` int(11) NOT NULL,
  `leido` tinyint(1) NOT NULL,
  `imagen` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`id`, `titulo`, `autor`, `paginas`, `leido`, `imagen`) VALUES
(1, 'Piramide Roja', 'Rick Riordan', 516, 0, 'imgs/piramideRoja.png'),
(2, 'Oscuros', 'Lauren Kate', 0, 0, '0'),
(6, 'Harry Potter', 'J.K Rowling', 255, 0, NULL),
(7, 'El heroe perdido', 'Rick Riordan', 0, 0, NULL),
(8, 'Harry Potter 2', 'J.K Rowling', 0, 0, NULL),
(10, 'La Templanza', 'Maria DueÃ±as', 0, 0, NULL),
(14, 'test', 'test', 0, 0, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `titulo` (`titulo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
