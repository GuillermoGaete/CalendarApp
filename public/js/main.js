(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Vue.component('eventlistelement', {
  // declare the props
  props: ["index", "event"],
  // propiedad declarada con camelCase permite pasarla como
  // camel-case = "Algo"
  // like data, the prop can be used inside templates and
  // is also made available in the vm as this.message
  template: "<div>\n                          \n                                                            <v-divider v-if=\"index>0\" v-bind:inset=\"inset\"></v-divider>\n                                                            <v-list-tile\n                                                                avatar\n                                                                :key=\"event.id\"\n                                                                >\n                                                              <v-list-tile-content>\n                                                                <v-list-tile-title>{{getHour(event.init)}} - {{getHour(event.end)}}</v-list-tile-title>\n                                                                <v-list-tile-sub-title v-html=\"event.description\"></v-list-tile-sub-title>\n                                                                <v-list-tile-sub-title>\n\n\n                                                                  <v-chip>\n                                                                    <v-avatar>\n                                                                      <img src=\"https://randomuser.me/api/portraits/men/34.jpg\" :alt=\"event.user.name\">\n                                                                    </v-avatar>\n                                                                    {{event.user.name}}\n                                                                  </v-chip>\n\n\n                                                              </v-list-tile-sub-title>\n                                                              </v-list-tile-content>\n                                                            <v-list-tile-action>\n                                                            <v-list-tile-action-text>{{ getDiff(event.init,event.end) }}</v-list-tile-action-text>\n                                                      <menuEditEventFloating\n                                                      :initial-event=\"event\"\n                                                      ></menuEditEventFloating>\n                                                            </v-list-tile-action>\n</v-list-tile>    </div>\n        ",
  // data is technically a function, so Vue won't
  // complain, but we return the same object
  // reference for each component instance
  data: function data() {
    return {
      imgUserDefault: '/img/user_default.png',
      inset: true
    };
  },
  // whenever question changes, this function will run
  computed: {},
  methods: {

    getHour: function getHour(date) {
      return moment(date).format('hh:mm a');
    },
    getDiff: function getDiff(init, end) {
      var difh = moment(end).diff(moment(init), 'hours');
      var difm = moment(end).diff(moment(init), 'minutes');
      if (difm == 1) {
        return difh + ' minuto';
      }
      if (difm < 60) {
        return difm + ' minutos';
      }
      if (difh == 1) {
        return difh + ' hora';
      }
      return difh + ' horas';
    }

  }

});

},{}],2:[function(require,module,exports){
'use strict';

/*global Vue*/
/*global Child*/
/*global moment*/
Vue.component('controlmonth', {
    props: ["displayedMonthDate"],
    template: '\n        <v-container class="pa-0" fluid>\n            <v-layout>\n                <v-flex xs12 sm12>\n                    <v-container class="pa-0" fluid>\n                        <v-layout>\n                            <v-flex xs10>\n                                <v-container class="pa-0">\n                                    <v-layout row wrap>\n                                        <v-flex offset-xs3 offset-sm3 xs1 sm1 class="pl-4">\n                                            <v-btn v-on:click="emitDown" fab small dark class="indigo text-xs-center">\n                                                <v-icon dark>remove</v-icon>\n                                            </v-btn>\n                                        </v-flex>\n                                        <v-flex xs3 sm3 class="pt-3">\n                                            <p class="text-xs-center title">{{displayedMonthDate.format("MMMM YYYY")}}</p>\n                                        </v-flex>\n                                        <v-flex xs1 sm1>\n                                            <v-btn v-on:click="emitUp" fab small dark class="indigo">\n                                                <v-icon dark>add</v-icon>\n                                            </v-btn>\n                                        </v-flex>\n                                    </v-layout>\n                                </v-container>\n                            </v-flex>\n                        </v-layout>\n                    </v-container>    \n                </v-flex>\n            </v-layout>\n        </v-container>',
    computed: {},
    methods: {
        emitUp: function emitUp() {
            this.$emit('upMonth');
        },
        emitDown: function emitDown() {
            this.$emit('downMonth');
        }
    }
});

},{}],3:[function(require,module,exports){
"use strict";

/*global Vue*/
/*global Child*/
/*global moment*/
Vue.component('daybox', {
  // declare the props
  props: ["isToday", "isDisplayedMonth", "isCurrentMonth", "day", "eventsDay"],
  // propiedad declarada con camelCase permite pasarla como
  // camel-case = "Algo"
  // like data, the prop can be used inside templates and
  // is also made available in the vm as this.message
  template: "<v-card v-bind:class=\"{ 'indigo lighten-4': isDisplayedMonth, 'blue lighten-4': isCurrentMonth}\" height=\"80px\" style=\"padding: 2px\">\n                            <v-card-text  class=\"pa-0\">\n                                                <p v-if=\"isToday==true\" class='text-xs-right'><b>{{Number(day.format('DD')).toString()}}\n                                                </b></p>                                                \n                                                <p v-else class=\"text-xs-right\">{{Number(day.format('DD')).toString()}}</p>                                      \n                                                <embebedlistevent\n                                                  :is-today=\"isToday\"\n                                                  :day=\"day\"\n                                                  :events-day=\"eventsDay\"\n                                                >\n                                                </embebedlistevent>  \n                                                \n                            </v-card-text>\n                </v-card>",
  // data is technically a function, so Vue won't
  // complain, but we return the same object
  // reference for each component instance
  computed: {},
  methods: {}
});

},{}],4:[function(require,module,exports){
"use strict";

Vue.component('embebedlistevent', {

  props: ["isToday", "day", "eventsDay"],
  template: "<div class=\"text-xs-center\" > \n                                                <v-dialog class=\"text-xs-center\" v-model=\"dialog\" persistent width=\"600px\">\n                                                  <div class=\"text-xs-center\" slot=\"activator\">\n                                                <span slot=\"activator\" v-if=\"eventsDay.length>0\" class='text-xs-center'> \n                                                  <v-chip class=\"indigo white--text\">\n                                                    <v-avatar class=\"blue accent-1\">\n                                                      <v-icon>storage</v-icon>\n                                                    </v-avatar>\n                                                    eventos&nbsp <b>{{eventsDay.length}}</b>\n                                                  </v-chip>\n                                                </span>                                            \n\n\n                                                 </div>\n                                                <v-card>\n                                                   <v-toolbar class=\"blue darken-2\" dark>\n                                                             <v-toolbar-title>{{modalHeader}}</v-toolbar-title>\n                                                   </v-toolbar>\n                                                  <v-card-text>\n                                                 \n                                                  <v-list three-line>\n                                                    <template v-for=\"(event, index) in eventsDay\">                                                       \n                                                    <eventlistelement\n                                                      :event=\"event\"\n                                                      :index=\"index\"\n                                                      >\n\n                                                    </eventlistelement>\n\n                                                    </template>\n                                                    </v-list>\n                                                  </v-card-text>\n                                                  <v-card-actions>\n                                                    <v-spacer></v-spacer>\n                                                     <v-btn class=\"blue--text darken-1\" flat=\"flat\" @click.native=\"dialog = false\">Cerrar</v-btn>\n                                                  </v-card-actions>\n                                                </v-card>\n                                              </v-dialog>\n</div>",

  computed: {},
  methods: {},

  data: function data() {
    var textEventProgramed = this.day.format('dddd DD - MMMM - YYYY');
    var modalHeaderText = this.isToday ? 'Hoy' : textEventProgramed;
    return {
      modalHeader: modalHeaderText,
      dialog: false
    };
  }
});

},{}],5:[function(require,module,exports){
'use strict';

Vue.component('menuEditEventFloating', {
  props: ['initialEvent'],
  template: '<v-menu\n                                                                  offset-x\n                                                                  :close-on-content-click="false"\n                                                                  :nudge-width="500"\n                                                                  v-model="menu"\n                                                                  :left="true"\n                                                                    \n                                                             \n                                                               >\n\n                                                                     <v-icon\n                                                                      class="clikeable blue--text text--lighten-1"\n                                                                      v-if="menu"\n                                                                      ripple\n                                                                      slot="activator"\n                                                                      >edit\n                                                                    </v-icon>\n\n                                                                    <v-icon\n                                                                      class="clikeable gray--text text--darken-2"\n                                                                      v-else\n                                                                      ripple\n                                                                      slot="activator"\n                                                                    >edit\n\n                                                                    </v-icon>\n\n                                                                  <v-card>\n                                                                    <v-list>\n                                                                      <v-list-tile>\n                                                                        <v-list-tile-content>\n                                                                          <v-list-tile-title>Creado por</v-list-tile-title>\n                                                                          <v-list-tile-sub-title>{{event.user.name}}</v-list-tile-sub-title>\n                                                                        </v-list-tile-content>\n                                                                        <v-list-tile-action>\n                                                                          <v-btn\n                                                                            icon\n                                                                            :class="deleting ? \'red--text\' : \'\'"\n                                                                            @click="deleteEvent()"\n                                                                          >\n                                                                            <v-icon v-if="deleting===false">delete</v-icon>\n                                                                            <v-progress-circular v-else indeterminate color="danger"></v-progress-circular>\n                                                                          </v-btn>\n                                                                        </v-list-tile-action>\n                                                                      </v-list-tile>\n                                                                    </v-list>\n                                                                    <v-divider></v-divider>\n                                                                    <v-list>\n                                                                      <v-spacer class="spacer-10p"></v-spacer>\n                                                                      <v-list-tile>\n                                                                        <v-text-field\n                                                                          label="Descripcion"\n                                                                          :value="event.description"\n                                                                          :counter="250"\n                                                                          required\n                                                                        ></v-text-field>\n                                                                      </v-list-tile>\n                                                                        <v-spacer class="spacer-10p"></v-spacer>\n                                                                      <v-list-tile>\n\n\n<v-dialog\n        persistent\n        v-model="modalDate"\n        lazy\n        full-width\n      >\n        <v-text-field\n          slot="activator"\n          label="Fecha de inicio"\n          :value="date"\n          prepend-icon="event"\n          readonly\n        ></v-text-field>\n        <v-date-picker v-model="date" scrollable actions>\n          <template scope="{ save, cancel }">\n            <v-card-actions>\n              <v-spacer></v-spacer>\n              <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>\n              <v-btn flat color="primary" @click="save">Guardar</v-btn>\n            </v-card-actions>\n          </template>\n        </v-date-picker>\n      </v-dialog>\n\n                                                                      </v-list-tile>\n\n\n\n                                                                    </v-list>\n                                                                    <v-card-actions>\n                                                                      <v-spacer></v-spacer>\n                                                                      <v-btn flat @click="onCancel()">Cancel</v-btn>\n                                                                      <v-btn v-if="saving" primary flat disabled><v-progress-circular indeterminate color="primary"></v-progress-circular></v-btn>\n                                                                      <v-btn v-else primary flat @click="onSave()">Save</v-btn>\n                                                                    </v-card-actions>\n                                                                  </v-card>\n                                                                </v-menu>',
  data: function data() {
    return {
      event: this.initialEvent,
      deleting: false,
      menu: false,
      message: false,
      hints: true,
      saving: false,
      menuDate: false,
      modalDate: false,
      date: moment(this.initialEvent).format('YYYY-MM-DD')
    };
  },
  methods: {
    deleteEvent: function deleteEvent() {
      this.deleting = true;
    },
    onSave: function onSave() {
      this.saving = true;
    },
    onCancel: function onCancel() {
      this.menu = false;
    }
  }

});

},{}],6:[function(require,module,exports){
"use strict";

/*global Vue*/
/*global Child*/
/*global moment*/
Vue.component('monthcalendar', {
    // declare the props
    props: ["initialOffsetMonth", "initialOffsetDay", "initialOffsetWeek", "initialEvents"],
    // propiedad declarada con camelCase permite pasarla como
    // camel-case = "Algo"
    // like data, the prop can be used inside templates and
    // is also made available in the vm as this.message
    template: "\n        <div>\n            <controlmonth\n            :displayed-month-date=momentNowOffset\n            v-on:upMonth=\"addMonth\"\n            v-on:downMonth=\"downMonth\"\n            >\n            </controlmonth>\n            <v-container fluid class=\"pa-0\">\n                <v-layout>\n                    <v-flex xs12 sm12>\n                        <v-container fluid class=\"pa-0\">\n                            <v-layout>\n                                <v-flex xs10>\n                                    <v-container fluid grid-list-md>\n                                        <v-layout row wrap v-for=\"n in 6\" :key=\"n\">\n                                            <v-flex v-if=\"n==1\" style=\"width: 14.28%\" v-for=\"i in 7\" :key=\"i\">\n                                                <v-card style=\"padding: 2px\">\n                                                    <v-card-text style=\"padding: 0px\" primary-title>\n                                                        <div>\n                                                            <h1 class=\"text-xs-center headline mb-0\">{{momentNow.day(i).format('dddd')}}</h1>\n                                                        </div>\n                                                    </v-card-text>\n                                                </v-card>\n                                            </v-flex>\n                                            <v-flex v-if=\"n>=1\" style=\"width: 14.28%\" v-for=\"i in 7\" :key=\"i\">\n                                                <daybox\n                                                :is-today=isToday(i,n)\n                                                :is-current-month=isCurrentMonth(i,n)\n                                                :is-displayed-month=isDisplayedMonth(i,n)\n                                                :day=getActualDay(i,n)\n                                                :events-day=getEventsDay(i,n)  \n                                                >\n                                                </daybox>\n                                            </v-flex>\n                                        </v-layout>\n                                    </v-container>    \n                                </v-flex>\n                            </v-layout>\n                        </v-container>\n                    </v-flex>\n                </v-layout>\n            </v-container>\n        </div>\n        ",
    // data is technically a function, so Vue won't
    // complain, but we return the same object
    // reference for each component instance
    data: function data() {
        return {
            offsetMonth: this.initialOffsetMonth,
            offsetDay: this.initialOffsetDay,
            offsetWeek: this.initialOffsetWeek,
            events: this.initialEvents
        };
    },
    updated: function updated() {
        console.log("se actualizo algun dato");
    },
    computed: {
        momentNow: function momentNow() {
            return new moment();
        },
        momentNowOffset: function momentNowOffset() {
            return new moment().add(this.offsetMonth, 'month').add(this.offsetDay, 'days').add(this.offsetWeek, 'weeks');
        },
        momentFirstDayOfCurrentMonth: function momentFirstDayOfCurrentMonth() {
            var localmomentNowOffset = new moment().add(this.offsetMonth, 'month').add(this.offsetDay, 'days').add(this.offsetWeek, 'weeks');
            var auxDate = localmomentNowOffset.add(-localmomentNowOffset.format('DD') + 1, 'days');
            return auxDate;
        },
        momentStartToPrint: function momentStartToPrint() {
            var localmomentNowOffset = new moment().add(this.offsetMonth, 'month').add(this.offsetDay, 'days').add(this.offsetWeek, 'weeks');
            var auxDate = localmomentNowOffset.add(-localmomentNowOffset.format('DD') + 1, 'days');
            var auxInitDay = auxDate.day();
            var auxDateStart = auxDate.add(-auxDate.day(), 'days');
            if (auxInitDay == 0) {
                auxDateStart = auxDateStart.add(-1, 'weeks');
            }
            return auxDateStart;
        }
    },
    methods: {
        getEventsDay: function getEventsDay(i, n) {
            var actualDay = this.getActualDay(i, n);
            var events = [];
            this.events.forEach(function (event) {
                var eventDate = moment(event.init);
                if (moment(actualDay).isSame(eventDate, 'day')) {
                    events.push(event);
                }
            });
            return events;
        },
        addMonth: function addMonth() {

            this.getEventsDisplayedMonth(1);
        },
        getEventsDisplayedMonth: function getEventsDisplayedMonth(addMinus) {
            var self = this;
            var offsetMonth = self.offsetMonth + addMinus;
            axios({
                method: 'get',
                url: 'http://calendario-guillermogaete49199007.codeanyapp.com/events/' + offsetMonth
            }).then(function (response) {
                var events = response.data;
                self.events = response.data;
                self.offsetMonth = offsetMonth;
            }).catch(function (error) {
                console.log(error);
            });
        },
        downMonth: function downMonth() {
            this.getEventsDisplayedMonth(-1);
        },
        isToday: function isToday(i, n) {
            var auxDateStart = this.getActualDay(i, n);
            if (moment().isSame(auxDateStart, 'day')) {
                return true;
            } else {
                return false;
            }
        },
        isCurrentMonth: function isCurrentMonth(i, n) {
            var auxDateStart = this.getActualDay(i, n);
            if (moment().isSame(auxDateStart, 'month')) {
                return true;
            } else {
                return false;
            }
        },
        isDisplayedMonth: function isDisplayedMonth(i, n) {
            if (moment(this.getActualDay(i, n)).isSame(this.momentNowOffset, 'month')) {
                return true;
            } else {
                return false;
            }
        },
        getActualDay: function getActualDay(i, n) {
            var localoffsetday = i + (n - 1) * 7;
            var localmomentNowOffset = new moment().add(this.offsetMonth, 'month').add(this.offsetDay, 'days').add(this.offsetWeek, 'weeks');
            var auxDate = localmomentNowOffset.add(-localmomentNowOffset.format('DD') + 1, 'days');
            var auxInitDay = auxDate.day();
            var auxDateStart = auxDate.add(-auxDate.day(), 'days');
            if (auxInitDay == 0) {
                auxDateStart = auxDateStart.add(-1, 'weeks');
            }
            auxDateStart = auxDateStart.add(localoffsetday, 'days');
            return auxDateStart;
        }
    }
});

},{}]},{},[2,1,3,6,4,5]);

//# sourceMappingURL=main.js.map
