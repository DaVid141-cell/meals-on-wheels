<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meal extends Model
{
    protected $fillable = ['name', 'meal_tag', 'preparation_time', 'image_path', 'kitchen_partner_id'];

    public function mealAssignments()
    {
        return $this->hasMany(MealAssignment::class);
    }

    public function ingredients()
    {
        return $this->hasMany(Ingredients::class);
    }

    public function kitchenPartner()
    {
        return $this->belongsTo(KitchenPartner::class, 'kitchen_partner_id');
    }
}
