--
-- arquivo de configuração do db
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: api
--

-- --------------------------------------------------------

-- user

CREATE TABLE `funcionario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `sobrenome` varchar(250) NOT NULL,
  `cargo` varchar(30) NOT NULL,
  `data_nasc` date,
  `salario` decimal(15,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Inserindo dados na tabela `user`
--

INSERT INTO `funcionario` (`nome`, `sobrenome`, `cargo`, `data_nasc`, `salario`) VALUES
('Bruno', 'Fiorucci', 'Programador', '1995-06-28', 2000.00);

COMMIT;

