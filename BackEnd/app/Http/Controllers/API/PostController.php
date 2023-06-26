<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();
        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $post = new Post;
        $post->user_id  = $request->input('user_id');
        $post->title = $request->input('title');
        $post->description=$request->input('description');
        $post->price = $request->input('price');
        $post->discount = $request->input('discount');
        $post->location = $request->input('location');
        $post->cover = $request->input('cover');
        $post->images = $request->input('images');
        $post->save();

        return response()->json(['message' => 'Post created successfully', 'post' => $post]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return $post;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $post->title = $request->input('title');
        $post->description=$request->input('description');
        $post->price = $request->input('price');
        $post->discount = $request->input('discount');
        $post->location = $request->input('location');
        if($request->input('cover')){
            $post->cover = $request->input('cover');
        }
        if($request->input('images')){
            $post->images = $request->input('images');
        }
        $post->save();
        return response()->json(['message' => 'Post updated successfully', 'post' => $post]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }
}
