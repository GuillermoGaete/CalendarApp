<template>
<div class="pa-0">
            <controlMonth
            :displayed-month-date=momentNowOffset
            v-on:upMonth="addMonth"
            v-on:downMonth="downMonth"
            >
            </controlMonth>
            <v-container fluid class="pa-0">
                <v-layout>
                    <v-flex xs12 sm12>
                        <v-container fluid class="pa-0">
                            <v-layout>
                                <v-flex xs10>
                                    <v-container class="pb-0" fluid grid-list-md>
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
                                                <dayBox
                                                :is-today=isToday(i,n)
                                                :is-current-month=isCurrentMonth(i,n)
                                                :is-displayed-month=isDisplayedMonth(i,n)
                                                :day=getActualDay(i,n)
                                                >
                                                </dayBox>
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
</template>
<script>
import moment from 'moment';
import controlMonth from './controlMonth.vue';
import dayBox from './dayBox.vue';

export default {
  props: ["initialOffsetMonth","initialOffsetDay","initialOffsetWeek"], 
  data () {
      return {
        offsetMonth:this.initialOffsetMonth,
        offsetDay: this.initialOffsetDay,
        offsetWeek: this.initialOffsetWeek
      };
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
        if(!auxInitDay){
          auxDateStart=auxDateStart.add(-1,'weeks')
        }
        return auxDateStart;
        }
   },
   methods: {
      addMonth:function(){
          this.offsetMonth++;
      }, 
      downMonth:function(){
          this.offsetMonth--;
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
   },
   components: { dayBox,controlMonth}
};
</script>
<style>

</style>
