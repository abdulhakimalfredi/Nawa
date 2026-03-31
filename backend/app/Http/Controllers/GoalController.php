<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;

class GoalController extends Controller
{
    // المتدرب يضيف هدف
    public function store(Request $request)
    {
        $request->validate([
            'goal' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date'
        ]);

        $goal = Goal::create([
            'user_id' => $request->user()->id,
            'goal' => $request->goal,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date
        ]);

        return response()->json($goal, 201);
    }

    // المتدرب يحدث حالة الهدف
    public function update(Request $request, $id)
    {
        $goal = Goal::where('id', $id)
            ->where('user_id', $request->user()->id)
            ->firstOrFail();

        $goal->update(['status' => $request->status]);

        return response()->json($goal);
    }

    // المتدرب يشوف أهدافه
    public function myIndex(Request $request)
    {
        $goals = Goal::where('user_id', $request->user()->id)->get();

        return response()->json($goals);
    }

    // المدير يشوف كل الأهداف
    public function index()
    {
        $goals = Goal::with('user')->get();

        return response()->json($goals);
    }
}