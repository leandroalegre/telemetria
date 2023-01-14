-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 14-01-2023 a las 19:50:35
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `moderniz_eleccion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `refreshToken` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `id_persona`, `username`, `password`, `role`, `refreshToken`) VALUES
(1, 0, '39423212', '$2a$10$W5wjYV6dYI3gp4zFkbQIveUm1O4zvWcO5O1/8RQkexDksU75yba2G', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiMzk0MjMyMTIiLCJpYXQiOjE2Njk0MDMwMDEsImV4cCI6MTY2OTQwMzA4N30.GCY-50Fk6ESvsoGA52jR5b2KxSaR6nSVlWb6omDhnXg'),
(2, 117, '24214718', '$2a$10$C3Eh7XRiETGin4AHiK2/p.tqj2ihtAJzGRFdMw5t5D73vkhYv2czi', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoiMjQyMTQ3MTgiLCJpYXQiOjE2NzM3MTM4NzYsImV4cCI6MTY3MzcxMzk2Mn0.z-gMqFxJoYR-_h1QFqL9JEQURdlbfqyIkWYGEPLjqSE'),
(3, 0, '36341414', '$2a$10$Ri38BkuRR9fJuRp2tjRbRub5ooRIKod5wAfzU2XCWceiKIiIRw3KC', 'operador', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInVzZXJuYW1lIjoiMzYzNDE0MTQiLCJpYXQiOjE2Njk2NjEyNTIsImV4cCI6MTY2OTY2MTMzOH0.Bedy5GY41z1q0cn3nVtojmV1ihD2Ux_pek5dahWje7I'),
(4, 0, '35085794', '$2a$10$KnScPvoXVcVJZe31F2R8xOx/bYx3i5awuJmyLIYYL82XGiRA2xaKu', 'operador', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsInVzZXJuYW1lIjoiMzUwODU3OTQiLCJpYXQiOjE2NzI3ODI5MDEsImV4cCI6MTY3Mjc4Mjk4N30.5KHWKwFvdMn7Xtsf_It3MSuJjx9W9uKa7xs0sJkHpFg'),
(5, 2687, '33223553', '', 'sin rol', ''),
(6, 1564, '35785712', '$2a$10$VlAl1HySVjHQbonKxgZlJ.BUV1nJYwfpsTMpU/Ty7gWhNRgKWgGQO', 'referente', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsInVzZXJuYW1lIjoiMzU3ODU3MTIiLCJpYXQiOjE2MTU3Mzk5NTQsImV4cCI6MTYxNTc0MDA0MH0.xarRn39YgachOJJmAu1zHblyT9u-wZVaojgGfirDtYs'),
(7, 383, '22413806', '$2a$10$wgT2rUBGvPQF71vPA8Ksr.qxr0eHJZP84sG5aI8hG9hHua3ObWpnC', 'admin', ''),
(8, 2162, '38111568', '', 'referente', ''),
(9, 2332, '33816013', '', 'referente', ''),
(10, 2629, '29939695', '', 'referente', ''),
(11, 6, '33315508', '$2a$10$zcK05VFsvO4o8kH4IG6LieXgsOkjUp2eCt9qmiWSkcWj6NB61sLqC', 'sin rol', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExLCJ1c2VybmFtZSI6IjMzMzE1NTA4IiwiaWF0IjoxNjE1NzI1MTc5LCJleHAiOjE2MTU3MjUyNjV9.66S8ftOPYYbz8Dhsmpi0WUErKpkqMOGTJ85VKPv3twQ'),
(12, 19, '21803133', '$2a$10$/omQaYd.1sGBdyBxMIbPaeJKaXQ/Jysnyr9XPE/xGmPWkKPAY2Ro.', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6IjIxODAzMTMzIiwiaWF0IjoxNjE1NzQ3NzAwLCJleHAiOjE2MTU3NDc3ODZ9.qgEcN-Ra4VjbiJxpkUmshRqNRCmJL7WLrgIykBstQys'),
(13, 1377, '28766919', '', 'sin rol', ''),
(14, 1378, '11579199', '', 'sin rol', ''),
(15, 1933, '16690255', '', 'sin rol', ''),
(16, 2265, '20082180', '', 'sin rol', ''),
(17, 2664, '13602508', '', 'sin rol', ''),
(18, 3384, '27541701', '$2a$10$wZWRtfjOyTy6BUkgGrnUce8Mb/MNAVazoOn.TBru7QYVGUCIFqgMq', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE4LCJ1c2VybmFtZSI6IjI3NTQxNzAxIiwiaWF0IjoxNjE1NzQzOTMxLCJleHAiOjE2MTU3NDQwMTd9.Byki4w0D-pbQptk73q9LQ4VjkdVe3p82gNrN2Lv-Mc0'),
(19, 3561, '43190124', '$2a$10$UyxESmBgdQO5XPj48kOcCOMfwNNPOAtdwhzoIHWP2nQw.rphxqJuu', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5LCJ1c2VybmFtZSI6IjQzMTkwMTI0IiwiaWF0IjoxNjE1NzUwNDcyLCJleHAiOjE2MTU3NTA1NTh9.YNP0voarBE26-7ouXXs15-20HWgDLHumI9y30S9fqG4'),
(20, 3622, '18138160', '', 'sin rol', ''),
(21, 3838, '37647846', '$2a$10$AkF1l5DPQEj8Elun4sRUs.MEGMYvdWx3IdL7j/sPioO1nCDbSDBg6', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxLCJ1c2VybmFtZSI6IjM3NjQ3ODQ2IiwiaWF0IjoxNjcyNzgyOTk4LCJleHAiOjE2NzI3ODMwODR9.DQ7AUrNvhyPSHTBc17WafBIQ-uUqFRJgFpI72PwWToE'),
(22, 4203, '33964408', '', 'sin rol', ''),
(23, 4505, '37315165', '$2a$10$YIbkX4hzynHApv7aNl8dne3bwdNA5Lds/gOvI1OYKIHcjHZWt6Tj6', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIzLCJ1c2VybmFtZSI6IjM3MzE1MTY1IiwiaWF0IjoxNjE1NzQ4NjI4LCJleHAiOjE2MTU3NDg3MTR9.pewbYggUrIeY7vcoJM0t5SgR2GyVI0wZV1BLMCpoKTY'),
(24, 4297, '32371713', '', 'sin rol', ''),
(25, 4347, '13272212', '', 'sin rol', ''),
(26, 4390, '33964458', '$2a$10$zZ6VXYiyWCmGda8w5.Kuye.3NRJoxjDlT7kLDujUbsOKiuqi4BB..', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI2LCJ1c2VybmFtZSI6IjMzOTY0NDU4IiwiaWF0IjoxNjE1NzQ1MzQwLCJleHAiOjE2MTU3NDU0MjZ9.0HM63L7AT7bi2OOghmWFKdzDeY2r-sMjDOHPDJ93-Xg'),
(27, 3811, '33145838', '$2a$10$0Mzh2uJlD0UzYn5M.iK9EeSnOHUVcKYhSaNlTxaKoDo2.ZxgxgK6W', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI3LCJ1c2VybmFtZSI6IjMzMTQ1ODM4IiwiaWF0IjoxNjE1NzU0NTU4LCJleHAiOjE2MTU3NTQ2NDR9.m3Tl8UPy03WnM6NDcGT1RJFYXvYGI7W9JRQzQEXWr-E'),
(28, 3618, '25019717', '$2a$10$uMDYJSWYQXiavKHSkrAf1uQZe8YhAaPhJuzQeM.X60.NcHYL4Khqy', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI4LCJ1c2VybmFtZSI6IjI1MDE5NzE3IiwiaWF0IjoxNjE1NzU0NzY4LCJleHAiOjE2MTU3NTQ4NTR9.fQ3u-G_FuqzqNS2r3DDwbucYmAis2bSGba8HPnJqSCc'),
(29, 1785, '29217952', '$2a$10$CUFsUPNIY0j9srlOGLLw4OW6axiD0hzIdX3FaKw2rmDObnUKGFF5K', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjI5LCJ1c2VybmFtZSI6IjI5MjE3OTUyIiwiaWF0IjoxNjE1NzY2MzM3LCJleHAiOjE2MTU3NjY0MjN9.9QRbErfFOtxH60nUlT7r7obZ9625DWns-ikRHyuKHx0'),
(31, 0, '40108983', '', 'fiscal', ''),
(32, 574, '16684050', '$2a$10$LQsuC/iKpXgUnzk/AAe0T.DOrb0OmoGyzMLPHt9JeTATueKq7rUwi', 'fiscal', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMyLCJ1c2VybmFtZSI6IjE2Njg0MDUwIiwiaWF0IjoxNjE1NzQ5MjYxLCJleHAiOjE2MTU3NDkzNDd9.PY7AiSHrrhHC7tAGinqJ-5XTk9ZxqA28uyIGkrxsZsg'),
(35, 4521, '363414140', '$2a$10$mB.2Gg0zOF4f2gC5LFtDLeFGzLtymy/GUEZxBXV0nPkERt1NEbpMi', 'referente', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjM1LCJ1c2VybmFtZSI6IjM2MzQxNDE0MCIsImlhdCI6MTY2OTY2MTMzNiwiZXhwIjoxNjY5NjYxNDIyfQ.J8O0GHYVVyHNcuyIM8RL_ArjgN_fw3QIb6aXbUfIX68'),
(36, 4522, '350857940', '', 'referente', ''),
(37, 4275, '31017519', '', 'referente', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
