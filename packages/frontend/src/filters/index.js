import Vue from 'vue'
import breadcrumbs from './breadcrumbs'
import eventColor from './eventColor'
import amountCurrency from './amountCurrency'

Vue.filter('breadcrumbs', breadcrumbs)
Vue.filter('eventColor', eventColor)
Vue.filter('amountCurrency', amountCurrency)
