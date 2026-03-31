<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LessonSummary;
class LessonSummaryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'topic_id' => 'required|exists:topics,id',
            'summary' => 'required|string',
            'challenges' => 'nullable|string',
        ]);

        $Summary = LessonSummary::create([
            'user_id' => auth()->id(),
            'topic_id' => $request->topic_id,
            'summary' => $request->summary,
            'challenges' => $request->challenges,
        ]);

        return response()->json($Summary, 201);
    }
    // المتدرب يشوف ملخصاته
    public function myIndex(Request $request)
    {
        $summaries = LessonSummary::where('user_id', $request->user()->id)
            ->with('topic')
            ->get();

        return response()->json($summaries);
    }

    // المدير يشوف كل الملخصات
    public function index()
    {
        $summaries = LessonSummary::with(['user', 'topic'])->get();

        return response()->json($summaries);
    }

    // ملخصات متدرب معين (للمدير)
// ملخصات متدرب معين (للمدير)
    public function trainee($id)
    {
        $summaries = LessonSummary::where('user_id', $id)
            ->with('topic')
            ->get();

        return response()->json($summaries);
    }
}
