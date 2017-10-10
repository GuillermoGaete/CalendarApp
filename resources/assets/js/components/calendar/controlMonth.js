/*global Vue*/
/*global Child*/
/*global moment*/
Vue.component('controlmonth', {
    props: ["displayedMonthDate"], 
    template: `
        <v-container class="pa-0" fluid>
            <v-layout>
                <v-flex xs12 sm12>
                    <v-container class="pa-0" fluid>
                        <v-layout>
                            <v-flex xs10>
                                <v-container class="pa-0">
                                    <v-layout row wrap>
                                        <v-flex offset-xs3 offset-sm3 xs1 sm1 class="pl-4">
                                            <v-btn v-on:click="emitDown" fab small dark class="indigo text-xs-center">
                                                <v-icon dark>remove</v-icon>
                                            </v-btn>
                                        </v-flex>
                                        <v-flex xs3 sm3 class="pt-3">
                                            <p class="text-xs-center title">{{displayedMonthDate.format("MMMM YYYY")}}</p>
                                        </v-flex>
                                        <v-flex xs1 sm1>
                                            <v-btn v-on:click="emitUp" fab small dark class="indigo">
                                                <v-icon dark>add</v-icon>
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-flex>
                        </v-layout>
                    </v-container>    
                </v-flex>
            </v-layout>
        </v-container>`,
    computed:{
      
    },
    methods: {
    emitUp: function () {
      this.$emit('upMonth')
    },
    emitDown: function () {
      this.$emit('downMonth')
    }
    }
})