<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Premium;
use Illuminate\Http\Request;

class PremiumController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $premiums = Premium::all();

        return response()->json($premiums);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $data = $request->validate([
            'post_id' => 'required|exists:posts,id',
            'expire_date' => 'required|date'
        ]);





        $premium = Premium::create($data);
        return response()->json($premium);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $premium = Premium::find($id);

        return response()->json($premium);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'expire_date' => 'required|date'
        ]);

        $premium = Premium::find($id);

        $premium->update([
            'expire_date' => $request->expire_date
        ]);

        return response()->json($premium);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $premium = Premium::find($id);

        $premium->delete();

        return response()->json(['message' => 'Premium post deleted successfully']);
    }
}

