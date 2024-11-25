import React from "react";
import PageLayout from "@/Layouts/PageLayout";
import Card from "@/Components/ui/Card";
import {ChartPie, Circle, CircleCheckBig, Clock2} from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}

interface Client {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    company: string | null;
    website: string | null;
    image: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: User;
}

interface Tasks {
    id: number;
    title: string;
    description: string | null;
    price: string | null;
    status: string | null;
    priority: string | null;
    due_date: string | null;
    notes: string | null;
    user_id: number;
    client_id: number;
    created_at: string;
    updated_at: string;
    user: User;
    client: Client;
}

function TaskShow({task} : { task: Tasks }) {
    let iconClass = '';
    let icon = null;
    switch (task.status) {
        case 'pending':
            iconClass = 'text-yellow-500';
            icon = <Clock2 />;
            break;
        case 'in_progress':
            iconClass = 'text-blue-500';
            icon = <ChartPie />;
            break;
        case 'completed':
            iconClass = 'text-green-500';
            icon = <CircleCheckBig />;
            break;
        case 'on_hold':
            iconClass = 'text-gray-500';
            icon = <Circle />;
            break;
        default:
            iconClass = 'text-yellow-500';
            icon = <Clock2 />;
            break;
    }

    return (
        <PageLayout title={`Task: ${task.title}`}>
            <div className="max-w-4xl mx-auto p-4">
                <div className="mb-4 flex items-center justify-between">
                    <Button asChild variant="ghost" className="text-gray-700 hover:bg-transparent">
                        <Link href="/tasks">← Back to Tasks</Link>
                    </Button>
                    <Button asChild variant="default" className="bg-blue-700 hover:bg-blue-800 text-white">
                        <Link href={`/tasks/${task.id}/edit`}>Edit Task</Link>
                    </Button>
                </div>
                <Card className="flex flex-col gap-y-2">
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor ">
                        <span className="font-medium text-sm text-gray-400">Title:</span>
                        <span className="font-medium text-sm">{task.title}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor  ">
                        <span className="font-medium text-sm text-gray-400">Description:</span>
                        <span className="font-medium text-sm">{task.description}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor  ">
                        <span className="font-medium text-sm text-gray-400">Price:</span>
                        <span className="font-medium text-sm">{task.price}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor  ">
                        <span className="font-medium text-sm text-gray-400">Status:</span>
                        <span className="font-medium text-sm capitalize">{task.status?.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor  ">
                        <span className="font-medium text-sm text-gray-400">Priority:</span>
                        <span className="font-medium text-sm capitalize">{task.priority}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor "><span
                        className="font-medium text-sm text-gray-400">Due Date:</span>
                        <span className="font-medium text-sm">{task.due_date}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor  ">
                        <span className="font-medium text-sm text-gray-400">Note:</span>
                        <span className="font-medium text-sm">{task.notes}</span>
                    </div>

                </Card>
            </div>
        </PageLayout>
    );
};

export default TaskShow;