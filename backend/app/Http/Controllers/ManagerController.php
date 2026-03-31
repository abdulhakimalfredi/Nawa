<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
class ManagerController extends Controller
{
    public function login(Request $request)
{
    $request->validate([
        'email'    => 'required|email',
        'password' => 'required'
    ]);

    // جيب الـ user من الـ database
    $user = User::where('email', $request->email)->first();

    // تحقق من كل شي
    if (!$user || !Hash::check($request->password, $user->password) || $user->role !== 'manager') {
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'user'    => $user,
        'token'   => $token,
    ]);
}

public function trainees()
{
    // ارجع كل users اللي role = trainee
    return User::where('role', 'trainee')->get();
}

public function showTrainee($id)
{
    // ارجع user واحد بالـ id
    $user = User::findOrFail($id);

    return response()->json($user);
}
}
