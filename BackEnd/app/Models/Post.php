<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $guarded =[];
    protected $casts = [
        'images' => 'array',
    ];
    public function premiumPost()
    {
        return $this->hasOne(PremiumPost::class);
    }
}
