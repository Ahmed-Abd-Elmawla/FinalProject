<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        $users = [
            
            [
                'name' => 'ahmedabdalmawla',
                'email' => 'ahmed@gmail.com',
                'password' => bcrypt('12345678'),
                'personal_id'=>'12345678911123',
                'image'=>'image',
                'number'=>'01112345678',
                'role_id'=>1,
            ],

            [
                'name' => 'helalabdalla',
                'email' => 'helal@example.com',
                'password' => bcrypt('12345678'),
                'personal_id'=>'12345678911123',
                'image'=>'image',
                'number'=>'01112345678',
                'role_id'=>1,
            ],
          
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}


// php artisan db:seed --class=UsersTableSeeder