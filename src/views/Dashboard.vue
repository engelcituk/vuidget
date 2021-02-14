<template>
  <b-container class=" mb-25">
    <!-- User Interface controls -->
    
    <b-row class="mt-3">
      <b-col md="3">
          <b-form-datepicker
            label="Inicio"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="es-MX"
            label-no-date-selected="No date selected"
            v-model="fechaInicio.value"
            @input="handlerDates"
          ></b-form-datepicker>       
      </b-col>
      <b-col md="3">
          <b-form-datepicker
            label="Fin"
            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
            locale="es-MX"
            label-no-date-selected="No date selected"
            v-model="fechaFin.value"
            @input="handlerDates"
          ></b-form-datepicker>       
      </b-col>
      <b-col md="4">
        <b-form-group
          label="Filter"                
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
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
      </b-col>

      <b-col md="2">
        <b-form-group                  
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
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
          <Excel v-if="totalRows > 0" :fechaActual="fechaActual" :user="user"></Excel>

        </b-form-group>
      </b-col>
    </b-row>    

   <b-row>
      <b-col>
        <b-table
          show-empty
          empty-text="There are no records to show"
          small
          stacked="md"
          :items="filteredOrders"
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
      <template #cell(customername)="row">
        <b-button
          :id="'popover-button-variant'+row.item.id"
          href="#"
          tabindex="0"
          style="font-size: 0.4em;"
          variant="info"
        >
          <b-icon-info-circle-fill></b-icon-info-circle-fill>
        </b-button>
          <b-popover :target="'popover-button-variant'+row.item.id" variant="info" triggers="focus">
              <template #title>Datos del cliente</template>
              <b>Nombre completo:</b> {{row.item.customer.name}} {{row.item.customer.lastname}} <br>
              <b>Email:</b> {{row.item.customer.email}}<br>
              <b>phone:</b> {{row.item.customer.phone}}<br>              
          </b-popover>
        {{ row.item.customername }} 
      </template>

      <template #cell(actions)="row">
        <b-button size="sm" @click="getDetailsOrder(row.item, row.index, $event.target)" class="mr-1" variant="info">
          <b-icon-info-circle-fill></b-icon-info-circle-fill>
        </b-button>        
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
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only       
      size="lg"
      no-close-on-backdrop
    >
    <div>
      <b-tabs content-class="mt-3">
        <b-tab title="Details" active>
          <table class="table table-striped table-bordered table-responsive">
            <thead class="thead-dark">
                <tr>                                        
                    <th>Sku</th>
                    <th>Product</th>
                    <!-- <th>F. Operacion</th> -->
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Discount</th>
                    <th>Total</th>
                    <th>coupon</th>

                </tr>
            </thead>
            <tbody>
                <tr
                  v-for="detalle in detailOrderGetter"
                  :key="detalle.key" 
                >      
                    <td>{{ detalle.productSKU  }} </td>

                    <td>
                      {{ detalle.itemsold  }} <br><br> 
                      <span>Fecha de operacion</span><br>   
                      <!-- :disabled="detalle.operationdate && detalle.operationdate !=''"                    -->
                      <b-input-group class="mt-3">
                        <b-form-input
                          type="date"                     
                          class="form-control"
                          v-model="detalle.operationdate"

                        >

                        </b-form-input>
                        <b-input-group-append>
                          <b-button
                            variant="info"
                            @click="setOperationDate(detalle.id, detalle.operationdate)"
                            
                          >
                            <b-icon-check-square-fill></b-icon-check-square-fill>
                          </b-button>
                        </b-input-group-append>
                      </b-input-group>
                      {{ detalle.note  }}
                    </td>                
                    <td>{{ detalle.unitPrice  }}</td>                
                    <td>{{ detalle.qty  }}</td>
                    <td>{{ detalle.discount  }}</td>
                    <td>{{ detalle.total  }}</td>
                    <td>
                      <a
                        :href="couponLink + detalle.order +'/'+ detalle.productID" target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-primary"
                        v-if="detalle.imprimecupon"
                      >
                        <b-icon-file-earmark-ruled-fill></b-icon-file-earmark-ruled-fill>
                      </a>
                      
                    </td>

                </tr>                                
            </tbody>
          </table>
        </b-tab>

        <b-tab title="Only tranfers">
            <div v-for="detail in detailOrderGetter" :key="detail.key" >            
                <ValidationObserver ref="observer" v-slot="{ invalid }" >
                  <strong v-if="detail.categoryname == 'Transfer' ">{{detail.itemsold}}</strong> 
                  <b-row class="mt-3" v-if="detail.categoryname == 'Transfer' ">
                      <b-col class="col-md-6">
                        <ValidationProvider rules="required" name="from">
                            <b-input-group slot-scope="{ valid, errors }"  label="From" prepend="From" >
                              <b-form-input
                                  type="text" placeholder="Enter the origin" 
                                  v-model="detail.itinerary.ifrom"                         
                                  :state="errors[0] ? false : (valid ? true : null)" >
                              </b-form-input>                                                            
                              <b-form-invalid-feedback>
                                  {{ errors[0] }} 
                              </b-form-invalid-feedback>
                          </b-input-group>
                        </ValidationProvider>
                        <br>
                        <ValidationProvider rules="required" name="to">
                            <b-input-group slot-scope="{ valid, errors }"  label="To" prepend="To">
                              <b-form-input
                                  type="text" placeholder="Enter the destination" 
                                  v-model="detail.itinerary.ito"                         
                                  :state="errors[0] ? false : (valid ? true : null)" >
                              </b-form-input>                                                            
                              <b-form-invalid-feedback>
                                  {{ errors[0] }} 
                              </b-form-invalid-feedback>
                          </b-input-group>
                        </ValidationProvider>
                        <br>
                        <ValidationProvider rules="required" name="flight">
                            <b-input-group slot-scope="{ valid, errors }"  label="Flight" prepend="Flight" >
                              <b-form-input
                                  type="text" placeholder="Enter the Flight" 
                                  v-model="detail.itinerary.flight"                         
                                  :state="errors[0] ? false : (valid ? true : null)" >
                              </b-form-input>                                                            
                              <b-form-invalid-feedback>
                                  {{ errors[0] }} 
                              </b-form-invalid-feedback>
                          </b-input-group>
                        </ValidationProvider>
                        <br>
                        <ValidationProvider rules="required" name="trip">
                          <b-input-group slot-scope="{ valid, errors }" label="Choose a trip" prepend="Trip">
                            <b-form-select
                              :state="errors[0] ? false : (valid ? true : null)" 
                              v-model="detail.itinerary.trip" :options="optionsTrip">                                                                 
                              </b-form-select>                        
                            <b-input-group-append>                                                        
                              <b-button variant="info" :disabled="invalid" @click="saveDataTransferItinerary(detail.id, detail.itinerary)">
                                <b-icon-check-square-fill></b-icon-check-square-fill> Save
                              </b-button>
                            </b-input-group-append>
                            <b-form-invalid-feedback>
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
                          </b-input-group>                
                        </ValidationProvider>       
                      </b-col>
                      <b-col class="col-md-6">

                        <ValidationProvider rules="required" name="pax">
                            <b-input-group slot-scope="{ valid, errors }"  label="Pax" prepend="Pax">
                              <b-form-input
                                  type="number" placeholder="Enter pax" 
                                  v-model="detail.itinerary.pax"                         
                                  :state="errors[0] ? false : (valid ? true : null)" >
                              </b-form-input>                                                            
                              <b-form-invalid-feedback>
                                  {{ errors[0] }} 
                              </b-form-invalid-feedback>
                          </b-input-group>
                        </ValidationProvider>
                        <br>  
                        <ValidationProvider rules="required" name="pickup">
                            <b-input-group slot-scope="{ valid, errors }"  label="Fligth time" prepend="Pickup">                       
                              <b-form-timepicker
                                v-model="detail.itinerary.pickup"                         
                                :state="errors[0] ? false : (valid ? true : null)" locale="en">
                              </b-form-timepicker>             
                              <b-form-invalid-feedback>
                                  {{ errors[0] }} 
                              </b-form-invalid-feedback>
                          </b-input-group>
                        </ValidationProvider>
                        <br>                                                                    
                        <ValidationProvider rules="required" name="flighttime">
                            <b-input-group slot-scope="{ valid, errors }"  label="Fligth time" prepend="Flight time">                       
                              <b-form-timepicker
                                v-model="detail.itinerary.flighttime"                         
                                :state="errors[0] ? false : (valid ? true : null)" locale="en">
                              </b-form-timepicker>             
                              <b-form-invalid-feedback>
                                  {{ errors[0] }} 
                              </b-form-invalid-feedback>
                          </b-input-group>
                        </ValidationProvider>
                                                
                      </b-col> 
                                                                                                 
                  </b-row>              
                </ValidationObserver> 
                <br>                                     
            </div>                       
        </b-tab>
      </b-tabs>
    </div>      
    </b-modal>
  </b-container>
