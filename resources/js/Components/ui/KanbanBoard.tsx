import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from '@/Components/ui/Card';
import TaskCard from '@/Components/ui/TaskCard';
import { router, usePage } from '@inertiajs/react';
import { useToast } from "@/hooks/use-toast";
import TaskGrid from "@/Components/ui/TaskGrid";
import {Client,User, TaskStatus,Task,DragItem,TaskItemProps,ColumnProps,KanbanBoardProps} from "@/hooks/type";
// Reuse the existing interfaces

// Task Item Component
const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskMove }: TaskItemProps   ) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status } as DragItem,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`${isDragging ? 'opacity-50' : 'opacity-100'}`}
        >
            <TaskGrid task={task} />
        </div>
    );
};

// Column Component
const Column: React.FC<ColumnProps> = ({ status, tasks, onTaskMove }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item: DragItem) => onTaskMove(item.id, status),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const getColumnTitle = (status: TaskStatus): string => {
        switch (status) {
            case 'pending':
                return 'To Do';
            case 'in_progress':
                return 'In Progress';
            case 'completed':
                return 'Completed';
            case 'on_hold':
                return 'On Hold';
        }
    };

    return (
        <div
            ref={drop}
            className={`flex-1 min-w-[300px] bg-zinc-900/50 rounded-xl p-4 ${
                isOver ? 'border-2 border-blue-500' : ''
            }`}
        >
            <h3 className="text-lg font-semibold mb-4 text-white">
                {getColumnTitle(status)} ({tasks.length})
            </h3>
            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <TaskItem key={task.id} task={task} onTaskMove={onTaskMove} />
                ))}
            </div>
        </div>
    );
};

// Main Kanban Board Component
const KanbanBoard: React.FC<KanbanBoardProps> = ({ tasks: initialTasks }) => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [updating, setUpdating] = useState(false);
    const { toast } = useToast();

    const handleTaskMove = async (taskId: number, newStatus: TaskStatus) => {
        if (updating) return;

        const oldTasks = [...tasks];

        // Optimistically update the UI
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        );

        setUpdating(true);

        // Make the API call using Inertia
        router.put(
            `/tasks/${taskId}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Status Updated",
                    });
                },
                onError: () => {
                    // Revert to the old state if there's an error
                    setTasks(oldTasks);
                    toast({
                        title: "Error",
                        description: "Failed to update task status",
                    });
                },
                onFinish: () => {
                    setUpdating(false);
                },
            }
        );
    };

    const columns: TaskStatus[] = ['pending', 'in_progress', 'completed', 'on_hold'];

    return (
        <DndProvider backend={HTML5Backend}>

                <div className="grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 pb-4">
                    {columns.map((status) => (
                        <Column
                            key={status}
                            status={status}
                            tasks={tasks.filter((task) => task.status === status)}
                            onTaskMove={handleTaskMove}
                        />
                    ))}
                </div>

        </DndProvider>
    );
};

export default KanbanBoard;