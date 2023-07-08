<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $locations = Location::all();

        return response()->json(['data' => $locations]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $location = Location::create($validatedData);

        return response()->json(['data' => $location], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $location)
    {
        return response()->json(['data' => $location]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Location $location)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        $location->update($validatedData);

        return response()->json(['data' => $location]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Location $location)
    {
        $location->delete();

        return response()->json(null, 204);
    }
}
