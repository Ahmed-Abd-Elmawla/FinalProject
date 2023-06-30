<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PremiumPost;
use Illuminate\Http\Request;

class PremiumPostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request , Post $post)
    {
        $validatedData = $request->validate([
            'expire_date' => ['required', 'date'],
        ]);

        $premiumPost = new PremiumPost($validatedData);
        $post->premiumPost()->save($premiumPost);

        return response()->json($premiumPost, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {

        $premiumPost = $post->premiumPost();

        if (!$premiumPost) {
            return response()->json(['message' => 'Premium post not found'], 404);
        }

        return response()->json($premiumPost);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $validatedData = $request->validate([
            'expire_date' => ['required', 'date'],
        ]);

        $premiumPost = $post->premiumPost;

        if (!$premiumPost) {
            return response()->json(['message' => 'Premium post not found'], 404);
        }

        $premiumPost->update($validatedData);

        return response()->json($premiumPost);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $premiumPost = $post->premiumPost;

        if (!$premiumPost) {
            return response()->json(['message' => 'Premium post not found'], 404);
        }

        $premiumPost->delete();

        return response()->json(['message' => 'Premium post deleted']);
    }
    }

