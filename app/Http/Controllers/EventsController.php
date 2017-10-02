<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class EventsController extends Controller
{
    public function index(){
      $now = Carbon::now();
      $Actualday = $now->day;
      $initDayMonth=$now->subDays($Actualday);
      $initActualCalendar=$now->subDays(($initDayMonth->dayOfWeek)-1);
      return view('calendar')->with('dateInitCalendar',$initActualCalendar->toDateString());
    }
}
