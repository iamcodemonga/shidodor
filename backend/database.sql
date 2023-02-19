CREATE SCHEMA `chidodo` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE `chidodo`.`songs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` VARCHAR(45) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `art` VARCHAR(100) NOT NULL,
  `songfile` VARCHAR(100) NOT NULL,
  `trailer` VARCHAR(100) NOT NULL,
  `album` VARCHAR(100) NOT NULL,
  `length` VARCHAR(45) NOT NULL,
  `date_created` DATETIME  NOT NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `chidodo`.`albums` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` VARCHAR(45) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `art` VARCHAR(100) NOT NULL,
  `songs` INT NULL,
  `original_date` VARCHAR(45) NULL,
  `date_created` DATETIME NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `chidodo`.`videos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `uid` VARCHAR(45) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `thumbnail` VARCHAR(100) NOT NULL,
  `videofile` VARCHAR(100) NOT NULL,
  `trailer` VARCHAR(100) NOT NULL,
  `album` VARCHAR(100) NOT NULL,
  `length` VARCHAR(45) NOT NULL,
  `date_created` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE `chidodo`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `passcode` VARCHAR(100) NOT NULL,
  `action` INT NULL,
  PRIMARY KEY (`id`));

--   CREATE TABLE `chidodo`.`donators` (
--   `id` INT NOT NULL AUTO_INCREMENT,
--   `name` VARCHAR(45) NOT NULL,
--   `email` VARCHAR(45) NOT NULL,
--   `ammount` INT NOT NULL,
--   `receipt` VARCHAR(45) NOT NULL,
--   `prop_id` VARCHAR(45) NOT NULL,
--   `date_of` DATETIME NOT NULL,
--   PRIMARY KEY (`id`))
-- ENGINE = InnoDB
-- DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE `chidodo`.`donators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(100) NOT NULL,
  `lastname` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `ammount` INT NOT NULL,
  `media` VARCHAR(45) NOT NULL,
  `propertyId` VARCHAR(45) NOT NULL,
  `reference` VARCHAR(45) NOT NULL,
  `date_of` DATE NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `chidodo`.`user` (`fullname`, `email`, `passcode`, `action`) VALUES ('chidodo', 'admin@chidodo.com', '12345', '0');