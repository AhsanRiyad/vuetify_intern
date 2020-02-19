-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 19, 2020 at 08:32 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `intern_project`
--

-- --------------------------------------------------------

--
-- Structure for view `all_info_together`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `all_info_together`  AS  select `ur`.`full_name` AS `full_name`,`ur`.`first_name` AS `first_name`,`ur`.`last_name` AS `last_name`,`ur`.`name_bangla` AS `name_bangla`,`ur`.`mobile` AS `mobile`,`ur`.`institution_id` AS `institution_id`,`ur`.`password` AS `password`,`ur`.`registration_date` AS `registration_date`,`ur`.`membership_number` AS `membership_number`,`ui`.`gender` AS `gender`,`ui`.`nid_or_passport` AS `nid_or_passport`,`ui`.`fathers_name` AS `fathers_name`,`ui`.`mother_name` AS `mother_name`,`ui`.`spouse_name` AS `spouse_name`,`ui`.`number_of_children` AS `number_of_children`,`ui`.`profession` AS `profession`,`ui`.`designation` AS `designation`,`ui`.`institution` AS `institution`,`ui`.`blood_group` AS `blood_group`,`ui`.`religion` AS `religion`,`ui`.`date_of_birth` AS `date_of_birth`,`vi`.`id_v_info` AS `id_v_info`,`vi`.`otp` AS `otp`,`vi`.`forgot_password_crypto` AS `forgot_password_crypto`,`vi`.`status` AS `status`,`vi`.`email_verification_status` AS `email_verification_status`,`vi`.`change_request` AS `change_request`,`vi`.`change_request_time` AS `change_request_time`,`vi`.`type` AS `type`,`vi`.`visibility` AS `visibility`,`vi`.`completeness` AS `completeness`,`vi`.`last_verified_info` AS `last_verified_info`,`ur`.`id` AS `id`,`uu`.`recent_photo` AS `recent_photo`,`uu`.`old_photo` AS `old_photo`,`ur`.`email` AS `ur_email`,`vi`.`email` AS `vi_email`,`uu`.`email` AS `uu_email`,`ui`.`email` AS `ui_email`,`ua`.`email` AS `email`,`ua`.`users_address_id` AS `users_address_id`,`ua`.`present_line1` AS `present_line1`,`ua`.`present_line2` AS `present_line2`,`ua`.`present_police_station` AS `present_police_station`,`ua`.`present_district` AS `present_district`,`ua`.`present_post_code` AS `present_post_code`,`ua`.`present_post_office_name` AS `present_post_office_name`,`ua`.`present_country` AS `present_country`,`ua`.`parmanent_line1` AS `parmanent_line1`,`ua`.`parmanent_line2` AS `parmanent_line2`,`ua`.`parmanent_police_station` AS `parmanent_police_station`,`ua`.`parmanent_district` AS `parmanent_district`,`ua`.`parmanent_post_code` AS `parmanent_post_code`,`ua`.`parmanent_post_office_name` AS `parmanent_post_office_name`,`ua`.`parmanent_country` AS `parmanent_country` ,`ua`.`second_citizenship_country` AS `second_citizenship_country` from ((((`users_registration` `ur` join `users_info` `ui`) join `users_address` `ua`) join `verification_info` `vi`) join `user_uploads` `uu`) where `uu`.`email` = `ur`.`email` and `ui`.`email` = `ur`.`email` and `ua`.`email` = `ur`.`email` and `vi`.`email` = `ur`.`email` ;

--
-- VIEW  `all_info_together`
-- Data: None
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
