<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TopicController extends Controller
{
    public function index(){
        $topics = DB::table('topics')->get(); 
        return response()->json($topics); 
    }
}
