<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "category_name" => 'required|unique:categories|max:25',
            "cover" => "required|image",
        ]);

        $cover = $request->file('cover');
        $cover_name = time() . '_' . $cover->getClientOriginalName();
        $cover->move(public_path('categories_images'), $cover_name);
        $data['cover'] = $cover_name;

        $category = Category::create([
            'category_name' => $data['category_name'],
            'cover' => $data['cover']
        ]);

        return response()->json(['message' => 'Category created successfully', 'Category' => $category]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return $category;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        // dd($request->all());
        $request->validate([
            'category_name' => 'required|unique:categories,category_name,' . $category->id . '|max:25',
            "cover" => "nullable|image",
        ]);
        if ($request->has('cover')) {
            // $old_cover = $category->cover;
            // $cover_path = public_path('categories_images/' . $old_cover);
            // if (file_exists($cover_path)) {
            //     unlink($cover_path);
            // }
            $cover = $request->file('cover');
            $cover_name = time() . '_' . $cover->getClientOriginalName();
            $cover->move(public_path('categories_images'), $cover_name);
            $category->update([
                'cover' => $cover_name,
            ]);
        }
        $category->update([
            'category_name' => $request->category_name,
        ]);

        return response()->json(['message' => 'Category updated successfully', 'Category' => $category]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $old_cover = $category->cover;
        $cover_path = public_path('categories_images/' . $old_cover);
        if (file_exists($cover_path)) {
            unlink($cover_path);
        }
        $category->delete();
        return response()->json(['message' => 'category deleted successfully']);
    }
}
