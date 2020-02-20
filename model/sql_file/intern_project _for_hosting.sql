-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2020 at 01:57 PM
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

DELIMITER $$
--
-- Procedures
--
CREATE  PROCEDURE `count_request` (OUT `verification_request1` VARCHAR(100), OUT `change_request1` VARCHAR(100))  BEGIN
       
select count(*) into verification_request1 from all_info_together ai where   email_verification_status = 'verified' and status = 'not_verified' and ai.completeness = 100;
           
select count(*) into change_request1 from all_info_together ai where  status = 'approved' and change_request = 'requested' and type = 'user';

  
            
END$$

CREATE  PROCEDURE `current_photo` (IN `upload_link` VARCHAR(500), IN `email1` VARCHAR(100), OUT `existing_link` VARCHAR(500))  BEGIN


Select recent_photo into existing_link from user_uploads where email = email1 ;


if existing_link = NULL
then 

set existing_link = 'not_set' ; 

end if;


update user_uploads set recent_photo = upload_link where email = email1 ; 



END$$

CREATE  PROCEDURE `email_verification_otp` (IN `email1` VARCHAR(100), IN `otp1` VARCHAR(100), IN `purpose` VARCHAR(100), OUT `result` VARCHAR(100))  BEGIN

DECLARE count int(5);

if purpose = 'verify_email_otp'
then
select count(*) into count from verification_info where email = email1 and otp = otp1  ; 

if count >0 
then
update verification_info set email_verification_status = 'verified' where email = email1 ; 
set result = 'email_verified' ; 
else
set result = 'invalid_otp';
end if ;

elseif purpose = 'send_otp'
then

update verification_info set otp = otp1 where email = email1 ;

set result = 'otp_sent';

end if;




END$$

CREATE  PROCEDURE `login` (IN `email1` VARCHAR(500), IN `password1` VARCHAR(100), OUT `result` VARCHAR(500))  BEGIN

DECLARE i int(3);
DECLARE type1 varchar(100);

select count(*) into i from users_registration where email = email1 and password = password1;


if i < 1 
then
set result = 'NO' ; 
else
SELECT type into type1 FROM verification_info vi WHERE vi.email = email1;

IF type1 = 'user'
THEN
set result = 'YES_USER' ;
ELSEIF type1 = 'admin'
THEN
SET result = 'YES_ADMIN';
END IF;

end if;


END$$

CREATE  PROCEDURE `old_photo` (IN `upload_link` VARCHAR(500), IN `email1` VARCHAR(100), OUT `existing_link` VARCHAR(500))  BEGIN


Select old_photo into existing_link from user_uploads where email = email1 ;


if existing_link = NULL
then 

set existing_link = 'not_set' ; 

end if;


update user_uploads set old_photo = upload_link where email = email1 ; 



END$$

CREATE  PROCEDURE `REGISTRATION` (IN `email1` VARCHAR(100), IN `first_name1` VARCHAR(100), IN `last_name1` VARCHAR(100), IN `mobile1` VARCHAR(20), IN `institution_id1` VARCHAR(100), IN `password1` VARCHAR(100), IN `otp1` VARCHAR(100), IN `who_is_doing_registration` VARCHAR(100), OUT `result` VARCHAR(100))  BEGIN

DECLARE UID INT(3); 
DECLARE mem_number int(10);
SET UID = 0 ;
SELECT COUNT(*) INTO UID FROM users_registration  WHERE EMAIL=lower(email1) ;   

SELECT UID;

IF UID>0
THEN 

SET result="NO";

ELSE 

INSERT INTO users_registration (email,first_name,last_name,mobile,institution_id,password,registration_date,membership_number) VALUES (email1,first_name1,last_name1, mobile1,institution_id1,password1,NOW(), 1000);

INSERT INTO verification_info (email,otp,status,type,visibility,completeness) VALUES (email1, otp1,'not_verified', 'user', 'full_name,institution_id,membership_number' , 60);

INSERT INTO users_info (email) VALUES (email1);
INSERT INTO users_address (email) VALUES (email1);
INSERT INTO user_uploads (email , recent_photo , old_photo) VALUES (email1 , 'not_set' , 'not_set');



