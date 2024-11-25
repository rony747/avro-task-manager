<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
Route ::middleware('auth') -> group(function () {
  Route ::get('/', function () {
    return Inertia ::render('Home');
  }) -> name('home');
  Route ::get('/dashboard', function () {
    return Inertia ::render('Dashboard');
  }) -> name('dashboard');

//Clients Routes
  Route ::get('/clients', [ClientController::class, 'index']) -> name('clients.index');
  Route ::post('/clients', [ClientController::class, 'store']);
  Route ::delete('/clients/{client}', [ClientController::class, 'destroy']) -> name('clients.destroy');
  Route::patch('/clients/{id}', [ClientController::class, 'update'])
  ->name('clients.update');

  //Tasks Routes
  Route ::get('/tasks', [TaskController::class, 'index'])-> name('tasks.index');
  Route ::get('/tasks/create', [TaskController::class, 'create']) -> name('tasks.create');
  Route ::get('/tasks/view/{id}', [TaskController::class, 'show']) -> name('tasks.show');
  Route::put('/tasks/{task}/status', [TaskController::class, 'updateStatus'])
    ->name('tasks.update-status');
  Route ::post('/tasks', [TaskController::class, 'store']);
  Route ::delete('/tasks/{id}', [TaskController::class, 'destroy']) -> name('tasks.destroy');
  Route ::get('/tasks/{id}/edit', [TaskController::class, 'edit']) -> name('tasks.edit');
  Route::patch('/tasks/{id}', [TaskController::class, 'update'])
    ->name('tasks.update');


  //Invoices Routes
  Route ::get('/invoices', [InvoiceController::class, 'index']) -> name('invoices.index');

});



Route ::middleware('auth') -> group(function () {
  Route ::get('/profile', [ProfileController::class, 'edit']) -> name('profile.edit');
  Route ::patch('/profile', [ProfileController::class, 'update']) -> name('profile.update');
  Route ::delete('/profile', [ProfileController::class, 'destroy']) -> name('profile.destroy');
});
require __DIR__ . '/auth.php';
