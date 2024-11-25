import React, {useState} from "react";
import {ChartPie, Circle, CircleCheckBig, CircleUser, Clock2, FilePen, Trash2, X} from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/Components/ui/drawer"
import {router, useForm} from "@inertiajs/react";
import {toast} from "@/hooks/use-toast";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";


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

export default function TaskGrid({task,}: { task: Tasks }) {

    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
    const {post, get, delete: destroy, processing,} = useForm();
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
    const handleDeleteClick = (id: number) => {
        setTaskToDelete(id);
        setDeleteDialogOpen(true);
    };
    const handleEditClick = (id: number) => {
        setTaskToDelete(id);
router.visit(`/tasks/${id}/edit`);


    };
    const handleDeleteConfirm = (e: { preventDefault: () => void }) => {
        if (!taskToDelete) return;
        
        // First close the drawer and dialog
        setOpen(false);
        setDeleteDialogOpen(false);
        
        // Then perform the delete operation
        destroy(`/tasks/${taskToDelete}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                setTaskToDelete(null);
                toast({
                    title: "Success",
                    description: "Task deleted successfully",
                });
                
                // Use a slight delay before refreshing
                setTimeout(() => {
                    router.visit('/tasks', { 
                        preserveScroll: true,
                        preserveState: false,
                        replace: true
                    });
                }, 100);
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete Task. Please try again.",
                });
                setTaskToDelete(null);
                setDeleteDialogOpen(false);
            },
        });
    }

    return (
        <div className="relative">
            <Drawer open={open} onOpenChange={setOpen} direction="right">
                <DrawerTrigger asChild>
                    <div
                        className="w-full flex items-center flex-wrap gap-2 justify-between bg-zinc-900 border border-zinc-900 rounded-2xl shadow-xl shadow-black/10 px-3 py-2 hover:border-gray-700 transition-all duration-300 group">
                        <div className="flex flex-col items-start w-full gap-3">
                            <div className="flex items-center w-full justify-between gap-x-2">
                                <div className={`rounded-full flex shadow-lg ${iconClass}`}>
                                    {icon}
                                </div>
                                <div className={`px-2 py-1 text-right rounded-full text-xs capitalize font-medium ${
                                    task.priority === 'high'
                                        ? 'text-red-500'
                                        : task.priority === 'medium'
                                            ? 'text-yellow-500'
                                            : 'text-green-500'
                                }`}>
                                    {task.priority}
                                </div>
                            </div>

                            <div className="flex flex-col items-start text-left gap-2 w-full py-3">
                                <div className="text-white text-lg font-medium tracking-tight text-left">
                                    {task.title}
                                </div>
                                {task.description && (
                                    <div className="text-gray-400 text-sm font-light">
                                        {task.description.split(" ").slice(0, 15).join(" ") + "..."}
                                    </div>
                                )}
                            </div>

                            <div
                                className="text-gray-400 text-sm font-light flex items-center gap-x-1.5 pt-2 border-t border-zinc-800 w-full">
                                <div className="flex-1 flex items-center gap-x-2">
                                    <CircleUser size={14} /> {task.client?.name}
                                </div>

                            </div>
                        </div>
                    </div>
                </DrawerTrigger>

                <DrawerContent
                    className="fixed inset-y-0 right-0 h-full w-full max-w-3xl border-l border-zinc-800 bg-zinc-900 p-0 shadow-lg duration-500 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
                    <div className="h-full flex flex-col overflow-auto">
                        <DrawerHeader className="p-6 flex justify-between items-start border-b border-zinc-800">
                            <div>
                                <DrawerTitle className="text-xl font-semibold text-white">Task Details</DrawerTitle>
                                <DrawerDescription className="text-sm text-gray-400">
                                    View and manage task details
                                </DrawerDescription>
                            </div>
                            <DrawerClose
                                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                                <X className="h-6 w-6 text-zinc-400 hover:text-white" />
                                <span className="sr-only">Close</span>
                            </DrawerClose>
                        </DrawerHeader>

                        <div className="flex-1 px-6 py-4">
                            <div className="space-y-4 overflow-y-auto">
                                {[
                                    ['Title', task.title],
                                    ['Description', task.description],
                                    ['Price', task.price],
                                    ['Status', task.status?.replace('_', ' ')],
                                    ['Priority', task.priority],
                                    ['Note', task.notes],
                                    ['Due Date', task.due_date]
                                ].map(([label, value]) => (
                                    <div key={label} className="bg-zinc-800/50 rounded-lg p-4">
                                        <div className="text-sm font-medium text-gray-400">{label}</div>
                                        <div className={`mt-1 text-sm text-white capitalize `}>{value}</div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="flex text-zinc-700 items-center gap-x-2 w-1/6 transition-all duration-300">
                                <FilePen onClick={() => handleEditClick(task.id)} size={18} className="cursor-pointer hover:text-zinc-500" />
                                <Trash2 onClick={() => handleDeleteClick(task.id)} size={18}
                                        className="cursor-pointer hover:text-zinc-500" />
                            </div>
                        </div>

                        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                            <DialogContent className="bg-primary text-white border border-borderColor">
                                <DialogHeader>
                                    <DialogTitle>Confirm Delete</DialogTitle>
                                </DialogHeader>
                                <div className="py-4">
                                    Are you sure you want to delete this client? This action cannot be undone.
                                </div>
                                <DialogFooter className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className={'text-gray-900'}
                                        onClick={() => setDeleteDialogOpen(false)}
                                        disabled={processing}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={handleDeleteConfirm}
                                        disabled={processing}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        {processing ? "Deleting..." : "Delete"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>
                </DrawerContent>
            </Drawer>
        </div>

    );
}