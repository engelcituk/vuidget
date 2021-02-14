<template>
  <b-container class="mb-5">
    <!-- User Interface controls -->    
    <b-row class="mt-3 ">
      
      <b-col md="3">
        <strong>Fecha Inicio</strong>

          <b-form-datepicker
            label="Inicio"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="es-MX"
            label-no-date-selected="No date selected"
            v-model="fechaInicio.value"
            @input="getOperations"
          ></b-form-datepicker>

          <strong>Por hotel</strong>
          <div class="input-group mb-3">  
            <select
              class="custom-select"
              v-model="hotelSelect.value"
              @change="getOperations"
            >  
              <option
              v-for="hotel in hotels"
              :value="hotel.id"
              :key="hotel.id">
              {{hotel.name}}
              </option>
            </select>
          </div>
          
               
      </b-col>
      <b-col md="3">
          <strong>Fecha Fin</strong>
          <b-form-datepicker
            label="Fin"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="es-MX"
            label-no-date-selected="No date selected"
            v-model="fechaFin.value"
            @input="getOperations"
          ></b-form-datepicker>
          

          <strong>Por categoria</strong>
          <div class="input-group mb-3">  
            <select
              class="custom-select"
              v-model="categorySelect.value"
              @change="getOperations"
            >  
              <option
              v-for="category in categories"
              :value="category.id"
              :key="category.id">
              {{category.name}}
              </option>
            </select>
          </div>
          
      </b-col>
      <b-col md="4">
        <strong>Filtro busqueda</strong>

        <b-form-group               
          
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group >
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''" variant="warning">
                <b-icon-trash-fill></b-icon-trash-fill> Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>           
        </b-form-group>
        <strong>Por tipo</strong>     
          <div class="input-group mb-3">
            
            <select
              class="custom-select" 
              v-model="typeSelect.value"  
              @change="getOperations"
            >        
              <option value="product">Product</option>
              <option value="event">Event</option>
              <option value="package">Package</option>
            </select>
          </div>
      </b-col>

      <b-col md="2">
        <br>
          <b-button variant="warning" size="sm" @click="resetFilter"
            v-if=" fechaInicio.value !='' || fechaFin.value !='' || categorySelect.value !='' || hotelSelect.value !='' || typeSelect.value !='' "
          >          
              <b-icon icon="arrow-counterclockwise" animation="spin-reverse" ></b-icon> Limpiar filtros
          </b-button>
          <br>
        <strong>Paginar resultados</strong>

        <b-form-group                                      
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
          <!-- muestro botón para descargar excel -->
          <div v-if="totalRows > 0" >
            <!-- <strong>Descargar excel</strong> -->
            <Excel :fechaActual="fechaActual" :user="user"></Excel>            
          </div>
          
        </b-form-group>
      </b-col>
    </b-row>    
<br>
   <b-row>
      <b-col>
        <b-table
          show-empty
          empty-text="There are no records to show"
          small
          stacked="md"
          :items="filteredOrdersOperation"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
      <template #cell(information)="row">        
        <b-button
          :id="'nota'+row.item.id"
          href="#"
          tabindex="0"
          style="font-size: 0.4em;"
          variant="info"
          v-b-tooltip.hover
          title="Ver información"
        >
        <!-- <b-icon icon="file-earmark" aria-hidden="true"></b-icon> -->
          <b-icon-info-circle-fill></b-icon-info-circle-fill>

        </b-button>
          <b-popover :target="'nota'+row.item.id" variant="info" triggers="focus">
              <template #title>Additional Information</template>
              
              <div class="text-center"> <b>Customer</b> </div>                           
              <b>Name:</b> {{row.item.customer.name}} <br>
              <b>Email:</b> {{row.item.customer.email}}<br>
              <b>phone:</b> {{row.item.customer.phone}}<br>   
              <div class="text-center"> <b>Payment</b> </div>                           
              <b>Payment form:</b> {{row.item.paymentForm}}<br>
              <b>Reference:</b> {{row.item.reference}}<br> 
              <div v-if="row.item.note !='' ">
                <div class="text-center"> <b>Note</b></div>                          
                {{row.item.note}}
              </div>                
          </b-popover>

      </template>

      <template #cell(actions)="row">
        <b-button
          v-if="fechaActual == row.item.operationdate"
          title="Marcar como operado"
          v-b-tooltip.hover
          class="mr-1"
          size="sm"          
          :variant="row.item.orderdetailStatus == 4 ? 'outline-primary' : 'success'"
          :disabled="row.item.orderdetailStatus == 4 || row.item.orderdetailStatus == 6"
          @click="updateStatusOperation('operar', row.item.id, 4)"
        >
            <b-icon icon="calendar-plus-fill" aria-hidden="true"></b-icon>
        </b-button>
        <b-button
          v-if="fechaActual == row.item.operationdate"
          v-b-tooltip.hover
          title="Marcar como No show"
          class="mr-1"
          size="sm"                    
          :variant="row.item.orderdetailStatus == 6 ? 'outline-primary' : 'info'"
          :disabled="row.item.orderdetailStatus == 6 || row.item.orderdetailStatus == 4"
          @click="updateStatusOperation('noShow', row.item.id, 6)"
        >
          <b-icon icon="eye-slash-fill" aria-hidden="true"></b-icon>
        </b-button> 
        <b-button          
          title="Agregar referencia bancaria"
          v-b-tooltip.hover
          size="sm"          
          :variant="row.item.reference ? 'outline-primary' : 'warning'"
          :disabled="row.item.reference !='' "
          @click="referenceModal(row.item)"
        >
          <b-icon icon="hash" aria-hidden="true"></b-icon>
        </b-button>                         
      </template>
      
      <template #cell(couponDoc)="row">        
        <a
            :href="couponLink + row.item.order +'/'+ row.item.productID" target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-sm"
            v-b-tooltip.hover title="Ver cupón"            
          >
            <b-icon-file-earmark-ruled-fill></b-icon-file-earmark-ruled-fill>
          </a>
      </template>

      
      
    </b-table>
      </b-col>
   </b-row>
    
    <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"        
          class="my-0"
    ></b-pagination>

    <b-modal
      v-if="selectedOrderOperation"
      id="referenceBankModal"
      title="Actualizar referencia bancaria"
      ok-only 
      hide="resetInfoModal"
      size="md"
      no-close-on-backdrop
      :retain-focus="false"
    >
      
        <b-form-group label="Referencia" >
          <b-form-input
            type="text"
            placeholder="Ingrese la referencia"
            v-model="selectedOrderOperation.reference"
            @change="updateStatusOperation('referencia', selectedOrderOperation.id, selectedOrderOperation.orderdetailStatus, selectedOrderOperation.reference)"
          >
          </b-form-input>          
        </b-form-group>        
      
    </b-modal>
  </b-container>
