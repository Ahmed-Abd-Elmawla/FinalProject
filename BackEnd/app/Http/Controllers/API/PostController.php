<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

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
        $data = $request->validate([
            "user_id" => 'required|integer',
            "category_id" => 'required|integer',
            "title" => 'required|string',
            "description" => "required",
            "price" => "required|numeric",
            "discount" => "nullable|numeric",
            "location" => "required|string",
            "images" => "required|array|min:5",
            "images.*" => "required|image"
        ]);
        $images = [];
        if ($request->has('images')) {
            $images_ = $request->file('images');
            foreach ($images_ as  $image) {
                $image_name = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('post_images'), $image_name);
                $images[] = $image_name;
            }
        }
        $new_post = Post::create([
            'user_id' => $data["user_id"],
            'category_id' => $data["category_id"],
            'title' => $data["title"],
            'description' => $data["description"],
            'price' => $data["price"],
            'discount' => $data["discount"] ?? 0,
            'location' => $data["location"],
            'images' => $images
        ]);
        return response()->json(['message' => 'Post created successfully', 'post' => $new_post]);
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
        // dd($request->all());
        $data = $request->validate([
            "category_id" => 'required|integer',
            "title" => 'required|string',
            "description" => "required",
            "price" => "required|numeric",
            "discount" => "nullable|numeric",
            "location" => "required|string",
            "images" => ["nullable", "array", "min:5"],
            "images.*" => "nullable"
        ]);
        $post->update([
            'category_id' => $data["category_id"],
            'title' => $data["title"],
            'description' => $data["description"],
            'price' => $data["price"],
            'discount' => $data["discount"] ?? 0,
            'location' => $data["location"]
        ]);

        $images = [];
        if ($request->has('images')) {
            foreach ($post->images as $img) {
                $imagePath = public_path('post_images/' . $img);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
            $images_ = $request->file('images');
            foreach ($images_ as  $image) {
                $image_name = time() . '_' . $image->getClientOriginalName();
                $image->move(public_path('post_images'), $image_name);
                $images[] = $image_name;
            }
            $post->update([
                'images' => $images
            ]);
            return response()->json(['message' => 'Post updated successfully', 'post' => $post]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if (!empty($post->images)) {
            foreach ($post->images as $image) {
                $imagePath = public_path('post_images/' . $image);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
        }
        $post->delete();
        return response()->json(['message' => 'Post deleted successfully']);
    }

    /**
     * Get posts by user_id.
     */
    public function getByUserId($user_id)
    {
        $posts = Post::where('user_id', $user_id)->get();
        return response()->json($posts);
    }

    /**
     * Get posts by category_id.
     */
    public function getByCategoryId($category_id)
    {
        $posts = Post::where('category_id', $category_id)->get();
        return response()->json($posts);
    }
}
