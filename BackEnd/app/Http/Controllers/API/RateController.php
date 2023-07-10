<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rate;
class RateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $userId = $request->input('user_id');
        // $ownerId = $request->input('owner_id');

        // $rates = Rate::where('user_id', $userId)
        //             ->where('owner_id', $ownerId)
        //             ->get();
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
        $rate->post_id = $request->input('post_id');
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
    public function update(Request $request, Rate $rate)
    {
        $rate->update($request->all());
        return response()->json($rate);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Rate $rate)
    {
        $rate->delete();
        return response()->json(null, 204);
    }

    public function getUserRate($post_id,$user_id)
    {
        $rate = Rate::where(['post_id'=> $post_id,'user_id'=>$user_id])->get();
        return response()->json($rate);
    }
    public function getPostRates($post_id)
    {
        $rate = Rate::where(['post_id'=> $post_id])->get();
        return response()->json($rate);
    }
}
