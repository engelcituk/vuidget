<template> 
   <!-- si el state infoExtraProduct es nullo no cargar nada en modal -->
    <b-modal
      :id="idModal"
      :title="infoExtraProduct[0].name"
      ok-only 
      hide="resetInfoModal"      
      size="lg"
      no-close-on-backdrop
      v-if="infoExtraProduct"
    >
    <b-container>
        <b-row class="mb-2">

            <b-col class="col-md-6">                                
                <b-img thumbnail fluid :src="imgUrl + infoExtraProduct[0].coverImage" :alt="infoExtraProduct[0].name"></b-img>
            </b-col>

            <b-col class="col-md-6">
            
                <b-input-group
                    size="size"                                        
                    class="mb-3"
                    prepend="weblink"
                    v-if="infoExtraProduct[0].weblink"
                >
                    <b-form-input :value="infoExtraProduct[0].weblink" id="testing-code" readonly></b-form-input>
                    <b-input-group-append>
                    <b-button size="sm" text="Button" variant="info"
                        @click.stop.prevent="copyToClipboard('testing-code', infoExtraProduct[0].weblink)"
                    >
                        <b-icon-clipboard-check></b-icon-clipboard-check>
                    </b-button>
                    </b-input-group-append>
                </b-input-group>

                <b-input-group
                    size="size"                                        
                    class="mb-3"
                    prepend="videolink"
                    v-if="infoExtraProduct[0].videolink"
                >
                <b-form-input :value="infoExtraProduct[0].videolink"  id="testing-code2" readonly>                                        
                </b-form-input>
                    <b-input-group-append>
                        <b-button size="sm" text="Button" variant="info"
                            @click.stop.prevent="copyToClipboard('testing-code2', infoExtraProduct[0].videolink)"
                        >
                        <b-icon-clipboard-check></b-icon-clipboard-check>
                    </b-button>
                    </b-input-group-append>
                </b-input-group>                                              
            </b-col>                                
        </b-row>
        
        <b-row v-if="infoExtraProduct[0].description">
            <b-col class="col-md-12 mb-2">
                {{infoExtraProduct[0].description}}
            </b-col>
        </b-row>
        
        <b-row>
            <b-col class="col-md-12">
                <table class="table table-striped table-bordered "
                    v-for="detalle in infoExtraProduct[0].detail"
                    :key="detalle.id"                                
                >
                    <thead class="thead-dark">
                        <tr>                                        
                            <th>Hotel</th>
                            <th>Location</th>
                            <th>Start Date</th>
                            <th>Start Time</th>
                            <th>End Date</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>                                        
                            <td>{{ infoExtraProduct[0].hotel.name  }}</td>
                            <td>{{ infoExtraProduct[0].location.name  }}</td>
                            <td>{{ infoExtraProduct[0].startDate  }}</td>
                            <td>{{ infoExtraProduct[0].startTime  }}</td>
                            <td>{{ infoExtraProduct[0].endDate  }}</td>
                            <td>{{ infoExtraProduct[0].endTime }}</td>
                        </tr>
                        <tr>                                        
                            <td colspan="6"> <strong>Description:</strong>
                                {{ detalle.description  }}
                            </td>                                        
                        </tr>
                        
                    </tbody>
                </table>
            </b-col>
        </b-row>
        
            <b-row  v-if="infoExtraProduct[0].gallery.length" >                        
            <b-col class="col-md-3"
                v-for="img in infoExtraProduct[0].gallery"
                :key="img.key"
            > 
                <b-img thumbnail fluid :src="imgUrl + img.image" :alt="product.name + img.key"></b-img>
            </b-col>                                
        </b-row>                             
    </b-container>            
    </b-modal>        
</template>
<script>
    import { mapState } from 'vuex'
    import Vue from 'vue'
    
    export default {
        data () {
            return {
                imgUrl: process.env.VUE_APP_IMG_SRC_API,                
                keyImg: Math.random().toString(36).substring(2,9),
            }
        },        
        props:{
            idModal: {
                type: String,
                required: true
            }                      
        },
        computed:{            
            ...mapState('products',['infoExtraProduct']),
        },
        methods: {
            copyToClipboard (selector, url) {

                let testingCodeToCopy = document.querySelector('#'+selector)
                testingCodeToCopy.setAttribute('type', 'text') 
                testingCodeToCopy.select()

                try {
                    const successful = document.execCommand('copy');
                    const msg = successful ? 'successful' : 'unsuccessful';
                    Vue.$toast.open({
                        message: `Copiado: <strong>${url}</strong>`,
                        type: 'success',
                        position:'top-right'
                    });

                } catch (err) {
                    alert('Oops, unable to copy');
                }                
                window.getSelection().removeAllRanges()
            },
        }
        
    }
</script>

    