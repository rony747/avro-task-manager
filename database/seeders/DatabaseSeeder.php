<?php

namespace Database\Seeders;

use App\Models\Client;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    // User::factory(10)->create();
    $user =  User ::factory() -> create([
      'name'     => 'touhidul islam',
      'email'    => 'touhid_rony@yahoo.com',
      'password' => 'rony747$$',
    ]);
    // Create clients associated with the single user
    Client::factory(5)
      ->state(['user_id' => $user->id])
      ->create();

    // Create tasks associated with random clients and the single user
    Task::factory(10)
      ->state(function () use ($user) {
        return [
          'user_id' => $user->id,
          'client_id' => Client::inRandomOrder()->first()->id
        ];
      })
      ->create();

  }
}