</template>

<script>   

import {mapActions, mapGetters,mapState} from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Excel from '@/components/dashboard/Excel'
import { fields, optionsTrip} from '@/data/fields'


  export default {
    components: {
      Excel,
      ValidationObserver,
            ValidationProvider
    },
    mounted() {
      //get dates to make request to api
      this.handlerDates()           
    },
    data() {
      return {        
        optionsTrip,
        fechaActual: this.currentDate(),              
        fields,
        couponLink: process.env.VUE_APP_ORDER_DETAIL_COUPON_PDF,  
        fechaInicio: { value: '2020-12-01' },
        fechaFin: { value: '2020-12-20' },
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Todos" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      ...mapGetters('dashboard',['filteredOrders','detailOrderGetter']),
      ...mapState('auth',['user']), 
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
      ...mapActions('dashboard',['fetchOrdersByUser','fetchOrderDetail','updateOperationDate','updateItineraryDetail']),

      async getDetailsOrder(item, index, button) {
        this.infoModal.title = `${item.invoice}`
        const payload = { idOrder: item.id, endPoint : 'ordersdetail' }
        
        await this.fetchOrderDetail( payload )

        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },      
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      async handlerDates(){
        let fechas = { 
          inicio: this.fechaInicio.value ,
          fin: this.fechaFin.value 
        }
        //para poder hacer comparaciones
        const currentDate = this.currentDate()
        
        const d1 = new Date(fechas.inicio);
        const d2 = new Date(fechas.fin);
        const init = d1.getTime();
        const end = d2.getTime();

        if(fechas.fin === "" ){
          fechas.inicio = this.fechaInicio.value
          fechas.fin = this.fechaInicio.value
        }

        if(fechas.inicio === "" ){
          fechas.inicio = this.fechaFin.value
          fechas.fin = this.fechaFin.value          
        }
        //sino hay fechas seleccionadas se obtiene la fecha actual
        if( fechas.fin === "" && fechas.fin === ""){
          fechas.inicio = currentDate
          fechas.fin = currentDate          
        }
        if( init > end ){
          fechas.inicio = this.fechaInicio.value
          fechas.fin = this.fechaInicio.value
        }           
        await this.fetchOrdersByUser(fechas)           
        this.totalRows = this.filteredOrders.length   
      },
      async setOperationDate(orderdetail, operationdate){
        const payload = {orderdetail, operationdate}
        
        await this.updateOperationDate(payload)
        // console.log(payload)
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
      async saveDataTransferItinerary(id, itinerary){
        itinerary.ordersdetail = id
        await this.updateItineraryDetail(itinerary)
      }
    }
  }
</script>

