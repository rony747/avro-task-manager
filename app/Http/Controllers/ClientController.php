<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $clients = Client::with('user', 'tasks')->latest()->get();
        return inertia('Clients/Index', compact('clients'));

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $request->validate([
           'name' => 'required',
           'email' => 'nullable|email',
           'phone' => 'nullable',
           'address' => 'nullable',
           'company' => 'nullable',
           'website' => 'nullable|url',
           'image' => 'nullable|image',
       ]);

       $client = new Client();
       $client->name = $request->name;
       $client->email = $request->email;
       $client->phone = $request->phone;
       $client->address = $request->address;
       $client->company = $request->company;
       $client->website = $request->website;
       $client->user_id = auth()->user()->id;

       if ($request->hasFile('image')) {
           $image = $request->file('image');
           $imageName = time() . '.' . $image->getClientOriginalExtension();
           $image->move(public_path('clients_images'), $imageName);
           $client->image = $imageName;
       }

       $client->save();

     return redirect()->route('clients.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
    public function destroy(Client $client)
    {
      try {
        $client->delete();
        return redirect()->back()->with('success', 'Client deleted successfully');
      } catch (\Exception $e) {
        return redirect()->back()->with('error', 'Failed to delete client');
      }
    }
}
