<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Mail\ContactMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $messages = Contact::all();
        return response()->json($messages);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => ['required', 'string', 'max:15'],
            'last_name' => ['required', 'string', 'max:15'],
            'email' => ['required', 'email', 'max:100'],
            'message' => ['required', 'string', 'max:500'],
        ]);

        Contact::create([
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'message' => $data['message'],
        ]);
        return response()->json(['message' => 'message recorded successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $contact->update([
            'status' => $request->status
        ]);
        return response()->json(['message' => "Status has been updated."]);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(['message' => 'Message deleted successfully']);
    }

    public function sendEmail(Request $request)
    {
        $data = $request->validate([
            'subject' => ['required','string','max:100'],
            'title'   => ['required','string','max:100'],
            'email'    => ['required','email','max:100'],
            'message' => ['required','string','max:1000'],
        ]);

        Mail::to($data['email'])->send(new ContactMail($data));
        return response()->json(['message' => 'Email sent successfully']);
    }
}
