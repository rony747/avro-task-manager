import React, { useState } from "react";
import { ChartPie, Circle, CircleCheckBig, CircleUser, Clock2, Eye, FilePenLine, Trash2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/Components/ui/dialog";


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

export default function TaskCard({ task }: { task: Tasks }) {
    const [open, setOpen] = useState(false);

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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className={`w-full flex items-center flex-wrap gap-2 justify-between bg-gradient-to-br from-zinc-900 to-toColor border border-borderColor rounded-2xl shadow-xl shadow-black/40 px-3 py-2 hover:border-gray-700 transition-all duration-300 `}>
                    <div className="flex items-center gap-x-3">
                        <div className={`rounded-full flex items-center justify-center shadow-lg bg-gradient-to-t from-zinc-700 to-toColor p-2 ${iconClass}` }>
                            {icon}
                        </div>
                        <div className="flex flex-col gap-y-0.5">
                            <div className="flex items-center gap-x-2">
                                <span className="text-white font-medium tracking-tight text-left">
                                    {task.title}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs capitalize font-medium ${task.priority === 'high' ? 'text-red-500' : task.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                                    {task.priority}
                                </span>
                            </div>
                            <span className="text-gray-400 text-sm font-light flex items-center gap-x-1.5">
                                <CircleUser size={14} /> {task.client.name}  {task.price && <div className="flex items-center gap-x-2 px-4 py-2 bg-transparent"> |
                                <span className="text-gray-400 text-sm font-light">$ {task.price}</span>
                            </div>}
                            </span>
                        </div>
                    </div>


                </button>
            </DialogTrigger>

            <DialogContent className="bg-primary text-white border border-borderColor">
            <DialogHeader>
                    <DialogTitle className="mb-6">Task Details</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-y-2 border border-zinc-700">
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
                        <span className="font-medium text-sm capitalize">{task.status?.replace('_',' ')}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor  ">
                        <span className="font-medium text-sm text-gray-400">Priority:</span>
                        <span className="font-medium text-sm capitalize">{task.priority}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor  ">
                        <span className="font-medium text-sm text-gray-400">Note:</span>
                        <span className="font-medium text-sm">{task.notes}</span>
                    </div>
                    <div className="flex items-start gap-2 px-4 py-2 odd:bg-fromColor "><span
                        className="font-medium text-sm text-gray-400">Due Date:</span>
                        <span className="font-medium text-sm">{task.due_date}</span>
                    </div>
                </div>

                <DialogFooter className="sm:justify-start">

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}