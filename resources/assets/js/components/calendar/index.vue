

<template>
<v-app id="example-1" toolbar footer>
    <v-navigation-drawer
      persistent
      light
      enable-resize-watcher
      absolute
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Calendario</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Reservar</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      </v-navigation-drawer>
    
    
    <v-toolbar class="indigo darken-2" dark fixed>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
          Estado de sala
      </v-toolbar-title>
    </v-toolbar>
    
    <main class="pt-5">

    </main>
    <v-footer class="indigo darken-2">
      <span class="white--text">Metalsa 2017</span>
    </v-footer>
 </v-app>


</template>

<script>
import monthCalendar from './monthCalendar.vue';
export default {
  data () {
      return {
        offsetMonth:0,
        offsetDay: 0,
        offsetWeek:0,
        drawer:1,
        date:0
      };
   },
   props: {
 
   }, 
   computed: {
      
   },
   methods: {
     
   },
   template:'
   
   '
   components: { monthCalendar }

};
</script>

<style>

</style>




