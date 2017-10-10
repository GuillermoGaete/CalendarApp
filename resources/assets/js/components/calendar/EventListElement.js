
Vue.component('eventlistelement', {
    // declare the props
    props: ["index","event"], 
    // propiedad declarada con camelCase permite pasarla como
    // camel-case = "Algo"
    // like data, the prop can be used inside templates and
    // is also made available in the vm as this.message
    template: `<div>
                          
                                                            <v-divider v-if="index>0" v-bind:inset="inset"></v-divider>
                                                            <v-list-tile
                                                                avatar
                                                                :key="event.id"
                                                                >
                                                              <v-list-tile-content>
                                                                <v-list-tile-title>{{getHour(event.init)}} - {{getHour(event.end)}}</v-list-tile-title>
                                                                <v-list-tile-sub-title v-html="event.description"></v-list-tile-sub-title>
                                                                <v-list-tile-sub-title>


                                                                  <v-chip>
                                                                    <v-avatar>
                                                                      <img src="https://randomuser.me/api/portraits/men/34.jpg" :alt="event.user.name">
                                                                    </v-avatar>
                                                                    {{event.user.name}}
                                                                  </v-chip>


                                                              </v-list-tile-sub-title>
                                                              </v-list-tile-content>
                                                            <v-list-tile-action>
                                                            <v-list-tile-action-text>{{ getDiff(event.init,event.end) }}</v-list-tile-action-text>
                                                      <menuEditEventFloating
                                                      :initial-event="event"
                                                      ></menuEditEventFloating>
                                                            </v-list-tile-action>
</v-list-tile>    </div>
        `,
    // data is technically a function, so Vue won't
    // complain, but we return the same object
    // reference for each component instance
    data: function () {
         return { 
              imgUserDefault:'/img/user_default.png',
              inset:true
         }
    },
    // whenever question changes, this function will run
    computed: {
      
    },
    methods: {
    
    getHour: function (date) {
      return moment(date).format('hh:mm a')
      },
    getDiff: function (init,end) {
      var difh=moment(end).diff(moment(init), 'hours')
      var difm=moment(end).diff(moment(init), 'minutes')
      if (difm==1){
        return difh+' minuto';
      }
      if(difm<60){
        return difm+ ' minutos'
      }
      if (difh==1){
        return difh+' hora';
      }
      return difh+ ' horas';
    }
      
    }
    
})

