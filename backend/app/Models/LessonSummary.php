<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Topics;
class LessonSummary extends Model
{
    protected $fillable = ['user_id', 'topic_id', 'summary', 'challenges'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function topic()
    {
        return $this->belongsTo(topics::class);
    }
}
