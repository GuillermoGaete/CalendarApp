<template>
            <v-card v-bind:class="{ 'indigo lighten-4': isDisplayedMonth, 'blue lighten-4': isCurrentMonth,'box-today':isToday}" height="80px" style="padding: 2px">
                            <v-card-text  class="pa-0">
                                                <p v-if="isToday==true" class='text-xs-right'><b>{{Number(day.format('DD')).toString()}}</b></p>
                                                <p v-else class="text-xs-right">{{Number(day.format('DD')).toString()}}</p>
                            </v-card-text>
            </v-card>
</template>

<script>
export default {
    props: ["isToday","isDisplayedMonth","isCurrentMonth","day"], 

    computed: {
      
    },
    methods: {
     
    }
};
</script>

<style>

</style>