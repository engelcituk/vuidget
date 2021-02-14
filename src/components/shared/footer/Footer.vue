<template>
    <footer id="sticky-footer" class="py-2 bg-dark footer mt-5">
        <b-container>
            <b-row>
                <b-col class="col-md-6">
                    <small>Copyright &copy; The Fives Sales</small>
                </b-col>
                <b-col class="col-md-6">
                    <span class="float-right"> Versión:<strong>{{version}}</strong></span>
                                     
                </b-col>
            </b-row>
        </b-container>
  </footer>
</template>

<script>
    export default {        
        data () {
            return {
                //tomado desde los variables de entorno en el archivo .env
                version: process.env.VUE_APP_VERSION,                                
            }
        },
        
    }
</script>

<style lang="stylus">
html {
  min-height: 100%;
  position: relative;
}
body {
  margin: 0;
  margin-bottom: 40px;
}
.footer {
    background-color: black;
    bottom: 0;
    color: white;
    height: 40px;
    
    position: absolute;
    width: 100%;
}
</style>