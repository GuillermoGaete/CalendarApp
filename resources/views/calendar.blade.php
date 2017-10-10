<!DOCTYPE html>
<html>
<head>
 <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet">
 <link href="css/app.css" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
  <link rel="stylesheet" href="css/font-awesome.min.css">
 <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
 <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/locale/es.js"></script>
 <script src="https://unpkg.com/vue/dist/vue.js"></script>
 <script src="https://unpkg.com/vuetify/dist/vuetify.js"></script>
 <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
 <script src="js/main.js"></script>

</head>
<body>

  
  
 <div id="app">
  >
  <template>
  <v-app id="example-1" toolbar footer>
   
    <v-navigation-drawer
      persistent
      v-model="drawer"
      light
      enable-resize-watcher
      absolute
    >
      <v-list dense>
        <v-list-tile @click="hola('HOME')">
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
       <transition
             name="fade"
              >  
      <monthcalendar 
         :initial-offset-month="offsetMonth"
         :initial-offset-day="offsetDay"
         :initial-offset-week="offsetWeek"
         :initial-events="eventsInit"              
         ></monthcalendar> </transition>
    </main>
    <v-footer fixed class="indigo darken-2">
      <span class="white--text">Metalsa 2017</span>
    </v-footer>
  </v-app>
</template>
 </div>





 <script>
 /* global Vue*/
 /* global date*/
 /* global moment*/
   var App = new Vue({ 
       el: '#app',
       data:{
         drawer: true,
         offsetMonth:0,
         offsetDay:0,
         offsetWeek:0,
         show:true,
         eventsInit: {!!$events!!}
       },
     methods:{
       hola:function(data){
         alert("hiciste click en "+data)
       }
     }
   })

        
 </script>

</body>
</html>
