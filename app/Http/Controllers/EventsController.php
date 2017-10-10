<?php

namespace App\Http\Controllers;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Event as Event;

class EventsController extends Controller
{
    public function getDisplayedInitDate($offsetMonth=0){
      $now = Carbon::now();
      if($offsetMonth<0){
       $now=$now->subMonths(-1*($offsetMonth)); 
      }else{
       $now=$now->addMonths($offsetMonth);  
      }
      
      $Actualday = $now->day;
      $initDayMonth=$now->subDays($Actualday);
      $initActualCalendar=$now->subDays(($initDayMonth->dayOfWeek)-1);
      $initActualCalendar->hour=0;
      $initActualCalendar->minute=0;
      $initActualCalendar->second=0;
      return $initActualCalendar;
    }
    public function getDisplayedLastDate($offsetMonth=0){
      $initDate=$this->getDisplayedInitDate();
      $initDate->addDays(31);
      return $initDate;
    }
    public function getDisplayedEvents($offsetMonth=0){ 
        $InitDate=$this->getDisplayedInitDate($offsetMonth);
        $EndDate=$this->getDisplayedLastDate($offsetMonth);
        $events=Event::where('init','>=',$InitDate)->where('init','<=',$EndDate)->orderBy('init', 'asc')->with('user')->get();
        return view('calendar')->with('events',$events->toJson());
      }
   public function getOffsetEvents($offsetMonth=0){ 
        $InitDate=$this->getDisplayedInitDate($offsetMonth);
        $EndDate=$this->getDisplayedLastDate($offsetMonth);
        $events=Event::where('init','>=',$InitDate)->where('init','<=',$EndDate)->orderBy('init', 'asc')->with('user')->get();
        return response()->json($events);
      }
}
