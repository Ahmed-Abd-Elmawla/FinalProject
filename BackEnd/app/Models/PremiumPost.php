<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PremiumPost extends Model
{
    use HasFactory;
    
    protected $fillable = ['post_id', 'expire_date'];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
