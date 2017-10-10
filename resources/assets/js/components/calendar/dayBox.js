/*global Vue*/
/*global Child*/
/*global moment*/
Vue.component('daybox', {
    // declare the props
    props: ["isToday","isDisplayedMonth","isCurrentMonth","day","eventsDay"], 
    // propiedad declarada con camelCase permite pasarla como
    // camel-case = "Algo"
    // like data, the prop can be used inside templates and
    // is also made available in the vm as this.message
    template: `<v-card v-bind:class="{ 'indigo lighten-4': isDisplayedMonth, 'blue lighten-4': isCurrentMonth}" height="80px" style="padding: 2px">
                            <v-card-text  class="pa-0">
                                                <p v-if="isToday==true" class='text-xs-right'><b>{{Number(day.format('DD')).toString()}}
                                                </b></p>                                                
                                                <p v-else class="text-xs-right">{{Number(day.format('DD')).toString()}}</p>                                      
                                                <embebedlistevent
                                                  :is-today="isToday"
                                                  :day="day"
                                                  :events-day="eventsDay"
                                                >
                                                </embebedlistevent>  
                                                
                            </v-card-text>
                </v-card>`,
    // data is technically a function, so Vue won't
    // complain, but we return the same object
    // reference for each component instance
    computed: {
      
    },
    methods: {
     
    }
})