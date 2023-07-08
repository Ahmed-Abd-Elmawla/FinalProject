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

        $url='';

            $validator = Validator::make($request->all(), [
              'name' => 'required|string|max:255',
              'number' => 'required',
              'id' => 'required',
              'image' => 'required',
              'email' => 'required|string|email|max:255|unique:users',
              'password' => 'required'
            ]);

            if ($validator->fails()) {
              return response()->json(['errors' => $validator->errors()], 422);
            }

            if($request->hasFile('image')){

              $file=$request->file('image');
              $filename=time().$file->getClientOriginalName().'.'. $file->getClientOriginalExtension();
              $path=$file->storeAs('public/images',$filename);
                $url=Storage::url($path);

            }
            $user = User::create([
              'name' => $request->name,
              'number'=>$request->number,
              'personal_id'=>$request->id,
              'image'=>$url,
              'email' => $request->email,
              'password' => Hash::make($request->password),
              'role_id'=>3
            ]);

            Auth::login($user);
            $user->last_seen_at = now();
            $user->save();

// event(new UserStatusChanged($user->id, $user->last_seen_at, true));

            return response(auth()->user());

    }



    public function login(Request $request)
    {

            $credentials = $request->only('email', 'password');
            if (Auth::attempt($credentials)) {
              $user = Auth::user();
              $user->last_seen_at = now();
              $user->save();

               return response()->json(auth()->user());

            } else {
              return response()->json(['message' => 'Login failed']);
            }


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
}
