# intern_project_final_babe

## Project setup
```
npm install
```


## If not works then
```
npm ci
```


### Compiles and hot-reloads for development
```
npm run serve
```


### Compiles and hot-reloads for development in a specific port
```
npm run serve -- --port 3000
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Server Side
```
in the model->address.php

edit
-> rootAdress, rootAdressDomain
-> database info

in the model->model->email_config.php

edit
email configuration info

```

### barryvdh/laravel-dompdf
```
a laravel pdf reader has been used here.

documentation: 
https://github.com/barryvdh/laravel-dompdf

in laravel CLI:

php artisan vendor:publish --provider="Barryvdh\DomPDF\ServiceProvider"


```

### Client Side Vuejs
```
in the src->store->store.js

edit
-> rootAdress as domain name

```


### Vuejs : lodash has been used
```
for array and object manipulation lodash library has been used.

most popular command: 
for array: chunk, flatten, toPair, 
for object: assign 

```

### Vuejs : javascript popular functions
```
Object.entries(object) // to make array from key value pair

for iteration purpose:
map, filter, some, findIndex, every, forEach, 

```


### Vuejs : database address
```
modify
src->store->store.js
for database address manipulation

```


### Vuejs : PWA modification
```
vue.config.js
in the root folder for pwa modification
```


### Vuejs : Remove Console output in production build
```
npm install babel-plugin-transform-remove-console --save-dev

babel.config.js
in the root directory

```

### Vuejs : for printing help
```
https://printjs.crabbly.com/
npm install print-js --save


```


### Vuejs : for file download help
```
https://www.npmjs.com/package/js-file-download
https://github.com/kennethjiang/js-file-download

npm install js-file-download --save

```


