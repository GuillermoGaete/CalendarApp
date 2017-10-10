var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */
require('laravel-elixir-vueify');
elixir(function(mix) {
    mix.styles([
    	'css/app.css',
    	'css/fonts.css',
      'css/vuetify.min.css'
    ], 'public/css/app.css', 'resources/assets');
    mix.browserify(['components/calendar/controlMonth.js',
                    'components/calendar/EventListElement.js',
                    'components/calendar/dayBox.js',
                    'components/calendar/monthCalendar.js',
                    'components/calendar/embebedListEvent.js',
                    'components/calendar/menuEditEventFloating.js'
                   ], 'public/js/main.js');
});
