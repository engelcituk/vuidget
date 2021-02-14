<template> 
   <!-- si el state selectedProductInCart es nullo no cargar nada en modal -->
    <b-modal
      :id="idModal"
      :title="selectedProductInCart.name"
      ok-only 
      hide="resetInfoModal"      
      size="lg"
      no-close-on-backdrop
      v-if="selectedProductInCart"
    >
        <b-row>            
            <b-col class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-bordered table-sm">
                            <thead class="thead-info">
                                <tr>                                        
                                    <th>Detail</th>
                                    <th>Qty</th>
                                    <th>Cost</th>
                                    <th>Sale price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>                                        
                                    <td> {{selectedProductInCart.detailDesc}} </td>
                                    <td> {{selectedProductInCart.qty}} </td> 
                                    <td> ${{selectedProductInCart.cost}} </td> 
                                    <td> ${{selectedProductInCart.saleprice}} </td>            
                                    <td> 
                                        ${{( (Math.round( selectedProductInCart.qty * ((selectedProductInCart.discountApplied > 0 ) ? selectedProductInCart.salepriceWithDiscount : selectedProductInCart.saleprice ) * 100) / 100).toFixed(2) )}}                                        
                                    </td>            

                                </tr>                                                
                            </tbody>
                    </table>
                </div>                 
            </b-col>
        </b-row>
        
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Note, discount" active>
                        <b-card-text>
                            <ValidationObserver ref="observer">
                            <!-- si el producto tiene precio manual muestro los campos -->
                                <div v-if="selectedProductInCart.manualPrice">
                                    <b-row>
                                        <div class="table-responsive">
                                            <table class="table table-sm">
                                                <tbody>
                                                    <tr>                                                                                                
                                                        <td>
                                                            <ValidationProvider rules="required|min_value:1" name="cost">
                                                                <b-form-group 
                                                                    slot-scope="{ valid, errors }"
                                                                    label="Cost"
                                                                >
                                                                    <b-form-input
                                                                        type="number" 
                                                                        step=".01"
                                                                        v-model="selectedProductInCart.cost"
                                                                        :state="errors[0] ? false : (valid ? true : null)" 
                                                                        placeholder="Ingrese el precio costo"     
                                                                    >
                                                                    </b-form-input>
                                                                    <b-form-invalid-feedback>
                                                                        {{ errors[0] }} 
                                                                    </b-form-invalid-feedback>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </td>
                                                        <td>
                                                            <ValidationProvider rules="required|min_value:1" name="saleprice">
                                                                <b-form-group 
                                                                    slot-scope="{ valid, errors }"
                                                                    label="Saleprice"
                                                                >
                                                                    <b-form-input           
                                                                        type="number" 
                                                                        step=".01"
                                                                        v-model="selectedProductInCart.saleprice"
                                                                        :state="errors[0] ? false : (valid ? true : null)" 
                                                                        placeholder="Ingrese el saleprice"  
                                                                        @blur="setNewSalePrice(selectedProductInCart.saleprice)"                                
                                                                    >
                                                                    </b-form-input>
                                                                    <b-form-invalid-feedback>
                                                                        {{ errors[0] }} 
                                                                    </b-form-invalid-feedback>
                                                                </b-form-group>
                                                            </ValidationProvider>
                                                        </td>                                                     
                                                    </tr>
                                                                                                    
                                                </tbody>                                                  
                                            </table>
                                        </div>                                        
                                    </b-row>
                                </div>
                                <b-row>
                                    <b-col class="col-md-6">
                                        <ValidationProvider rules="required" name="Operation date">
                                            <b-form-group 
                                                slot-scope="{ valid, errors }"
                                                label="Operation Date"
                                            >
                                            <b-calendar
                                                v-model="selectedProductInCart.operationdate" 
                                                :state="errors[0] ? false : (valid ? true : null)"     locale="es-MX">
                                                </b-calendar>                                               
                                                <b-form-invalid-feedback>
                                                    {{ errors[0] }} 
                                                </b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>
                                         
                                    </b-col>
                                    <b-col class="col-md-6">
                                        <ValidationProvider name="descuento" rules="required">
                                            <b-form-group slot-scope="{ valid, errors }" label="Choose a discount" >
                                                <b-form-select 
                                                    :state="errors[0] ? false : (valid ? true : null)" 
                                                    v-model="selectedProductInCart.discountApplied"
                                                    @change="handleDiscountProduct(selectedProductInCart.discountApplied)"                                                    
                                                >
                                                    <option value="0">0%</option>  
                                                    <option v-for="discount in discounts" :value="discount.value"
                                                    :key="discount.id"
                                                    >{{discount.value}}%
                                                    </option>
                                                </b-form-select>
                                                    <b-form-invalid-feedback>
                                                    {{ errors[0] }}
                                                    </b-form-invalid-feedback>
                                            </b-form-group>
                                        </ValidationProvider>
                                        <ValidationProvider rules="max:255" name="notas">
                                            <b-form-group 
                                                slot-scope="{ valid, errors }" label="Note( max: 255)">            
                                                <b-input-group class="mb-3" >
                                                    <b-form-textarea                        
                                                        v-model="selectedProductInCart.note"
                                                        :state="errors[0] ? false : (valid ? true : null)"   placeholder="Write a note" :maxlength="max" rows="3" max-rows="6"
                                                    >
                                                    </b-form-textarea>                    
                                                    <b-form-invalid-feedback>
                                                    {{ errors[0] }} 
                                                    </b-form-invalid-feedback>

                                                </b-input-group>
                                                <p class="text-center">
                                                    <b-badge variant="success" style="width: 60%; cursor: not-allowed;">Has {{max - selectedProductInCart.note.length}} characters left</b-badge>
                                                </p>
                                                
                                            </b-form-group>
                                        </ValidationProvider>                                        
                                    </b-col>
                                </b-row>                                    
                            </ValidationObserver>                             
                        </b-card-text>
                    </b-tab>                    
                    <b-tab title="Detail itinerary">
                        <ValidationObserver ref="observer" v-slot="{  }" >
                            <b-row class="mt-3">
                                <b-col class="col-md-6">
                                    <ValidationProvider rules="required" name="from">
                                        <b-input-group slot-scope="{ valid, errors }"  label="From" prepend="From" >
                                        <b-form-input
                                            type="text" placeholder="Enter the origin" 
                                            v-model="selectedProductInCart.itinerario.ifrom"                         
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
                                            v-model="selectedProductInCart.itinerario.ito"                         
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
                                            v-model="selectedProductInCart.itinerario.flight"                         
                                            :state="errors[0] ? false : (valid ? true : null)" >
                                        </b-form-input>                                                            
                                        <b-form-invalid-feedback>
                                            {{ errors[0] }} 
                                        </b-form-invalid-feedback>
                                    </b-input-group>
                                    </ValidationProvider>
                                    <br>
                                    <ValidationProvider rules="required" name="trip" v-if="selectedProductInCart.manualPrice">
                                        <b-input-group slot-scope="{ valid, errors }" label="Choose a trip" prepend="Trip">
                                            <b-form-select
                                            :state="errors[0] ? false : (valid ? true : null)" 
                                            v-model="selectedProductInCart.itinerario.trip" :options="optionsTrip">                                                                 
                                            </b-form-select>                        
                                            <!-- <b-input-group-append>                                                        
                                            <b-button variant="info" :disabled="invalid" @click="saveItinerary(selectedProductInCart.itinerario)">
                                                <b-icon-check-square-fill></b-icon-check-square-fill> Save
                                            </b-button>
                                            </b-input-group-append> -->
                                            <b-form-invalid-feedback>
                                                {{ errors[0] }}
                                            </b-form-invalid-feedback>
                                        </b-input-group>                
                                    </ValidationProvider>
                                    <ValidationProvider rules="required" name="from" v-if="selectedProductInCart.categoryName=='Transfer'">
                                        <b-input-group slot-scope="{ valid, errors }"  label="From" prepend="Trip" >

                                        <b-form-input
                                            type="text" placeholder="Trip" 
                                            v-model="selectedProductInCart.itinerario.trip"                         
                                            :state="errors[0] ? false : (valid ? true : null)"
                                            readonly>
                                        </b-form-input>                                                          
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
                                                v-model="selectedProductInCart.itinerario.pax"                         
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
                                            <b-form-input
                                                type="time" placeholder="Enter pickup" 
                                                v-model="selectedProductInCart.itinerario.pickup"                         
                                                :state="errors[0] ? false : (valid ? true : null)" locale="en" >
                                            </b-form-input>
                                        <b-form-invalid-feedback>
                                            {{ errors[0] }} 
                                        </b-form-invalid-feedback>
                                    </b-input-group>
                                    </ValidationProvider>
                                    <br>                                                                    
                                    <ValidationProvider rules="required" name="flighttime">
                                        <b-input-group slot-scope="{ valid, errors }" label="Fligth time" prepend="Flight time">
                                            <b-form-input
                                                type="time" placeholder="Enter flighttime"
                                                v-model="selectedProductInCart.itinerario.flighttime"                         
                                            :state="errors[0] ? false : (valid ? true : null)" locale="en" >
                                            </b-form-input>
                                        <b-form-invalid-feedback>
                                            {{ errors[0] }} 
                                        </b-form-invalid-feedback>
                                    </b-input-group>
                                    </ValidationProvider>
                                                            
                                </b-col> 
                                                                                                            
                            </b-row>              
                        </ValidationObserver>                         
                    </b-tab>
                    <b-tab title="Additional fields">
                        <b-card-text>
                            <b-row>
                                <b-col class="col-md-12">
                                    <ValidationObserver ref="observer" v-slot="{ invalid }" >
                                        <table class="table table-sm">
                                            <thead>
                                                <tr>                                                
                                                    <th scope="col">Options</th>
                                                    <th scope="col">Value</th>
                                                    <th scope="col">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <tr>                                        
                                                <td>
                                                    <ValidationProvider name="tipo" rules="required"> 
                                                        <b-form-group size="sm" class="mb-3" slot-scope="{ valid, errors }" >                                  
                                                        <b-form-select
                                                            :state="errors[0] ? false : (valid ? true : null)" v-model="selected"                  
                                                        >
                                                            <option value="">Elija un tipo</option>
                                                            <option v-for="field in extraFieldsTypes" :value="field"
                                                            :key="field.value"
                                                            >{{field.text}}
                                                            </option>
                                                        </b-form-select>                                            <b-form-invalid-feedback>
                                                                {{ errors[0] }}
                                                        </b-form-invalid-feedback>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </td>
                                                <td>                                                    
                                                    <ValidationProvider rules="required" name="valor">
                                                        <b-form-group 
                                                            slot-scope="{ valid, errors }" size="sm"            
                                                        >
                                                            <b-form-input type="text" v-model="valorSelect"     :state="errors[0] ? false : (valid ? true : null)"     
                                                            placeholder="Enter the value" 
                                                            >
                                                            </b-form-input>                                                            
                                                            <b-form-invalid-feedback>
                                                                {{ errors[0] }} 
                                                            </b-form-invalid-feedback>
                                                        </b-form-group>
                                                    </ValidationProvider>
                                                </td>
                                                <td>
                                                    
                                                    <b-button variant="success" class="mr-2"
                                                        @click="createNewFields(selectedProductInCart)"
                                                        :disabled="invalid"
                                                        size="sm"
                                                    >
                                                        <b-icon icon="plus-circle-fill"></b-icon>
                                                    </b-button>
                                                    <b-button variant="warning"
                                                        @click="clearInputs"
                                                        :disabled="invalid"
                                                        size="sm"
                                                    >
                                                        <b-icon icon="x-circle-fill"></b-icon>
                                                    </b-button>
                                                </td>
                                            </tr>                                                
                                        </tbody>
                                    </table>   
                                    </ValidationObserver>
                                </b-col>                                                                
                            </b-row>
                            <b-row>
                                <b-col class="col-md-12">                    
                                    <table class="table table-bordered table-sm" v-if="selectedProductInCart.orderextraFields.length">                                       
                                        <tbody>
                                            <tr v-for="detalle in selectedProductInCart.orderextraFields" :key="detalle.key">                                        
                                                <td>
                                                    {{detalle.property}}
                                                </td>
                                                <td>
                                                    {{detalle.value}}
                                                </td> 
                                                <td>
                                                    
                                                    <b-button size="sm" variant="danger" 
                                                        @click="deleteField(detalle)"
                                                    >
                                                        <b-icon icon="trash-fill"></b-icon>
                                                    </b-button>
                                                </td>                                                         
                                            </tr>                                                
                                        </tbody>
                                    </table> 

                                    <b-alert show variant="info" v-else >
                                        No additional fields have been added
                                    </b-alert> 

                                </b-col>
                            </b-row>
                        </b-card-text>
                    </b-tab>
                </b-tabs>
            </b-card>           
    </b-modal>        
