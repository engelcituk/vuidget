import Vue from 'vue';
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from "vee-validate";
import es from "vee-validate/dist/locale/es.json";
import * as rules from "vee-validate/dist/rules";
import { regex } from "vee-validate/dist/rules";

extend("regex", regex);

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("es", es);
// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

/*
link de referencia
https://www.positronx.io/vue-js-veevalidate-bootstrapvue-form-validation-example/
*/