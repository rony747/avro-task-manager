import PageLayout from "@/Layouts/PageLayout";
import KanbanBoard from "@/Components/ui/KanbanBoard";
import {Button} from "@/Components/ui/button";
import React from "react";
import { Link } from "@inertiajs/react";
import {TaskIndexProps} from "@/hooks/type";

export default function TasksIndex({tasks}: TaskIndexProps) {
    return (
        <PageLayout title={'All Tasks'}>
            <div className="flex items-center justify-between mb-4">
                <Button asChild variant="ghost" className="text-gray-700 hover:bg-transparent">
                    <Link href="/">← Back to Dashboard</Link>
                </Button>
                <Button asChild variant="default" className="bg-blue-700 hover:bg-blue-800 text-white">
                    <Link href={'/tasks/create'}>Create New Task</Link>
                </Button>
            </div>
            <KanbanBoard tasks={tasks} />
        </PageLayout>
    );
}