if who_is_doing_registration = 'admin'
THEN

select max(ai.membership_number) into mem_number from all_info_together ai ;

UPDATE all_info_together ai set ai.membership_number = mem_number + 1 where ai.email = email1;

UPDATE all_info_together ai set STATUS = 'approved' where ai.email = email1;

end IF;


SET result="YES";



END IF ;


END$$

CREATE  PROCEDURE `update_profile_address` (IN `id1` INT(100), IN `last_verified_info1` VARCHAR(1000), IN `present_line11` VARCHAR(100), IN `present_district1` VARCHAR(100), IN `present_post_code1` INT(100), IN `present_country1` VARCHAR(200), IN `permanent_line11` VARCHAR(100), IN `permanent_district1` VARCHAR(100), IN `permanent_post_code1` INT(100), IN `permanent_country1` VARCHAR(200), IN `permanent_post_office_name1` VARCHAR(200), IN `permanent_police_station1` VARCHAR(100), IN `present_post_office_name1` VARCHAR(100), IN `present_police_station1` INT(100), IN `second_citizenship_country1` VARCHAR(200), OUT `result` VARCHAR(100))  BEGIN
DECLARE count int(5);

DECLARE verification_status varchar(100);
DECLARE change_req_status varchar(100);
DECLARE user_type varchar(100);



select status into verification_status from all_info_together where id = id1;
select change_request into change_req_status from all_info_together where id = id1;
select type into user_type from all_info_together where id = id1;


update all_info_together set  present_line1 = present_line11, present_district = present_district1, present_post_code = present_post_code1 , present_country = present_country1 , parmanent_line1 = permanent_line11 , parmanent_district = permanent_district1, parmanent_post_code = permanent_post_code1 , parmanent_country = permanent_country1, parmanent_post_office_name = permanent_post_office_name1, parmanent_police_station=permanent_police_station1, present_post_office_name=present_post_office_name1, present_police_station=present_police_station1, second_citizenship_country=second_citizenship_country1 where id = id1 ;



IF verification_status = 'approved' and user_type !='admin'
THEN

if change_req_status = 'not_requested' OR change_req_status = 'approved'
then

UPDATE all_info_together set change_request = 'requested' , last_verified_info = last_verified_info1 , all_info_together.change_request_time = NOW() WHERE id = id1;
ELSE
UPDATE all_info_together set change_request = 'requested' , all_info_together.change_request_time = NOW() WHERE id = id1;
end IF;
end IF;



set result = 'success' ;


END$$

CREATE  PROCEDURE `update_profile_basic` (IN `id1` INT(100), IN `last_verified_info1` VARCHAR(1000), IN `first_name1` VARCHAR(100), IN `last_name1` VARCHAR(100), IN `name_bangla1` VARCHAR(200) CHARSET utf8, IN `mobile1` VARCHAR(100), IN `institution_id1` VARCHAR(100), IN `blood_group1` VARCHAR(100), IN `religion1` VARCHAR(100), IN `nid_or_passport1` VARCHAR(200), IN `dob1` VARCHAR(200), OUT `result` VARCHAR(100))  BEGIN

DECLARE count int(5);


DECLARE verification_status varchar(100);
DECLARE change_req_status varchar(100);
DECLARE user_type varchar(100);


select status into verification_status from all_info_together where id = id1;
select change_request into change_req_status from all_info_together where id = id1;
select type into user_type from all_info_together where id = id1;


update all_info_together set  nid_or_passport = nid_or_passport1, date_of_birth = dob1 , blood_group = blood_group1, religion = religion1 where id = id1 ;

update all_info_together set first_name = first_name1 , last_name = last_name1 , name_bangla = name_bangla1 , mobile = mobile1 , institution_id = institution_id1  where id = id1 ;



IF verification_status = 'approved' and user_type !='admin'
THEN

if change_req_status = 'not_requested' OR change_req_status = 'approved'
then

UPDATE all_info_together set change_request = 'requested' , last_verified_info = last_verified_info1 , all_info_together.change_request_time = NOW() WHERE id = id1;
ELSE
UPDATE all_info_together set change_request = 'requested' , all_info_together.change_request_time = NOW() WHERE id = id1;
end IF;
end IF;

