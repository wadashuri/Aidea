<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class MemoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence,
            'content' => json_encode([[
                'id' => (string) \Illuminate\Support\Str::uuid(),  // 各ブロックに一意のIDを設定
                'type' => 'paragraph',
                'props' => [
                    'textColor' => 'default',
                    'textAlignment' => 'left',
                    'backgroundColor' => 'default',
                ],
                'content' => [[
                    'text' => '',
                    'type' => 'text',
                    'styles' => (object) [],  // 空のオブジェクトをstylesとして設定
                ]],
                'children' => []
            ]]),
        ];
    }
}
