# The Fives Pos

_Cliente web para consumir el backend denominado Salescore, lo que The Fives Pos hace es tomar la información que el backend ofrece mediante API Rest y presentar un sistema de ventas, esta aplicación está desarrollada completamente con VueJs en su versión 2_

## Comenzando 🚀
  
_Estas instrucciones te permitirán obtener una copia del proyecto en funcionamiento en tú máquina local para propósitos de desarrollo y/o pruebas._
  
### Nota de compatibilidad
 

_Vue **no** es compatible con IE8 y versiones anteriores, ya que utiliza las características de ECMAScript 5 que son incompatibles en IE8. Sin embargo, admite todos los [navegadores compatibles con ECMAScript 5]._
 

Mira **Despliegue ** para conocer como desplegar el proyecto.
 
### Pre-requisitos 📋
 
_Para empezar a ejecutar el proyecto para fines de desarrollo ser requiere instalar lo siguente:_
 

- Instalar Node js

- Instalar npm

- Instalar Vue/Cli

- Instalar Vue Devtools
 

* _Si tiene el paquete vue-cli (1.xo 2.x) anterior instalado globalmente, primero debe desinstalarlo con npm uninstall vue-cli -g o yarn global remove vue-cli. Para comporobar que se instaló correctamente (vue-cli)_

```
vue --version
```

* _Vue CLI 4.x requiere Node.js versión 8.9 o superior (se recomienda v10 +)._

* _Cuando use Vue, se recomienda instalar [Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools) en el navegador, lo que le permitirá inspeccionar y depurar sus aplicaciones de Vue de una manera más amigable._
 

### Instalación y desarrollo🔧

_Para instalar todas las dependencias del proyecto_

```
npm install
```
_Compila y recarga en caliente para el desarrollo_
```
npm run serve
```

_O usar la interfaz gráfica de Vue para levantar el proyecto_
```
vue ui
```

_Donde será redirigido a un servidor en su navegador predeterminado donde puede crear y administrar un proyecto de Vue, en ese apartado puede elegir el proyecto y en tareas, darle en serve para levantar el proyecto_

## Despliegue 📦

_Para esto se necesita compilar y minimizar para producción, que crea la carpeta dist y luego subirlos al servidor_

```
npm run build
```

## Construido con 🛠️

_Complementos, plugins o dependencias utilizadas_