set result = 'success' ;

END$$

CREATE  PROCEDURE `update_profile_email` (IN `id1` VARCHAR(100), IN `email1` VARCHAR(100), IN `email2` VARCHAR(100), IN `otp1` VARCHAR(100), OUT `result` VARCHAR(100))  BEGIN

DECLARE count int(5);

select COUNT(*) into count from verification_info WHERE email = email1 and otp = otp1;

if count = 0
THEN
set result = 'invalid_otp';
else 

UPDATE verification_info SET email_verification_status = 'verified' WHERE email = email1;

UPDATE users_address set email = email2 WHERE email = email1;
UPDATE users_info set email = email2 WHERE email = email1;
UPDATE users_registration set email = email2 WHERE email = email1;
UPDATE user_photos set email = email2 WHERE email = email1;
UPDATE user_uploads set email = email2 WHERE email = email1;
UPDATE verification_info set email = email2 WHERE email = email1;

set result = 'success';

END IF;

if otp1 = 'change_email_for_admin'
THEN
select COUNT(*) into count from all_info_together ai where ai.email = email1;

if count = 0
THEN
UPDATE users_address set email = email2 WHERE email = email1;
UPDATE users_info set email = email2 WHERE email = email1;
UPDATE users_registration set email = email2 WHERE email = email1;
UPDATE user_photos set email = email2 WHERE email = email1;
UPDATE user_uploads set email = email2 WHERE email = email1;
UPDATE verification_info set email = email2 WHERE email = email1;

set result = 'email_updated';

else
set result = 'email_already_used';

END IF;

END IF;

END$$

CREATE  PROCEDURE `update_profile_forgot_password` (IN `email1` VARCHAR(100), IN `forgot_password_crypto1` VARCHAR(500), IN `purpose` VARCHAR(100), OUT `result` VARCHAR(100))  BEGIN

DECLARE count int(5);

if purpose = 'generate_crypto'
then
select count(*) into count from all_info_together where email = email1 ; 

if count >0 
then
update all_info_together set forgot_password_crypto = forgot_password_crypto1 where email = email1 ; 
set result = 'crypto_added' ; 
else
set result = 'no_email_found';
end if ;

elseif purpose = 'crypto_check'
then
select count(*) into count from all_info_together where email = email1 and forgot_password_crypto = forgot_password_crypto1 ;
if count > 0
then
set result = 'allow';
else
set result = 'invalid_link';
end if;

end if;





END$$

CREATE  PROCEDURE `update_profile_password` (IN `id1` VARCHAR(100), IN `password1` VARCHAR(500), OUT `result` VARCHAR(100))  BEGIN

DECLARE count int(5);


update all_info_together set password = password1 where id = id1 ;


set result = 'success' ;

END$$

CREATE  PROCEDURE `update_profile_personal` (IN `id1` VARCHAR(100), IN `last_verified_info1` VARCHAR(1000), IN `fathers_name1` VARCHAR(100), IN `mothers_name1` VARCHAR(100), IN `spouse_name1` VARCHAR(100), IN `number_of_children1` INT(100), IN `profession1` VARCHAR(100), IN `workplace_or_institution1` VARCHAR(200), IN `designation1` VARCHAR(200), OUT `result` VARCHAR(100))  BEGIN

DECLARE count int(5);

DECLARE verification_status varchar(100);
DECLARE change_req_status varchar(100);
DECLARE user_type varchar(100);

select status into verification_status from all_info_together where id = id1;
select change_request into change_req_status from all_info_together where id = id1;
select type into user_type FROM all_info_together WHERE id = id1;


update all_info_together set  fathers_name = fathers_name1, mother_name = mothers_name1 , spouse_name = spouse_name1, number_of_children = number_of_children1 , profession = profession1 , institution = workplace_or_institution1 , designation = designation1 where id = id1 ;


IF verification_status = 'approved' and user_type !='admin'
THEN

if change_req_status = 'not_requested' OR change_req_status = 'approved'
then

