<?php 
include "../address.php";
include $APP_ROOT.'assets/linker/db.php' ; 


//header('Content-Type: text/html; charset=utf-8');


$conn = get_mysqli_connection();

$conn->set_charset("utf8");


/*mysqli_query($conn,'SET CHARACTER SET utf8'); 


mysqli_query($conn,"SET SESSION collation_connection ='utf8_general_ci'");
*/
$sql = "update users_registration set name_bangla = 'আরফেরফ' where email='riyad298@gmail.com'";


mysqli_query($conn , $sql);


$sql = "select name_bangla from users_registration where email = 'riyad298@gmail.com'";

$result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
  }
print_r($row);

$conn->close();


