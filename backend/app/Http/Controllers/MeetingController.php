<?php

namespace App\Http\Controllers;

use App\Models\Meeting;
use Illuminate\Http\Request;

class MeetingController extends Controller
{
   
    public function index()
    {
        $meetings = Meeting::OrderBy('date', 'desc')->get(); 
            return response()->json($meetings); 
    }

   
    public function store(Request $request)
    {
        $request->validate([
            'title'=>'required|string|max:25',
            'date'=>'required|date',
            'time'=>'required',
        ]);
        $meeting = Meeting::create($request->only(['title','date','time']));
        return response()->json($meeting,201); 
    }

    public function destroy(Meeting $meeting)
    {
        $meeting->delete();
        return response()->json(['message'=> 'deleted']);
    }
}
