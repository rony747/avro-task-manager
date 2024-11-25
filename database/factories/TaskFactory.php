<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'title' => fake()->sentence(rand(3, 8)),
          'description' => fake()->optional(0.8)->paragraphs(rand(1, 3), true),
          'price' => fake()->optional(0.7)->randomFloat(2, 50, 5000),
          'status' => fake()->randomElement(['pending', 'in_progress', 'completed', 'on_hold']),
          'priority' => fake()->randomElement(['low', 'medium', 'high']),
          'due_date' => fake()->optional(0.9)->dateTimeBetween('now', '+3 months'),
          'notes' => fake()->optional(0.6)->paragraphs(rand(1, 2), true),
          'user_id' => User::factory(),
          'client_id' => Client::factory(),
        ];
    }
}
