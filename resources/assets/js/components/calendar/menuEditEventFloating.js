Vue.component('menuEditEventFloating',{
  props:['initialEvent'],
  template: `<v-menu
                                                                  offset-x
                                                                  :close-on-content-click="false"
                                                                  :nudge-width="500"
                                                                  v-model="menu"
                                                                  :left="true"
                                                                    
                                                             
                                                               >

                                                                     <v-icon
                                                                      class="clikeable blue--text text--lighten-1"
                                                                      v-if="menu"
                                                                      ripple
                                                                      slot="activator"
                                                                      >edit
                                                                    </v-icon>

                                                                    <v-icon
                                                                      class="clikeable gray--text text--darken-2"
                                                                      v-else
                                                                      ripple
                                                                      slot="activator"
                                                                    >edit

                                                                    </v-icon>

                                                                  <v-card>
                                                                    <v-list>
                                                                      <v-list-tile>
                                                                        <v-list-tile-content>
                                                                          <v-list-tile-title>Creado por</v-list-tile-title>
                                                                          <v-list-tile-sub-title>{{event.user.name}}</v-list-tile-sub-title>
                                                                        </v-list-tile-content>
                                                                        <v-list-tile-action>
                                                                          <v-btn
                                                                            icon
                                                                            :class="deleting ? 'red--text' : ''"
                                                                            @click="deleteEvent()"
                                                                          >
                                                                            <v-icon v-if="deleting===false">delete</v-icon>
                                                                            <v-progress-circular v-else indeterminate color="danger"></v-progress-circular>
                                                                          </v-btn>
                                                                        </v-list-tile-action>
                                                                      </v-list-tile>
                                                                    </v-list>
                                                                    <v-divider></v-divider>
                                                                    <v-list>
                                                                      <v-spacer class="spacer-10p"></v-spacer>
                                                                      <v-list-tile>
                                                                        <v-text-field
                                                                          label="Descripcion"
                                                                          :value="event.description"
                                                                          :counter="250"
                                                                          required
                                                                        ></v-text-field>
                                                                      </v-list-tile>
                                                                        <v-spacer class="spacer-10p"></v-spacer>
                                                                      <v-list-tile>


<v-dialog
        persistent
        v-model="modalDate"
        lazy
        full-width
      >
        <v-text-field
          slot="activator"
          label="Fecha de inicio"
          :value="date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>
              <v-btn flat color="primary" @click="save">Guardar</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-dialog>

                                                                      </v-list-tile>



                                                                    </v-list>
                                                                    <v-card-actions>
                                                                      <v-spacer></v-spacer>
                                                                      <v-btn flat @click="onCancel()">Cancel</v-btn>
                                                                      <v-btn v-if="saving" primary flat disabled><v-progress-circular indeterminate color="primary"></v-progress-circular></v-btn>
                                                                      <v-btn v-else primary flat @click="onSave()">Save</v-btn>
                                                                    </v-card-actions>
                                                                  </v-card>
                                                                </v-menu>`,
  data:function(){
    return{
      event:this.initialEvent,
      deleting: false,
      menu: false,
      message: false,
      hints: true,
      saving:false,
      menuDate: false,
      modalDate: false,
      date:moment(this.initialEvent).format('YYYY-MM-DD')
    }
  },
  methods:{
    deleteEvent:function(){
     this.deleting=true
    },
    onSave:function(){
      this.saving = true;
    },
    onCancel:function(){
      this.menu = false;
    }
  }
  
})