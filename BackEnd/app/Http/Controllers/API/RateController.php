<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Rate;

class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = $request->input('user_id');
        $ownerId = $request->input('owner_id');

    $rates = Rate::where('user_id', $userId)
                 ->where('owner_id', $ownerId)
                 ->get();

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
    }

    /**
     * Display the specified resource.
     */
    // public function show(Rate $rate)
    // {
    //     return response()->json($rate);
    // }

    /**
     * Update the specified resource in storage.
     */
    // public function update(Request $request, Rate $rate)
    // {
    //     $rate->update($request->all());
    //     return response()->json($rate);
    // }

    /**
     * Remove the specified resource from storage.
     */
    // public function destroy(Rate $rate)
    // {
    //     $rate->delete();
    //     return response()->json(null, 204);
    // }

    // // display average rate
    // public function showAverageRate($userId)
    // {
    //     $averageRate = Rate::where('user_id', $userId)
    //                        ->avg('rate');

    //     return response()->json([
    //         'userId' => $userId,
    //         'averageRate' => $averageRate
    //     ]);
    // }
}

