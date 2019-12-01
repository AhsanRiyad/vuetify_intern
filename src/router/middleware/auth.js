export default function auth ({ next, store }){

console.log('inside middleware');
 if(!store.getters.auth.isLogin){
     return next({
        name: 'login'
     })
 }

 return next()
}