* [Vue.js](https://vuejs.org/)- El framework web JS como núcleo

* [Vuex](https://vuex.vuejs.org/) - Manejador del estado de la aplicación

* [Vue-router](https://router.vuejs.org/) - Manejador de rutas oficial para vuejs

* [Npm](hhttps://www.npmjs.com/get-npm) - Manejador de dependencias

* [Axios](https://www.npmjs.com/package/axios) y [Vue-axios](https://www.npmjs.com/package/vue-axios) - (Axios) complemento sencillo para hacer solicitudes HTTP (Ajax) mediante Javascript / NodeJS, altamente preparado para consumir APIs REST . Vue-axios es una adaptación de axios para integrarlo con Vue.

* [Vuex-persist](https://www.npmjs.com/package/vuex-persist) - Complemento que le permite guardar el estado de su aplicación (datos como el carrito de compras o datos del usuario) en un almacenamiento persistente como localStorage.

* [Vee-validate](https://logaretm.github.io/vee-validate/ ) - Validación de formularios basado en plantillas para Vue.js

* [Vue-json-excel](https://www.npmjs.com/package/vue-json-excel) - Para descargar sus datos JSON como un archivo de Excel directamente desde el navegador.

* [Vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay) - Componente Vue.js para indicador de carga de pantalla completa (loader).

* [Vue-paginate](https://www.npmjs.com/package/vue-paginate) - Ocupado para la paginación de productos.

* [Vue-select](https://vue-select.org/) - Para integrar un buscador en una lista de selección

* [Vue-sweetalert2](https://www.npmjs.com/package/vue-sweetalert2) - Contenedor de Vue.js para SweetAlert2, para mostrar mensajes de alerta

* [BootstrapVue](https://bootstrap-vue.org/) - Bootstrap adaptado especialmente para Vuejs.

  

## Versionado 📌

Se usa un estilo como el de [Semver](http://semver.org/) para el versionado.

## Archivo de variables de entorno

  

#### Se ubica en la raíz del proyecto en el archivo .env

```
VUE_APP_BASE_URL_API=dominio/api/v1
VUE_APP_API_TOKEN=6f292a4810d10da360ab264cf6e6d36b7b4f8ded
VUE_APP_IMG_SRC_API=dominio
VUE_APP_ORDER_DETAIL_COUPON_PDF=dominio/Transactions/ordersdetailcoupon/
VUE_APP_VERSION=1.0.0
```

## Directorio de archivos  

Así es como se ve el directorio de archivos en desarrollo 

![directorio](https://res.cloudinary.com/di3qzyeke/image/upload/v1606849762/readme-markdown/src_lidc4f.png) 

### Directorio src

Aquí se concentra la mayoría de los archivos de la aplicación, contiene a los siguientes:

![Archivos de Src](https://res.cloudinary.com/di3qzyeke/image/upload/v1606852186/readme-markdown/srcm_u4o2w6.png)
 

 - #### assets

	Archivos para ser usados en components o en views, podrían ser img o css
 

 - #### components

	  Los componentes son instancias reutilizables de Vue con un nombre, hay componentes para la sección del login, dashboard, footer, barras de navegación, area de ventas, cart, productos, categorias, etc.
	  ![sistema de componentes](https://es.vuejs.org/images/components.png)

 - #### modules
	
	  Cuando un store empieza a crecer demasiado, empieza a ser bastante inmanejable gestionarlo todo en un único fichero. `vuex`  presenta una solución donde se gestiona todo el estado en único objeto, esto se puede modularizar, pero a la vez seguir teniendo esta estructura en árbol único.
	`vuex` cuenta con una funcionalidad que permitie dividir nuestro árbol de datos en módulos más específicos que contarán cada uno de ellos con todo lo necesario para gestionar estas porciones. En los modulos es donde concentramos:

	 - Acciones
	 - Getters
	 - Mutadores
	 - El estado

 - #### plugins

	  Los _Plugins_ usualmente agregan funcionalidades globales a Vue. No hay un _scope_ estrictamente definido para un _Plugins_, por lo general hay varios tipos de _Plugins_, tenerlo en una carpeta evita tener todo desordenado. (Algunos de los plugins utilizado en este proyecto son: boostrap-vue, vue-axios, vue-select)

 - #### router

	  En este directorio se tiene un archivo archivo que gestiona todas las rutas, de igual forma revisa si cada ruta requiere autenticación. Su funcionamiento requiere el uso de **vue-router** y el array de rutas contenida en la raíz de src en el archivo **routes.js**.

	  	
	
		import  Vue  from  'vue'
		import  Router  from  'vue-router'
		import  routes  from  '@/routes'
		import  store  from  '../store/index';
		Vue.use(Router)

		const  router  =  new  Router({
			routes
		})

		router.beforeEach((to, from, next)=> {
		const  requiresAuth  =  to.matched.some( record  =>  record.meta.requiresAuth)
		const  isLogged  =  store.state.auth.isLogged  

		if( !requiresAuth  &&  isLogged  &&  to.path  ===  '/login'){
			next('/sales')
		}

		if( requiresAuth  &&  !isLogged) {
			next('/login')
		} else {
			next()
			}
		})

		export  default  router
	
		



 - #### store

	Vuex es una biblioteca de gestión de estado sintonizada específicamente para la construcción de aplicaciones complejas a gran escala Vue.js. Usa una tienda global y centralizada para todos los componentes en una aplicación, aprovechando su sistema de reactividad para las actualizaciones de inmediatas.

	La tienda de Vuex está diseñada de tal manera que no es posible cambiar su estado de cualquier componente. Esto asegura que el Estado sólo puede ser transformado en una manera predecible. Su tienda se convierte así en una única fuente de verdad: cada elemento de datos se almacena sólo una vez y es de sólo lectura para evitar que los componentes de la aplicación corrompan el estado el que se accede por otros componentes.
	![enter image description here](https://cms-assets.tutsplus.com/uploads/users/2028/posts/30952/image/vuex_state_management_workflow_diagram.png)
  

 - #### views

	  Las vistas que se van llamando dependiendo de las rutas llamadas en el navegador. De igual forma las vistas hace uso de los components.

- #### App.vue

  Componente o punto de entrada principal a nivel de componentes , aquí es donde se llaman a los componentes del directorio views esto se logra con  **router-view**

- #### main.js

	Sí **app.vue** es el componente principal por el que nuestro aplicación inicia, **main.js** es el archivo js que carga la instancia de Vue, el componente **app**, el **router**, **store** y los **plugins**.
	
	![main.js](https://res.cloudinary.com/di3qzyeke/image/upload/v1606920363/readme-markdown/main_b7nvjw.png)
	
		
- #### routes.js
  
	Contiene el arreglo de rutas de la aplicación, en esta se especifica las vistas que carga cada ruta y tambien especifica si requiere autenticación. Cabe mencionar que las rutas son exportadas para ser usadas en **src/router/index.js**
	
	![enter image description here](https://res.cloudinary.com/di3qzyeke/image/upload/v1606920613/readme-markdown/routes_sm2hjh.png)