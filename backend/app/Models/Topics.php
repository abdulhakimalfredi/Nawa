<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topics extends Model
{
    public function topic()
{
    return $this->belongsTo(topics::class);  
} 
}
