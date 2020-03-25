-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2020 at 07:52 AM
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
-- Table structure for table `users_address`
--

create or replace view users_address as 
  select 
  id,
  email , 

  present_line1,
  present_line2,
  present_district,
  `present_police_station` ,
  `present_post_office_name` ,
  `present_post_code` ,
  `present_country` ,
  `parmanent_line1` ,
  `parmanent_line2` ,
  `parmanent_police_station` ,
  `parmanent_district` ,
  `parmanent_post_office_name` ,
  `parmanent_post_code` ,
  `parmanent_country` ,
  `second_citizenship_country` 

from all_info_together;


create or replace view users_info as 
  select 
   id,
  `email` ,
  `gender` ,
  
  `nid_or_passport` ,
  `fathers_name` ,
  `mother_name` ,
  `spouse_name` ,
  `number_of_children` ,
  `profession` ,
  `designation` ,
  `institution` ,
  `blood_group` ,
  `date_of_birth` ,
  `religion` 

from all_info_together;

create or replace view users_registration as 
  select 
   id,
   `email` ,
  
  `full_name` ,
  `name_bangla` 
  `first_name` ,
  `last_name` ,
  `mobile` ,
  `institution_id` ,
  `password` ,
  `registration_date` ,
  `membership_number` 

from all_info_together;


create or replace view verification_info as 
  select 
   id,
  `email` ,
  `otp` ,
  `forgot_password_crypto`,
  `status` ,
  `email_verification_status` ,
  `change_request` ,
  `change_request_time` ,
  `type` ,
  `visibility`,
  `completeness` 
 

from all_info_together;




create or replace view user_uploads as 
  select 
   id,
 `email` ,
  `recent_photo` ,
  `old_photo` 
 

from all_info_together;







CREATE view `users_address` as (
  `email` varchar(100) DEFAULT NULL,
  `users_address_id` int(100) NOT NULL,
  `present_line1` varchar(300) DEFAULT NULL,
  `present_line2` varchar(300) DEFAULT NULL,
  `present_district` varchar(100) DEFAULT NULL,
  `present_police_station` varchar(200) DEFAULT NULL,
  `present_post_office_name` varchar(200) DEFAULT NULL,
  `present_post_code` varchar(100) DEFAULT NULL,
  `present_country` varchar(100) DEFAULT NULL,
  `parmanent_line1` varchar(300) DEFAULT NULL,
  `parmanent_line2` varchar(300) DEFAULT NULL,
  `parmanent_police_station` varchar(200) DEFAULT NULL,
  `parmanent_district` varchar(100) DEFAULT NULL,
  `parmanent_post_office_name` varchar(200) DEFAULT NULL,
  `parmanent_post_code` varchar(100) DEFAULT NULL,
  `parmanent_country` varchar(100) DEFAULT NULL,
  `second_citizenship_country` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_address`
--

INSERT INTO `users_address` (`email`, `users_address_id`, `present_line1`, `present_line2`, `present_district`, `present_police_station`, `present_post_office_name`, `present_post_code`, `present_country`, `parmanent_line1`, `parmanent_line2`, `parmanent_police_station`, `parmanent_district`, `parmanent_post_office_name`, `parmanent_post_code`, `parmanent_country`, `second_citizenship_country`) VALUES
('riyad298@gmail.com', 1, 'riyad298@gmail.c', NULL, 'Kurigram', '560000', 'Tograinah', '5600', 'Bangladesh', 'Sarker Bari', NULL, 'arfaerfaerfaerarfe', 'Dhaka', 'afreferf', '3900', 'Bangladesh', 'frence'),
('ahsan.riyad@outlook.com', 2, 'Arrf', NULL, 'Kurigram', NULL, NULL, '3200', NULL, NULL, NULL, NULL, NULL, NULL, '3200', 'Bangladesh', NULL),
('riyad298@yahoo.com', 3, 'arfaerferf', NULL, 'arferfer', '0', 'Tograihat', '5600', 'arfarfe ref er', 'aerfearfe', NULL, 'kurigram', 'arferferf', NULL, '111546', 'arfefaerfafaerf', NULL),
('riyad298@hotmail.com', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('rimo@gmail.com', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('abcd@abcd.com', 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users_address`
--
ALTER TABLE `users_address`
  ADD PRIMARY KEY (`users_address_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users_address`
--
ALTER TABLE `users_address`
  MODIFY `users_address_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
