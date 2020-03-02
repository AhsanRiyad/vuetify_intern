
var array = [{ name: 'riyad' , id: 1 }];


array.findIndex((val, index)=>{
if(val.name == 'riyad'){
console.log(index);
}})