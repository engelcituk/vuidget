<template>
            
        <download-excel                     
            class=" btn btn-success mt-2  "
            :data="filteredOrdersItems"
            :fields="json_fields"
            worksheet="listado"
            :name="fileName"
            >
            <b-icon icon="cloud-download" aria-hidden="true"></b-icon> Excel        
        </download-excel>
</template>

<script>
import { mapGetters} from 'vuex'

export default {
    data() {
      return { 
        fileName: 'SalesPOS-'+this.fechaActual+'-'+this.user.name.split(' ').join('-')+'-'+this.user.lastname.split(' ').join('-')+'.xls',       
        //campos a mostrar en el excel
        json_fields: {
          Invoice: "invoice",
          'SKU Producto' : 'sku',
          'Producto Detalle':'productoDetalle',       
          Cliente: "cliente",
          Vendedor: "vendedor",
          'Numero cupón' : 'numeroCupon',
          Fecha: "fecha",
          'Método de Pago': "metodoPago",
          Referencia: "referencia",
          Estado:'estado',
          // 'Venta Bruta':'vBruto',
          'Cantidad':'qty',
          'Precio Unitario':'unitPrice',
          Descuento:'vDescuento',
          'Venta Total':'vTotal',

        },      
        json_meta: [
          [
            {
              key: "charset",
              value: "utf-8",
            },
          ],
        ],
      }
    },      
    props:{
      fechaActual: {
        type: String,
          required: true
      },
      user: {
        type: Object,
          required: true
      }
    },              
    computed:{
      ...mapGetters('dashboard',['filteredOrdersItems']),                      
    }
}
</script>
<style lang="stylus">

  .btnExcel:hover{
    color: white;
  }
</style


