export type User = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}


export type Client = {
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
    tasks: Task[]
}
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'on_hold';


// Define the props interface for the component
export type TaskIndexProps ={
    tasks: Task[];
}

export type ClientIndexProps = {
    clients: Client[];
}
export type DragItem = {
    id: number;
    status: TaskStatus;
}
export type Task ={
    id: number;
    title: string;
    description: string | null;
    price: string | null;
    status: TaskStatus;
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

export type TaskFormData = {
    id: number;
    title: string;
    description: string;
    price: string;
    status: TaskStatus;
    priority: string;
    due_date: string;
    notes: string;
    user_id: number;
    client_id: number;
};

export type CreateTaskFormData = {
    title: string;
    description: string;
    price: string;
    status: TaskStatus;
    priority: string;
    due_date: string;
    notes: string;
    user_id: number | null;
    client_id: number | null;
};

export type TaskItemProps ={
    task: Task;
    onTaskMove: (taskId: number, newStatus: TaskStatus) => void;
}

export type ColumnProps ={
    status: TaskStatus;
    tasks: Task[];
    onTaskMove: (taskId: number, newStatus: TaskStatus) => void;
}

export type KanbanBoardProps = {
    tasks: Task[];
};

export type InvoiceIndexProps = {
    clients: Client[];
}