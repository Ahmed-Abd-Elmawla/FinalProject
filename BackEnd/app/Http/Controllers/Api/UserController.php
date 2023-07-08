<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\returnSelf;

class UserController extends Controller
{


    public function register(Request $request)
    {


        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:15|max:255',
            'number' => 'required|unique:users|min:11|max:11',
            'id' => 'required|unique:users|min:14|max:14',
            "images" => "required|array|min:2|max:2",
            "images.*" => "required|image",
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required',
            "cover" => "required|image",
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $images = [];
        if ($request->has('images')) {
            $files = $request->file('images');
            foreach ($files as  $file) {
                $filename = time() . $file->getClientOriginalName();
                // $path = $file->storeAs('public/images', $filename);
                // $url = Storage::url($path);
                $file->move(public_path('users_images'), $filename);
                $images[] = $filename;
            }
        }


        $file_ = $request->file('cover');
        $filename_ = time() . $file_->getClientOriginalName();
        // $path_ = $file->storeAs('public/images', $filename_);
        //   $url_=Storage::url($path_);
        $file_->move(public_path('users_images'),$filename_);

        $user = User::create([
            'name' =>$request->name,
            'number' =>$request->number,
            'personal_id' => $request->id,
            'images' => json_encode($images),
            'cover' =>$filename_,
            'email' =>$request->email,
            'password' => Hash::make($request->password),
            'role_id' => 3
        ]);

        Auth::login($user);
        $user->last_seen_at = now();
        $user->save();

        return response(auth()->user());
    }



    public function login(Request $request)
    {

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            if ($user->status == 'pending') {
                return response()->json(['message' =>true]);
            } elseif ($user->status == 'verified') {
                $user->last_seen_at = now();
                $user->save();
                return response()->json(auth()->user());
            }
        }else {
                return response()->json(['message' =>false]);
            }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {
        if (!empty($user->images)) {
            $images = json_decode($user->images, true);
            foreach ($images as $img) {
                // $imagePath = 'public/images/' . $img;
                $imagePath = public_path('users_images/' . $img);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
        }
        if (!empty($user->cover)) {
                $img =$user->cover;
                // $imagePath = 'public/images/' . $img;
                $imagePath = public_path('users_images/' . $img);
                if (file_exists($imagePath)) {
                    unlink($imagePath);
                }
        }
        $user->delete();
        return response()->json(['message' => 'user deleted successfully']);

    }

    public function getAllUsers()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function getUserById($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function updateUser(Request $request, user $user)
    {
        if ($request->has('role_id')) {
            $user->update([
                'role_id' => $request->role_id
            ]);
            return response()->json(['message' => 'Role updated successfully']);
        }

        if ($request->has('status')) {
            $user->update([
                'status' => $request->status
            ]);
            return response()->json(['message' => 'Status updated successfully']);
        }

            $request->validate([
            'name' => 'required|string|min:15|max:255',
            'email' => 'required|string|email|max:255|unique:categories,category_name,' . $user->id . '',
            'password' => 'nullable|min:8',
            "cover" => "nullable|image",
        ]);

        // if ($validator->fails()) {
        //     return response()->json(['errors' => $validator->errors()], 422);
        // }

        if ($request->has('cover')) {
            $img = $user->cover;
            $imagePath = public_path('users_images/' . $img);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
            $image = $request->file('cover');
            $image_name = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('users_images'), $image_name);
            $user->update([
                'cover' => $image_name,
            ]);
        }

        if ($request->has('password')) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['message' => 'User updated successfully']);

    }

    public function getUsersByStatus($status)
    {
        $users = User::where(['status'=>$status])->get();
        return response()->json($users);
    }
}
