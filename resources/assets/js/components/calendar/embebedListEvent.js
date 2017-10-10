Vue.component('embebedlistevent', {

    props: ["isToday","day","eventsDay"], 
    template: `<div class="text-xs-center" > 
                                                <v-dialog class="text-xs-center" v-model="dialog" persistent width="600px">
                                                  <div class="text-xs-center" slot="activator">
                                                <span slot="activator" v-if="eventsDay.length>0" class='text-xs-center'> 
                                                  <v-chip class="indigo white--text">
                                                    <v-avatar class="blue accent-1">
                                                      <v-icon>storage</v-icon>
                                                    </v-avatar>
                                                    eventos&nbsp <b>{{eventsDay.length}}</b>
                                                  </v-chip>
                                                </span>                                            


                                                 </div>
                                                <v-card>
                                                   <v-toolbar class="blue darken-2" dark>
                                                             <v-toolbar-title>{{modalHeader}}</v-toolbar-title>
                                                   </v-toolbar>
                                                  <v-card-text>
                                                 
                                                  <v-list three-line>
                                                    <template v-for="(event, index) in eventsDay">                                                       
                                                    <eventlistelement
                                                      :event="event"
                                                      :index="index"
                                                      >

                                                    </eventlistelement>

                                                    </template>
                                                    </v-list>
                                                  </v-card-text>
                                                  <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                     <v-btn class="blue--text darken-1" flat="flat" @click.native="dialog = false">Cerrar</v-btn>
                                                  </v-card-actions>
                                                </v-card>
                                              </v-dialog>
</div>`,

    computed: {
      
    },
    methods: {
     
    },
  
    data: function () {
          var textEventProgramed = this.day.format('dddd DD - MMMM - YYYY') 
          var modalHeaderText=this.isToday ? 'Hoy': textEventProgramed
         return { 
              modalHeader:modalHeaderText,
              dialog:false
          }
    }
})


