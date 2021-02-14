<template>
            
        <download-excel                     
            class=" btn btn-success mt-2  "
            :data="filteredOrdersOperation"
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
          Orden: "order",
          'SKU Producto' : 'productSKU',
          'Cupón':'coupon',       
          'Cliente':'customer.name',       
          'Email cliente':'customer.email',       
          'Teléfono cliente':'customer.phone',       
          'Forma de pago': "paymentForm",
          Referencia: "reference",
          'Item': "itemsold",
          'Precio Unitario':'unitPrice',
          'Fecha de operación': "operationdate",
          'Estado' : 'orderdetailstatusname',
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
      ...mapGetters('operation',['filteredOrdersOperation']),                      
    }
}
</script>
<style lang="stylus">

  .btnExcel:hover{
    color: white;
  }
</style


