<?php

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema ::create('tasks', function (Blueprint $table) {
      $table -> id();
      $table -> string('title');
      $table -> text('description') -> nullable();
      $table -> string('price') -> nullable();
      $table -> enum('status', ['pending', 'in_progress', 'completed', 'on_hold']) -> default('pending');
      $table -> enum('priority', ['low', 'medium', 'high']) -> default('medium');
      $table -> date('due_date') -> nullable();
      $table -> text('notes') -> nullable();
      $table -> foreignIdFor(User::class) -> nullable() -> constrained() -> cascadeOnDelete();
      $table -> foreignIdFor(Client::class) -> nullable() -> constrained() -> cascadeOnDelete();
      $table -> timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema ::dropIfExists('tasks');
  }
};
