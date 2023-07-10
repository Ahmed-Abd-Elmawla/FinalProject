<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['user', 'category'])->get();
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
            Post::create([
            'user_id' => $data["user_id"],
            'category_id' => $data["category_id"],
            'title' => $data["title"],
            'description' => $data["description"],
            'price' => $data["price"],
            'discount' => $data["discount"] ?? 0,
            'location' => $data["location"],
            'images' => $images
        ]);
        return response()->json(['message' => 'Post created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show($post)
    {
        $post_ = Post::with(['user', 'category'])->where(['id'=> $post,'status'=>'published'])->get();
        return $post_;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)

    {
        if ($post->status === 'pending') {
            return response()->json(['message' => "Cannot update a pending post."], 403);
        }
        if ($request->has('status')) {
            $request->validate([
                'status' => ['required', Rule::in(['published', 'stopped'])],
            ]);
            $post->update([
                'status' => $request->status
            ]);
            return response()->json(['message' => "Status has been updated."]);
        }
        $data = $request->validate([
            "category_id" => 'required|integer',
            "title" => 'required|string',
            "description" => "required",
            "price" => "required|numeric",
            "discount" => "nullable|numeric",
            "location" => "required|string",
            "images" => ["nullable", "array", "min:5"],
            "images.*" => "nullable",
        ]);

            $post->update([
                'category_id' => $data["category_id"],
                'title' => $data["title"],
                'description' => $data["description"],
                'price' => $data["price"],
                'discount' => $data["discount"] ?? 0,
                'location' => $data["location"],
                'status'=>'pending'
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
                'images' => $images,
                'status'=>'pending'
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
        $posts = Post::with(['user', 'category'])->where(['category_id'=> $category_id,'status'=>'published'])->get();
        return response()->json($posts);
    }

    /**
     * Update post status only.
     */
    public function updateStatus(Request $request, Post $post)
    {
        $post->update([
            'status' => $request->status
        ]);
        return response()->json(['message' => "Post status updated."]);
    }

    /**
     * Get posts by category_id.
     */
    public function getByStatus($status)
    {
        $posts = Post::with(['user', 'category'])->where('status', $status)->get();
        return response()->json($posts);
    }

    public function search($col, $pattern)
    {
        $query = Post::with(['user', 'category'])->where(['status'=>'published']);

        $query->where(function($q) use ($col, $pattern) {
            $q->where($col, 'like', '%'.$pattern.'%');
        });

        $posts = $query->get();

        return response()->json($posts);
    }
}
