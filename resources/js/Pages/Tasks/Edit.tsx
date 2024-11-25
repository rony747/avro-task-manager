import React, { useState } from 'react';
import {router, useForm, Link} from '@inertiajs/react';
import { Input } from "@/Components/ui/input";
import PageLayout from "@/Layouts/PageLayout";
import { Button } from '@/Components/ui/button';
import { CloudCog } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { toast } from "@/hooks/use-toast";
import {Task,User,Client, TaskFormData} from "@/hooks/type";

const TaskEdit = ({ clients, task }: { clients: Client[], task: Task }) => {
    const { data, setData, patch, processing, errors } = useForm<TaskFormData>({
        id: task.id,
        title: task.title,
        description: task.description ?? '',
        price: task.price ?? '',
        status: task.status,
        priority: task.priority ?? 'medium',
        due_date: task.due_date ?? '',
        notes: task.notes ?? '',
        user_id: task.user_id,
        client_id: task.client_id,
    });



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('tasks.update', task.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Task updated successfully",
                });
                router.visit('/tasks', {
                    preserveScroll: true,
                });
            },
            onError: (errors: any) => {
                Object.entries(errors).forEach(([field, error]) => {
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: String(error),
                    });
                });
            },
        });
    };

    return (
        <PageLayout title={`Edit Task: ${task.title}`}>
            <div className="max-w-2xl mx-auto p-4">
                <div className="mb-4">
                    <Button asChild variant="ghost" className="text-gray-700 hover:bg-transparent">
                        <Link href={`/tasks`}>← Back to Tasks</Link>
                    </Button>
                </div>
                <h1 className="text-2xl font-bold mb-4">Edit Task: {task.title}</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className="mt-1 block w-full bg-zinc-800"
                            required
                        />
                        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            id="description"
                            value={data.description}
                            name={'description'}
                            onChange={e => setData('description', e.target.value)}
                            className="mt-1 block w-full rounded-md bg-zinc-800 border-gray-600"
                            rows={3}
                        />
                        {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <Input
                                type="text"
                                id="price"
                                value={data.price}
                                name={'price'}
                                onChange={e => setData('price', e.target.value)}
                                className="mt-1 block w-full bg-zinc-800"
                            />
                            {errors.price && <div className="text-red-500 text-sm">{errors.price}</div>}
                        </div>

                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                value={data.status}
                                name={'status'}
                                onChange={e => setData('status', e.target.value as TaskFormData['status'])}
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-gray-600"
                            >
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="on_hold">On Hold</option>
                            </select>
                            {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                        </div>

                        <div>
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                            <select
                                id="priority"
                                value={data.priority}
                                name={'priority'}
                                onChange={e => setData('priority', e.target.value as TaskFormData['priority'])}
                                className="mt-1 block w-full rounded-md bg-zinc-800 border-gray-600"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            {errors.priority && <div className="text-red-500 text-sm">{errors.priority}</div>}
                        </div>

                        <div>
                            <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">Due Date</label>
                            <Input
                                type="date"
                                id="due_date"
                                name={'due_date'}
                                value={data.due_date}
                                onChange={e => setData('due_date', e.target.value)}
                                className="mt-1 block w-full bg-zinc-800"
                            />
                            {errors.due_date && <div className="text-red-500 text-sm">{errors.due_date}</div>}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            id="notes"
                            value={data.notes}
                            name={'notes'}
                            onChange={e => setData('notes', e.target.value)}
                            className="mt-1 block w-full rounded-md bg-zinc-800 border-gray-600"
                            rows={3}
                        />
                        {errors.notes && <div className="text-red-500 text-sm">{errors.notes}</div>}
                    </div>

                    <div>
                        <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">Client</label>
                        <Select
                            value={data.client_id?.toString()}
                            onValueChange={(value) => setData('client_id', parseInt(value))} name={'client_id'}
                        >
                            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-white">
                                <SelectValue placeholder="Select a client" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                {clients.map((client) => (
                                    <SelectItem
                                        key={client.id}
                                        value={client.id.toString()}
                                        className="cursor-pointer text-white focus:bg-zinc-700 focus:text-white"
                                    >
                                        {client.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.client_id && <div className="text-red-500 text-sm">{errors.client_id}</div>}
                    </div>

                    <div className="flex justify-start">
                        <Button
                            type="submit"
                            disabled={processing}
                            size={'lg'}
                            className="text-sm font-medium text-white bg-blue-800 
                            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {processing ? 'Updating...' : 'Update Task'}
                        </Button>
                    </div>
                </form>
            </div>
        </PageLayout>
    );
};

export default TaskEdit;