UPDATE all_info_together set change_request = 'requested' , last_verified_info = last_verified_info1 , all_info_together.change_request_time = NOW() WHERE id = id1;
ELSE
UPDATE all_info_together set change_request = 'requested' , all_info_together.change_request_time = NOW() WHERE id = id1;
end IF;
end IF;




set result = 'success' ;

END$$

CREATE  PROCEDURE `upload_photo` (IN `purpose` VARCHAR(100), IN `upload_link` VARCHAR(500), IN `email1` VARCHAR(100), IN `id1` INT(100), OUT `existing_link` VARCHAR(500), OUT `result` VARCHAR(100))  BEGIN


if purpose = 'recent_photo'
then
Select recent_photo into existing_link from all_info_together where email = email1 ;
update all_info_together set recent_photo = upload_link where id = id1 ;


ELSEIF purpose = 'old_photo'
then
select old_photo into existing_link from all_info_together ai where ai.id = id1;
update all_info_together set old_photo = upload_link where email = email1;
elseif purpose = 'group_photo'
then
insert into user_photos (email , group_photo) values (email1 , upload_link); 
end if;

SET result = 'success';


END$$

CREATE  PROCEDURE `user_request` (IN `id1` INT(100), OUT `result` VARCHAR(100))  BEGIN
DECLARE count , mem_num int(5);

select ai.membership_number into mem_num from all_info_together ai WHERE ai.id = id1;

UPDATE all_info_together ai SET ai.status ='approved' , ai.completeness = 100   WHERE id = id1 ;

if mem_num = 1000
THEN

SELECT max(membership_number) into count from all_info_together ;
-- SELECT COUNT(*) int count FROM verification_info WHERE status = 'approved' ; 

UPDATE all_info_together ai SET ai.membership_number = count+1   WHERE id = id1 ;

END IF;


END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `admin_options`
--