</template>

<script>   

import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
import Excel from '@/components/operation/Excel'

  export default {
    components: {
      Excel
    },
    async mounted() {
      //get getOperations, request to api
      await this.getOperations()  
      await this.fetchCategories()
      await this.fetchHotels()

      // console.log(this.fechaActual)

    },
    data() {
      return {
        couponLink: process.env.VUE_APP_ORDER_DETAIL_COUPON_PDF,  
        fechaInicio: { value: '' },
        fechaFin: { value: '' },
        categorySelect: { value: '' },
        hotelSelect: { value: '' },
        typeSelect: { value: '' },
        fechaActual: this.currentDate(), 
             
        fields: [
          { key: 'order', label: 'Order', sortable: true, sortDirection: 'desc' },
          { key: 'information', label: 'inf' },
          { key: 'categoryname', label: 'Category', sortable: true,},

          { key: 'itemsold', label: 'Item' },
          // { key: 'paymentForm', label: 'Payment' },
          // { key: 'reference', label: 'Reference' },
          { key: 'qty', label: 'Qty', sortable: true, class: 'text-center' },
          // { key: 'unitPrice', label: 'Precio', sortable: true, class: 'text-center' },
          // { key: 'discount', label: 'Discount', sortable: true, class: 'text-center' },
          { key: 'total', label: 'Total', class: 'text-center' },
          { key: 'orderdetailstatusname', label: 'Status', class: 'text-center' },
          { key: 'actions', label: 'Actions' },          
          { key: 'couponDoc', label: 'Coupon' },


        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Todos" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],        
      }
    },
    computed: {
      ...mapGetters('operation',['filteredOrdersOperation']),
      ...mapState('auth',['user']), 
      ...mapState('categories',['categories']),
      ...mapState('init',['hotels']),
      ...mapState('operation',['selectedOrderOperation']),
     
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }

    },
    methods: {
      ...mapActions('categories',['fetchCategories']),            
      ...mapActions('init',['fetchHotels']),            
      ...mapActions('operation',['fetchOrdersOperation','updateOrderOperation']),
      ...mapMutations('operation',['setOrderOperationSelected']),

      async updateStatusOperation(tipo, order, status, reference="" ) {
        const payload = {tipo, order, status, reference}
        console.log(payload)        
        await this.updateOrderOperation(payload)
        this.$root.$emit('bv::hide::modal', 'referenceBankModal')
        await this.getOperations()

      },
       async referenceModal(item) {

        await this.setOrderOperationSelected(item)

        this.$root.$emit('bv::show::modal', 'referenceBankModal')

      },

      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredOrdersOperation) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredOrdersOperation.length
        this.currentPage = 1
      },
      async getOperations(){
        let payload = { 
          fechaInicio: this.fechaInicio.value ,
          fechaFin: this.fechaFin.value,
          hotel: this.hotelSelect.value,        
          categoria: this.categorySelect.value,
          tipo: this.typeSelect.value          
        }        

        //para poder hacer comparaciones
        const currentDate = this.currentDate()
        
        const d1 = new Date(payload.fechaInicio)
        const d2 = new Date(payload.fechaFin)
        const init = d1.getTime()
        const end = d2.getTime()

        if(payload.fechaFin === "" ){
          payload.fechaInicio = this.fechaInicio.value
          payload.fechaFin = this.fechaInicio.value
        }

        if(payload.fechaInicio === "" ){
          payload.fechaInicio = this.fechaFin.value
          payload.fechaFin = this.fechaFin.value          
        }
        //sino hay fechas seleccionadas se obtiene la fecha actual
        if( payload.fechaFin === "" && payload.fechaFin === ""){
          payload.fechaInicio = currentDate
          payload.fechaFin = currentDate          
        }
        if( init > end ){
          payload.fechaInicio = this.fechaInicio.value
          payload.fechaFin = this.fechaInicio.value
        }           
        await this.fetchOrdersOperation(payload)           
        this.totalRows = this.filteredOrdersOperation.length   
      },      
      currentDate(){

        let date = new Date();
        // adjust 0 before single digit date
        let day = ("0" + date.getDate()).slice(-2);
        // current month
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        // current year
        let year = date.getFullYear();
       
        return year + "-" + month + "-" + day;        
      },
      getUserAuth(){
        user = this.user
        console.log(user)
      },
      async resetFilter(){
        this.fechaInicio = { value: '' }
        this.fechaFin = { value: '' }
        this.categorySelect = { value: '' }
        this.hotelSelect = { value: '' }
        this.typeSelect = { value: '' }
        
        this.filter =  null //el buscador

        await this.getOperations()  
      }
    }
  }
  /*
  event
product
package
  */
</script>
