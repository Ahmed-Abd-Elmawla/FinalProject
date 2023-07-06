<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rate;
class NewRateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rates = Rate::all();
        return response()->json($rates);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rate = new Rate();
        $rate->rate_value = $request->input('rate_value');
        $rate->user_id = $request->input('user_id');
        $rate->owner_id = $request->input('owner_id');
        $rate->save();

        return response()->json(['message' => 'Rate created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Rate $rate)
    {
        return response()->json($rate);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rate $rate)
    {
        $rate->delete();
        return response()->json(null, 204);
    }
}

