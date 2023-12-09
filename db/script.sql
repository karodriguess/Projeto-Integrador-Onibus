-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema smartpass
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smartpass
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smartpass` DEFAULT CHARACTER SET utf8mb4 ;
USE `smartpass` ;

-- -----------------------------------------------------
-- Table `smartpass`.`cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartpass`.`cliente` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `saldo` DECIMAL(8,2) NULL DEFAULT NULL,
  `cpf` CHAR(11) NULL DEFAULT NULL,
  `codCartao` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `smartpass`.`linha`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartpass`.`linha` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `origem` VARCHAR(100) NULL DEFAULT NULL,
  `destino` VARCHAR(100) NULL DEFAULT NULL,
  `horarioPartida` TIME NULL DEFAULT NULL,
  `duracao` SMALLINT(5) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `smartpass`.`motorista`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartpass`.`motorista` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL DEFAULT NULL,
  `foto` VARCHAR(250) NULL DEFAULT NULL,
  `cpf` CHAR(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `smartpass`.`onibus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartpass`.`onibus` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `placa` CHAR(7) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `smartpass`.`viagem`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartpass`.`viagem` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `linha_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `motorista_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `onibus_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `dataPartida` DATETIME NULL DEFAULT NULL,
  `dataChegada` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `linha_id` (`linha_id` ASC) ,
  INDEX `motorista_id` (`motorista_id` ASC) ,
  INDEX `onibus_id` (`onibus_id` ASC) ,
  CONSTRAINT `viagem_ibfk_1`
    FOREIGN KEY (`linha_id`)
    REFERENCES `smartpass`.`linha` (`id`),
  CONSTRAINT `viagem_ibfk_2`
    FOREIGN KEY (`motorista_id`)
    REFERENCES `smartpass`.`motorista` (`id`),
  CONSTRAINT `viagem_ibfk_3`
    FOREIGN KEY (`onibus_id`)
    REFERENCES `smartpass`.`onibus` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `smartpass`.`embarque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `smartpass`.`embarque` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cliente_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `viagem_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `tarifa` DECIMAL(8,2) NULL DEFAULT NULL,
  `horario` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `cliente_id` (`cliente_id` ASC) ,
  INDEX `viagem_id` (`viagem_id` ASC) ,
  CONSTRAINT `embarque_ibfk_1`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `smartpass`.`cliente` (`id`),
  CONSTRAINT `embarque_ibfk_2`
    FOREIGN KEY (`viagem_id`)
    REFERENCES `smartpass`.`viagem` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
