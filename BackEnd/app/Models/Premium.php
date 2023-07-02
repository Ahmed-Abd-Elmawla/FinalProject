<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Premium extends Model
{
    use HasFactory;
    protected $table = "premiums";
    protected $fillable = [
        'post_id',
        'expire_date'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