</template>
<script>
   import { ValidationObserver, ValidationProvider } from 'vee-validate';
   import { mapState, mapMutations} from 'vuex'
   import { optionsTrip, OneWayOption} from '@/data/fields'

   export default {
        data () {
            return {
                max: 255,                  
                variantBtn: this.max > 254 ? 'danger' :'success',
                selected : null,  
                valorSelect : '',
                optionsTrip,
                OneWayOption  

            }
        },
        components: {
            ValidationObserver,
            ValidationProvider
        },
        props:{
            idModal: {
                type: String,
                required: true
            }                      
        },
        computed:{
            ...mapState('cart',['selectedProductInCart','extraFieldsTypes','discounts']),          
            ...mapState('init',['extraFieldsTypes','discounts'])            

        },
        methods: {
            ...mapMutations('cart',['calculateTotal','setSalepriceProduct','setExtraField', 'deleteExtraFieldInProduct','setItinerary']),
            handleDiscountProduct( discount ){
                //desestructuración del state selectedProductInCart
                let {discountApplied, saleprice, salepriceWithDiscount, originalSalePrice} = this.selectedProductInCart 
                
                // const 
                if( discount > 0){
                    const decimalDiscount = parseFloat( discountApplied) / 100;  
                    const descuento = originalSalePrice * decimalDiscount;
                    salepriceWithDiscount = ( (Math.round( originalSalePrice * 100) / 100).toFixed(2) ) - descuento;                    
                    this.selectedProductInCart.salepriceWithDiscount = ( (Math.round( salepriceWithDiscount * 100) / 100).toFixed(2) )
                    this.selectedProductInCart.saleprice = ( (Math.round( salepriceWithDiscount * 100) / 100).toFixed(2) )

                } else if ( discount == 0) {
                    this.selectedProductInCart.salepriceWithDiscount = originalSalePrice
                    this.selectedProductInCart.saleprice = originalSalePrice
                }
                              
                //recalculo el total
                this.calculateTotal()
            },
            setNewSalePrice(saleprice){
                this.setSalepriceProduct(saleprice)
            },
            createNewFields(selectedProductInCart){
                const key = Math.random().toString(36).substring(2,9)

                const objeto = {
                        key,
                        extrafield: this.selected.value,
                        property: this.selected.text,
                        value: this.valorSelect
                    }
                
                this.setExtraField(objeto);                           
            },                                       
            deleteField(item){
                const fieldToDelete = JSON.parse(JSON.stringify(item)) 
                this.deleteExtraFieldInProduct(fieldToDelete)
            },
            clearInputs(){
                this.selected = null 
                this.valorSelect = ''
            },
            saveItinerary(payload){
                this.setItinerary(payload)
                console.log(payload)
            }
        }
    }    
</script>