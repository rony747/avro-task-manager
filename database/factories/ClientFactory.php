<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
          'name' => fake()->name(),
          'email' => fake()->optional()->safeEmail(),
          'phone' => fake()->optional()->phoneNumber(),
          'address' => fake()->optional()->address(),
          'company' => fake()->optional()->company(),
          'website' => fake()->optional()->url(),
          'image' => fake()->optional()->imageUrl(640, 480, 'people', true),
          'user_id' => User::factory(),
        ];
    }
}
