<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    $tasks = Task ::with('user', 'client')
      -> orderByRaw("CASE 
        WHEN status = 'pending' THEN 1
        WHEN status = 'in_progress' THEN 2
        WHEN status = 'on_hold' THEN 3
        ELSE 4
    END,
    CASE 
        WHEN priority = 'high' THEN 1
        WHEN priority = 'medium' THEN 2
        WHEN priority = 'low' THEN 3
        ELSE 4
    END")
      -> get();
    return inertia('Tasks/Index', compact('tasks'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    $clients = Client ::with('user') -> get();
    return inertia('Tasks/Create', compact('clients'));
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request -> validate([
      'title'       => 'required',
      'description' => 'nullable',
      'price'       => 'nullable',
      'status'      => 'nullable|in:pending,in_progress,completed,on_hold',
      'priority'    => 'nullable|in:high,medium,low',
      'due_date'    => 'nullable|date',
      'notes'       => 'nullable',
      'client_id'   => 'required|exists:clients,id',
      'user_id'     => 'nullable|exists:users,id',
    ]);
    try {
      Task ::create([
        'title'       => $request -> title,
        'description' => $request -> description,
        'price'       => $request -> price,
        'status'      => $request -> status,
        'priority'    => $request -> priority,
        'due_date'    => $request -> due_date,
        'notes'       => $request -> notes,
        'client_id'   => $request -> client_id,
        'user_id'     => Auth ::user() -> id,
      ]);
      return redirect() -> route('tasks.index') -> with([
        'success' => 'Task created successfully'
      ]);

    } catch (\Exception $e) {
      return redirect() -> back() -> with([
        'error' => 'Failed to create task: ' . $e -> getMessage()
      ]);
    }
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $task = Task ::with('user', 'client') -> findOrFail($id);
    return inertia('Tasks/Show', compact('task'));
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(string $id)
  {
    $clients = Client ::with('user') -> get();
    $task = Task ::with('user', 'client') -> findOrFail($id);
    return inertia('Tasks/Edit', compact('task', 'clients'));
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $request -> validate([
      'title'       => 'required',
      'description' => 'nullable',
      'price'       => 'nullable',
      'status'      => 'nullable|in:pending,in_progress,completed,on_hold',
      'priority'    => 'nullable|in:high,medium,low',
      'due_date'    => 'nullable|date',
      'notes'       => 'nullable',
      'client_id'   => 'required|exists:clients,id',
      'user_id'     => 'nullable|exists:users,id',
    ]);
    try {
      Task ::findOrFail($id) -> update([
        'title'       => $request -> title,
        'description' => $request -> description,
        'price'       => $request -> price,
        'status'      => $request -> status,
        'priority'    => $request -> priority,
        'due_date'    => $request -> due_date,
        'notes'       => $request -> notes,
        'client_id'   => $request -> client_id,
        'user_id'     => Auth ::user() -> id,
      ]) ;
      return redirect() -> route('tasks.index') -> with([
        'success' => 'Task Updated successfully'
      ]);

    } catch (\Exception $e) {
      return redirect() -> back() -> with([
        'error' => 'Failed to update task: ' . $e -> getMessage()
      ]);
    }
  }

  public function updateStatus(Task $task, Request $request)
  {
    $validated = $request -> validate([
      'status' => ['required', 'string', 'in:pending,in_progress,completed,on_hold'],
    ]);
    try {
      $task -> update([
        'status' => $validated[ 'status' ]
      ]);
      return redirect() -> back() -> with([
        'error' => 'Task status updated successfully'
      ]);

    } catch (\Exception $e) {
      return redirect() -> back() -> with([
        'error' => 'Failed to update task status'
      ]);
    }
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    try {
      $task = Task::findOrFail($id);
      $task->delete();

      return redirect()->back()->with([
        'success' => 'Task deleted successfully'
      ]);
    } catch (\Exception $e) {
      return redirect()->back()->with([
        'error' => 'Failed to delete task'
      ]);
    }
  }
}