CREATE TABLE `admin_options` (
  `admin_options_id` int(100) NOT NULL,
  `institution_id_label` varchar(100) NOT NULL DEFAULT 'Institution Id'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin_options`
--

INSERT INTO `admin_options` (`admin_options_id`, `institution_id_label`) VALUES
(1, 'College ID');

-- --------------------------------------------------------

--
-- Stand-in structure for view `all_info_together`
-- (See below for the actual view)
--
CREATE TABLE `all_info_together` (
`full_name` varchar(201)
,`first_name` varchar(100)
,`last_name` varchar(100)
,`name_bangla` varchar(200)
,`mobile` varchar(20)
,`institution_id` varchar(100)
,`password` varchar(500)
,`registration_date` datetime(6)
,`membership_number` int(255)
,`gender` varchar(100)
,`nid_or_passport` varchar(100)
,`fathers_name` varchar(100)
,`mother_name` varchar(100)
,`spouse_name` varchar(100)
,`number_of_children` int(100)
,`profession` varchar(100)
,`designation` varchar(100)
,`institution` varchar(100)
,`blood_group` varchar(10)
,`religion` varchar(200)
,`date_of_birth` date
,`id_v_info` int(100)
,`otp` varchar(100)
,`forgot_password_crypto` varchar(500)
,`status` varchar(20)
,`email_verification_status` varchar(100)
,`change_request` varchar(100)
,`change_request_time` datetime(6)
,`type` varchar(20)
,`visibility` varchar(1000)
,`completeness` int(10)
,`last_verified_info` varchar(5000)
,`id` int(100)
,`recent_photo` varchar(400)
,`old_photo` varchar(400)
,`ur_email` varchar(100)
,`vi_email` varchar(100)
,`uu_email` varchar(100)
,`ui_email` varchar(100)
,`email` varchar(100)
,`users_address_id` int(100)
,`present_line1` varchar(300)
,`present_line2` varchar(300)
,`present_police_station` varchar(200)
,`present_district` varchar(100)
,`present_post_code` varchar(100)
,`present_post_office_name` varchar(200)
,`present_country` varchar(100)
,`parmanent_line1` varchar(300)
,`parmanent_line2` varchar(300)
,`parmanent_police_station` varchar(200)
,`parmanent_district` varchar(100)
,`parmanent_post_code` varchar(100)
,`parmanent_post_office_name` varchar(200)
,`parmanent_country` varchar(100)
,`second_citizenship_country` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `childrens_info`
--

CREATE TABLE `childrens_info` (
  `id_chi` int(200) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `no` varchar(200) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `gender` varchar(200) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `form_fields_rule`
--

CREATE TABLE `form_fields_rule` (
  `id_form_field` int(200) NOT NULL,
  `field_name` varchar(200) DEFAULT NULL,
  `rule` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `form_fields_rule`
--

INSERT INTO `form_fields_rule` (`id_form_field`, `field_name`, `rule`) VALUES
(20, 'nid_or_passport_validity', 'mandatory'),
(21, 'blood_group_validity', 'optional'),
(22, 'religion_validity', 'mandatory'),
(23, 'date_of_birth_validity', 'mandatory'),
(24, 'fathers_name_validity', 'mandatory'),
(25, 'spouses_name_validity', 'mandatory'),
(26, 'number_of_children_validity', 'mandatory'),
(27, 'profession_validity', 'mandatory'),
(28, 'workplace_or_institution_validity', 'optional'),
(30, 'profession_validity', 'mandatory'),
(31, 'designation_validity', 'mandatory');

-- --------------------------------------------------------

--
-- Table structure for table `log_table`
--

CREATE TABLE `log_table` (
  `log_id` int(255) NOT NULL,
  `user` varchar(100) DEFAULT NULL,
  `log_info` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `social_network`
--

CREATE TABLE `social_network` (
  `id_sn` int(200) NOT NULL,
  `media_name` varchar(200) DEFAULT NULL,
  `profile_name` varchar(200) DEFAULT NULL,
  `profile_link` varchar(500) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users_address`
--

CREATE TABLE `users_address` (
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
('riyad298@gmail.com', 1, 'House: 04, Bazar Road', NULL, 'Kurigram', '560000', 'Tograinah', '5600', 'Bangladesh', 'Sarker Bari', NULL, 'arfaerfaerfaerarfe', 'Dhaka', 'afreferf', '3900', 'Bangladesh', 'frence'),
('ahsan.riyad@outlook.com', 2, NULL, NULL, NULL, NULL, NULL, '3200', NULL, NULL, NULL, NULL, NULL, NULL, '3200', 'Bangladesh', NULL),
('riyad298@yahoo.com', 3, 'arfaerferf', NULL, 'arferfer', '0', 'Tograihat', '5600', 'arfarfe ref er', 'aerfearfe', NULL, 'kurigram', 'arferferf', NULL, '111546', 'arfefaerfafaerf', NULL),
('riyad298@hotmail.com', 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('rimo@gmail.com', 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('abcd@abcd.com', 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_info`
--

CREATE TABLE `users_info` (
  `email` varchar(100) DEFAULT NULL,
  `gender` varchar(100) DEFAULT NULL,
  `ui_id` int(100) NOT NULL,
  `nid_or_passport` varchar(100) DEFAULT NULL,
  `fathers_name` varchar(100) DEFAULT NULL,
  `mother_name` varchar(100) DEFAULT NULL,
  `spouse_name` varchar(100) DEFAULT NULL,
  `number_of_children` int(100) DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `institution` varchar(100) DEFAULT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `religion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_info`
--

INSERT INTO `users_info` (`email`, `gender`, `ui_id`, `nid_or_passport`, `fathers_name`, `mother_name`, `spouse_name`, `number_of_children`, `profession`, `designation`, `institution`, `blood_group`, `date_of_birth`, `religion`) VALUES
('riyad298@gmail.com', NULL, 0, '12548756', 'Barkat Alam Siddiki', 'Urmee', 'Maliha', 2, 'Student stgstrg afre', 'Student', 'Ame', 'A-', '1971-05-28', 'Islam'),
('ahsan.riyad@outlook.com', NULL, 0, '454655656646465', 'Barkat Alam', 'Urmee Kabir', NULL, NULL, NULL, NULL, NULL, NULL, '2020-02-13', NULL),
('riyad298@yahoo.com', NULL, 0, '55555555577', 'Romel agartg', 'Urmee Sultana', 'aferfaef rafer', 5, 'arfafrafeaf', 'afferfaref', 'arfefearffrae arferf', 'A-', '1992-11-01', NULL),
('riyad298@hotmail.com', NULL, 0, '01919448787', 'Romel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2019-09-16', NULL),
('rimo@gmail.com', NULL, 0, '12333665544888', 'Romel', 'Urmee Kabir', 'Romel', NULL, 'Student', NULL, NULL, NULL, NULL, NULL),
('abcd@abcd.com', NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users_registration`
--

CREATE TABLE `users_registration` (
  `email` varchar(100) DEFAULT NULL,
  `id` int(100) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `name_bangla` varchar(200) CHARACTER SET utf8 NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `institution_id` varchar(100) DEFAULT NULL,
  `password` varchar(500) DEFAULT NULL,
  `registration_date` datetime(6) DEFAULT NULL,
  `membership_number` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users_registration`
--

INSERT INTO `users_registration` (`email`, `id`, `full_name`, `name_bangla`, `first_name`, `last_name`, `mobile`, `institution_id`, `password`, `registration_date`, `membership_number`) VALUES
('riyad298@gmail.com', 1, 'Ahsan Riyad', 'মোঃ এহসান ফেরদৌস রিয়াদ', 'Riyad', 'Ahsan', '01919448787', 'riyad ahsan are ', '29cf2160ad1165db8dacdfd2eedcf5d0', '2019-11-27 10:15:15.000000', 1001),
('ahsan.riyad@outlook.com', 2, 'Md Ahsan Ferdous Riyad', '', NULL, NULL, '01919448787', 'riyad', '29cf2160ad1165db8dacdfd2eedcf5d0', '2019-11-29 02:22:46.000000', 1002),
('riyad298@yahoo.com', 3, 'Ahsan Ferdous', '', 'Riyad', 'Ahsan', '017192246822', '15-2804-2oioo', '29cf2160ad1165db8dacdfd2eedcf5d0', '2019-11-29 13:59:10.000000', 1003),
('riyad298@hotmail.com', 4, 'Md Ahsan Ferdous Riyad', '', NULL, NULL, '01919448787', 'riyad', '29cf2160ad1165db8dacdfd2eedcf5d0', '2019-11-29 19:52:40.000000', 1004),
('rimo@gmail.com', 5, 'rimo shahriar munem', '', NULL, NULL, '01919448787', 'afrerafarefaerarfaerf', '947a084ae67a0e57e0bf46a0d505e747', '2019-11-30 23:16:02.000000', 1005),
('abcd@abcd.com', 6, NULL, '', 'Ahsan', 'Riyad', '01719246822', '1566565', '29cf2160ad1165db8dacdfd2eedcf5d0', '2020-02-19 12:39:20.000000', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `user_photos`
--

CREATE TABLE `user_photos` (
  `group_photo` varchar(400) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `id_user_photos` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_photos`
--

INSERT INTO `user_photos` (`group_photo`, `email`, `id_user_photos`) VALUES
('3_1.jpg', 'riyad298@yahoo.com', 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_uploads`
--

CREATE TABLE `user_uploads` (
  `id_user_uploads` int(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `recent_photo` varchar(400) DEFAULT NULL,
  `old_photo` varchar(400) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_uploads`
--

INSERT INTO `user_uploads` (`id_user_uploads`, `email`, `recent_photo`, `old_photo`) VALUES
(1, 'riyad298@gmail.com', '1_42.png', '1_57.png'),
(2, 'ahsan.riyad@outlook.com', '2.jpg', 'not_set'),
(3, 'riyad298@yahoo.com', '3.jpg', 'not_set'),
(4, 'riyad298@hotmail.com', 'not_set', 'not_set'),
(5, 'rimo@gmail.com', 'not_set', 'not_set'),
(6, 'abcd@abcd.com', 'not_set', 'not_set');

-- --------------------------------------------------------

--
-- Table structure for table `verification_info`
--

CREATE TABLE `verification_info` (
  `id_v_info` int(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `otp` varchar(100) DEFAULT NULL,
  `forgot_password_crypto` varchar(500) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `email_verification_status` varchar(100) DEFAULT 'not_verified',
  `change_request` varchar(100) NOT NULL DEFAULT 'not_requested',
  `change_request_time` datetime(6) DEFAULT NULL,
  `type` varchar(20) DEFAULT NULL,
  `visibility` varchar(1000) DEFAULT NULL,
  `completeness` int(10) DEFAULT NULL,
  `last_verified_info` varchar(5000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `verification_info`
--

INSERT INTO `verification_info` (`id_v_info`, `email`, `otp`, `forgot_password_crypto`, `status`, `email_verification_status`, `change_request`, `change_request_time`, `type`, `visibility`, `completeness`, `last_verified_info`) VALUES
(1, 'riyad298@gmail.com', '3038', 'ac627ab1ccbdb62ec96e702f07f6425b', 'approved', 'verified', 'rejected', '2019-11-29 01:45:23.000000', 'admin', 'full_name,email,mobile,institution_id,mother_name,spouse_name,profession,institution,present_district,membership_number,status,email_verification_status,change_request', 100, '\r\n'),
(2, 'ahsan.riyad@outlook.com', '4982', NULL, 'approved', 'not_verified', 'not_requested', NULL, 'user', 'full_name,institution_id,membership_number', 100, NULL),
(3, 'riyad298@yahoo.com', '8456', NULL, 'rejected', 'verified', 'approved', '2020-02-19 19:09:50.000000', 'user', 'full_name,institution_id,membership_number', 80, 'first_name,last_name,mobile,institution_id,nid_or_passport,fathers_name,mother_name,spouse_name,number_of_children,profession,designation,institution,blood_group,religion,date_of_birth,present_line1,present_district,present_police_station,present_post_code,present_post_office_name,present_country,parmanent_line1,parmanent_police_station,parmanent_district,parmanent_post_code,parmanent_post_office_name,parmanent_country,second_citizenship_country@#$Riyad,Ahsan,017192246822,15-2804-2oioo,55555555577,Romel agartg,Urmee Sultana,aferfaef rafer,5,arfafrafeaf,afferfaref,arfefearffrae arferf,A-,,1992-11-01,arfaerferf,arferfer,0,5600,Tograihat,arfarfe ref er,aerfearfe,,arferferf,111546,,arfefaerfafaerf,'),
(4, 'riyad298@hotmail.com', '2591', NULL, 'approved', 'not_verified', 'not_requested', NULL, 'admin', 'full_name,institution_id,membership_number', 100, NULL),
(5, 'rimo@gmail.com', '7680', NULL, 'approved', 'verified', 'not_requested', NULL, 'user', 'full_name,institution_id,membership_number', 100, NULL),
(6, 'abcd@abcd.com', '6177', NULL, 'not_verified', 'not_verified', 'not_requested', NULL, 'user', 'full_name,institution_id,membership_number', 60, NULL);

-- --------------------------------------------------------

--
-- Structure for view `all_info_together`
--
DROP TABLE IF EXISTS `all_info_together`;

CREATE ALGORITHM=UNDEFINED  SQL SECURITY DEFINER VIEW `all_info_together`  AS  select concat(`ur`.`first_name`,' ',`ur`.`last_name`) AS `full_name`,`ur`.`first_name` AS `first_name`,`ur`.`last_name` AS `last_name`,`ur`.`name_bangla` AS `name_bangla`,`ur`.`mobile` AS `mobile`,`ur`.`institution_id` AS `institution_id`,`ur`.`password` AS `password`,`ur`.`registration_date` AS `registration_date`,`ur`.`membership_number` AS `membership_number`,`ui`.`gender` AS `gender`,`ui`.`nid_or_passport` AS `nid_or_passport`,`ui`.`fathers_name` AS `fathers_name`,`ui`.`mother_name` AS `mother_name`,`ui`.`spouse_name` AS `spouse_name`,`ui`.`number_of_children` AS `number_of_children`,`ui`.`profession` AS `profession`,`ui`.`designation` AS `designation`,`ui`.`institution` AS `institution`,`ui`.`blood_group` AS `blood_group`,`ui`.`religion` AS `religion`,`ui`.`date_of_birth` AS `date_of_birth`,`vi`.`id_v_info` AS `id_v_info`,`vi`.`otp` AS `otp`,`vi`.`forgot_password_crypto` AS `forgot_password_crypto`,`vi`.`status` AS `status`,`vi`.`email_verification_status` AS `email_verification_status`,`vi`.`change_request` AS `change_request`,`vi`.`change_request_time` AS `change_request_time`,`vi`.`type` AS `type`,`vi`.`visibility` AS `visibility`,`vi`.`completeness` AS `completeness`,`vi`.`last_verified_info` AS `last_verified_info`,`ur`.`id` AS `id`,`uu`.`recent_photo` AS `recent_photo`,`uu`.`old_photo` AS `old_photo`,`ur`.`email` AS `ur_email`,`vi`.`email` AS `vi_email`,`uu`.`email` AS `uu_email`,`ui`.`email` AS `ui_email`,`ua`.`email` AS `email`,`ua`.`users_address_id` AS `users_address_id`,`ua`.`present_line1` AS `present_line1`,`ua`.`present_line2` AS `present_line2`,`ua`.`present_police_station` AS `present_police_station`,`ua`.`present_district` AS `present_district`,`ua`.`present_post_code` AS `present_post_code`,`ua`.`present_post_office_name` AS `present_post_office_name`,`ua`.`present_country` AS `present_country`,`ua`.`parmanent_line1` AS `parmanent_line1`,`ua`.`parmanent_line2` AS `parmanent_line2`,`ua`.`parmanent_police_station` AS `parmanent_police_station`,`ua`.`parmanent_district` AS `parmanent_district`,`ua`.`parmanent_post_code` AS `parmanent_post_code`,`ua`.`parmanent_post_office_name` AS `parmanent_post_office_name`,`ua`.`parmanent_country` AS `parmanent_country`,`ua`.`second_citizenship_country` AS `second_citizenship_country` from ((((`users_registration` `ur` join `users_info` `ui`) join `users_address` `ua`) join `verification_info` `vi`) join `user_uploads` `uu`) where `uu`.`email` = `ur`.`email` and `ui`.`email` = `ur`.`email` and `ua`.`email` = `ur`.`email` and `vi`.`email` = `ur`.`email` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_options`
--
ALTER TABLE `admin_options`
  ADD PRIMARY KEY (`admin_options_id`);

--
-- Indexes for table `childrens_info`
--
ALTER TABLE `childrens_info`
  ADD PRIMARY KEY (`id_chi`);

--
-- Indexes for table `form_fields_rule`
--
ALTER TABLE `form_fields_rule`
  ADD PRIMARY KEY (`id_form_field`);

--
-- Indexes for table `log_table`
--
ALTER TABLE `log_table`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `social_network`
--
ALTER TABLE `social_network`
  ADD PRIMARY KEY (`id_sn`);

--
-- Indexes for table `users_address`
--
ALTER TABLE `users_address`
  ADD PRIMARY KEY (`users_address_id`);

--
-- Indexes for table `users_registration`
--
ALTER TABLE `users_registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_photos`
--
ALTER TABLE `user_photos`
  ADD PRIMARY KEY (`id_user_photos`);

--
-- Indexes for table `user_uploads`
--
ALTER TABLE `user_uploads`
  ADD PRIMARY KEY (`id_user_uploads`);

--
-- Indexes for table `verification_info`
--
ALTER TABLE `verification_info`
  ADD PRIMARY KEY (`id_v_info`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_options`
--
ALTER TABLE `admin_options`
  MODIFY `admin_options_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `childrens_info`
--
ALTER TABLE `childrens_info`
  MODIFY `id_chi` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `form_fields_rule`
--
ALTER TABLE `form_fields_rule`
  MODIFY `id_form_field` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `log_table`
--
ALTER TABLE `log_table`
  MODIFY `log_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `social_network`
--
ALTER TABLE `social_network`
  MODIFY `id_sn` int(200) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_address`
--
ALTER TABLE `users_address`
  MODIFY `users_address_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users_registration`
--
ALTER TABLE `users_registration`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_photos`
--
ALTER TABLE `user_photos`
  MODIFY `id_user_photos` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_uploads`
--
ALTER TABLE `user_uploads`
  MODIFY `id_user_uploads` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `verification_info`
--
ALTER TABLE `verification_info`
  MODIFY `id_v_info` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
