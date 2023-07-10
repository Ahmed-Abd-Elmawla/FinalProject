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
        $rates = Rate::where(['post_id'=> $request->input('post_id'),'user_id'=>$request->input('user_id')])->get();
        if(count($rates)>0){
            $rate = $rates->first();
            $rate->rate_value = $request->input('rate_value');
            $rate->save();
            return response()->json(['message' => 'Rate updated successfully']);
        }else{
        $rate = new Rate();
        $rate->rate_value = $request->input('rate_value');
        $rate->user_id = $request->input('user_id');
        $rate->owner_id = $request->input('owner_id');
        $rate->post_id = $request->input('post_id');
        $rate->save();
        return response()->json(['message' => 'Rate created successfully']);
    }
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

    public function getUserRate($post_id,$user_id)
    {
        $rate = Rate::where(['post_id'=> $post_id,'user_id'=>$user_id])->get();
        return response()->json($rate);
    }
    public function getPostRate($post_id)
    {
        // dd($post_id);
        $rates = Rate::where('post_id', $post_id)->get();
        return response()->json($rates);
    }
}

