<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Broadcast::routes();


        Broadcast::channel('online-status', function ($user) {
            return true; // Change this logic based on your authentication requirements
        });
    
        Broadcast::event(UserStatusChanged::class, function ($event) {
            return [
                'userId' => $event->userId,
                'lastSeenAt' => $event->lastSeenAt,
                'isOnline' => $event->isOnline,
            ];
        });
    }
    
        // require base_path('routes/channels.php');
}
