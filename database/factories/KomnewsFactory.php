<?php

namespace Database\Factories;

use App\Models\Komnews;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Komnews>
 */
class KomnewsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(mt_rand(2, 10)),
            'slug' => $this->faker->slug(),
            'content' => $this->faker->paragraph(5, 20),
            'image' => $this->faker->imageUrl(640, 480, 'animals', true)
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Komnews $komnews) {
            $categories = Category::inRandomOrder()->take(rand(1, 6))->pluck('id');
            $komnews->categories()->attach($categories);
        });
    }
}
