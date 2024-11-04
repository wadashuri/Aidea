<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Memo;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(100)
            ->sequence(
                fn ($sequence) => [
                    'email' => 'test' . ($sequence->index + 1) . '@example.com',
                    'password' => 'test' . ($sequence->index + 1),
                ],
            )
            ->create()
            ->each(function ($user) {
                Memo::factory(5)->create([
                    'user_id' => $user->id,
                ]);
            });
    }
}