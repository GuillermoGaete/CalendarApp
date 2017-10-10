<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Event extends Model
{
     protected $table = 'events';
  
     public function user()
    {
        return $this->belongsTo('App\User');
    }
}
