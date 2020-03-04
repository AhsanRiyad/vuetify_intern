var ages = [ { name: 'Riyad' , age: 22 } , { name: 'Ahsan' , age: 30 } ];

function checkAdult(age) {
  return age.name == 'Ahsan';
}

function myFunction() {
  console.log( ages.find(checkAdult));
}




console.log( ages.find((age)=>{
  
  return age.name == 'Ahsan';
  
  
}  ));




if( typeof ages.find((age)=>{
  
  return age.name == 'Ahsan';
  
  
}  ) ===  'object' ){
  
  console.log('yes object')
  
}else{
  
  
  console.log('not an object');
}



