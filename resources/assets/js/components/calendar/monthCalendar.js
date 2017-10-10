/*global Vue*/
/*global Child*/
/*global moment*/
Vue.component('monthcalendar', {
    // declare the props
    props: ["initialOffsetMonth","initialOffsetDay","initialOffsetWeek","initialEvents"], 
    // propiedad declarada con camelCase permite pasarla como
    // camel-case = "Algo"
    // like data, the prop can be used inside templates and
    // is also made available in the vm as this.message
    template: `
        <div>
            <controlmonth
            :displayed-month-date=momentNowOffset
            v-on:upMonth="addMonth"
            v-on:downMonth="downMonth"
            >
            </controlmonth>
            <v-container fluid class="pa-0">
                <v-layout>
                    <v-flex xs12 sm12>
                        <v-container fluid class="pa-0">
                            <v-layout>
                                <v-flex xs10>
                                    <v-container fluid grid-list-md>
                                        <v-layout row wrap v-for="n in 6" :key="n">
                                            <v-flex v-if="n==1" style="width: 14.28%" v-for="i in 7" :key="i">
                                                <v-card style="padding: 2px">
                                                    <v-card-text style="padding: 0px" primary-title>
                                                        <div>
                                                            <h1 class="text-xs-center headline mb-0">{{momentNow.day(i).format('dddd')}}</h1>
                                                        </div>
                                                    </v-card-text>
                                                </v-card>
                                            </v-flex>
                                            <v-flex v-if="n>=1" style="width: 14.28%" v-for="i in 7" :key="i">
                                                <daybox
                                                :is-today=isToday(i,n)
                                                :is-current-month=isCurrentMonth(i,n)
                                                :is-displayed-month=isDisplayedMonth(i,n)
                                                :day=getActualDay(i,n)
                                                :events-day=getEventsDay(i,n)  
                                                >
                                                </daybox>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>    
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
        `,
    // data is technically a function, so Vue won't
    // complain, but we return the same object
    // reference for each component instance
    data: function () {
          return { 
              offsetMonth: this.initialOffsetMonth,
              offsetDay: this.initialOffsetDay,
              offsetWeek: this.initialOffsetWeek,
              events: this.initialEvents
          }
    },
   updated: function () {
    console.log("se actualizo algun dato")
    },
     computed: {
        momentNow: function(){
          return new moment()
        },
        momentNowOffset: function(){
          return new moment().add(this.offsetMonth,'month').add(this.offsetDay,'days').add(this.offsetWeek,'weeks')
        },
        momentFirstDayOfCurrentMonth: function(){
        var localmomentNowOffset = new moment().add(this.offsetMonth,'month').add(this.offsetDay,'days').add(this.offsetWeek,'weeks')
        var auxDate=localmomentNowOffset.add(-localmomentNowOffset.format('DD')+1,'days')
        return auxDate
        },
        momentStartToPrint: function(){
        var localmomentNowOffset = new moment().add(this.offsetMonth,'month').add(this.offsetDay,'days').add(this.offsetWeek,'weeks')
        var auxDate=localmomentNowOffset.add(-localmomentNowOffset.format('DD')+1,'days')
        var auxInitDay=auxDate.day()
        var auxDateStart=auxDate.add(-auxDate.day(),'days')
        if(auxInitDay==0){
          auxDateStart=auxDateStart.add(-1,'weeks')
        }
        return auxDateStart;
        }
    },
    methods: {
      getEventsDay: function(i,n){
        var actualDay=this.getActualDay(i,n)
        var events=[]
        this.events.forEach(function(event){
          var eventDate= moment(event.init)
          if(moment(actualDay).isSame(eventDate,'day')){
            events.push(event)
          }         
        })
        return events;
      },
      addMonth:function(){
          
          this.getEventsDisplayedMonth(1)
      },
      getEventsDisplayedMonth:function(addMinus){
        var self=this;
        var offsetMonth=self.offsetMonth+addMinus;
        axios({
          method: 'get',
          url: 'http://calendario-guillermogaete49199007.codeanyapp.com/events/'+offsetMonth
        }).then(function (response) {
            var events =  response.data;
            self.events=response.data;
            self.offsetMonth=offsetMonth;
          })
          .catch(function (error) {
            console.log(error);
        });
        
      },
      downMonth:function(){
          this.getEventsDisplayedMonth(-1)
      },
      isToday: function (i,n) {
        var auxDateStart=this.getActualDay(i,n)
        if(moment().isSame(auxDateStart,'day'))
        {
            return true
        }else{
            return false
        }
      },
      isCurrentMonth: function (i,n) {
        var auxDateStart=this.getActualDay(i,n)
        if(moment().isSame(auxDateStart,'month'))
        {
            return true
        }else{
            return false
        }
      },
      isDisplayedMonth: function (i,n) {
        if(moment(this.getActualDay(i,n)).isSame(this.momentNowOffset,'month'))
        {
            return true
        }else{
            return false
        }
      },
      getActualDay:function(i,n){
        var localoffsetday=i+(n-1)*7;
        var localmomentNowOffset = new moment().add(this.offsetMonth,'month').add(this.offsetDay,'days').add(this.offsetWeek,'weeks')
        var auxDate=localmomentNowOffset.add(-localmomentNowOffset.format('DD')+1,'days')
        var auxInitDay=auxDate.day()
        var auxDateStart=auxDate.add(-auxDate.day(),'days')
        if(auxInitDay==0){
          auxDateStart=auxDateStart.add(-1,'weeks')
        }
        auxDateStart = auxDateStart.add(localoffsetday,'days')
        return auxDateStart;
      }
    }
})

