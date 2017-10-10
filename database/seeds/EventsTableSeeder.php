<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $faker = Faker\Factory::create();
       $limit = 20;

        for ($i = 0; $i < $limit; $i++) {
            DB::table('users')->insert([ //,
                'name' => $faker->name,
                'email' => $faker->unique()->email,
                'password' => $faker->word
            ]);
        }
      
        $limit = 500;

        for ($i = 0; $i < $limit; $i++) {
              $startDate = Carbon::createFromTimeStamp($faker->dateTimeBetween('-1 years','now')->getTimestamp());              
              $startDate->minute=$faker->randomElement($array = array (0,30));
              $startDate->hour=$faker->randomElement($array = array (8,9,10,11,12,13,14,15,16,17,18,19,20));
              $startDate->second=0;          
              $endDate = Carbon::createFromFormat('Y-m-d H:i:s', $startDate)->addMinutes($faker->randomElement($array = array (30,60,90,120,60,60,30,60)));
         
            DB::table('events')->insert([ //,
                'description' => $faker->sentence($nbWords = 6, $variableNbWords = true),
                'init' => $startDate,
                'end' => $endDate,
                'user_id'=>$faker->randomElement($array = array (1,2,3,4))
            ]);
        }
    }
}
