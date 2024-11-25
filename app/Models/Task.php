<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;
  protected $guarded = [];

  public function user()
  {
    return $this->belongsTo(User::class);
  }
  public function client()
  {
    return $this->belongsTo(Client::class);
  }

}
