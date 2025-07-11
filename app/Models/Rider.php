<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphOne;

class Rider extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
    ];

    public function user(): MorphOne
    {
        return $this->morphOne(User::class, 'userable');
    }

    public function mealAssignments()
    {
        return $this->hasMany(MealAssignment::class);
    }
}
