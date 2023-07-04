<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\NewChatMessage;


class ChatController extends Controller
{
    public function sendMessage(Request $request)
    {
        $message = Message::create([
            'sender_id' => $request->input('sender_id'),
            'receiver_id' => $request->input('receiver_id'),
            'message' => $request->input('message'),
        ]);

        event(new NewChatMessage($message));

        return new Response(['success' => true], 200, [
            'Content-Type' => 'multipart/form-data',
        ]);
    }   
    
}

