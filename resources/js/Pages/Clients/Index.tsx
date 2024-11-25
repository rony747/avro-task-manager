import PageLayout from "@/Layouts/PageLayout";
import DataTable, {TableColumn} from 'react-data-table-component';

import {Link, useForm} from "@inertiajs/react";
import {CircleUser, Eye, FilePen, Trash2, UserPen, X} from "lucide-react";
import TableTheme from "@/Components/theme/TableTheme";
import Card from "@/Components/ui/Card";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/Components/ui/dialog";
import {Button} from "@/Components/ui/button";
import React, { useState, ChangeEvent } from "react";
import {useToast} from "@/hooks/use-toast";
import {Input} from "@/Components/ui/input";
import {Client,User, ClientIndexProps} from "@/hooks/type";
// Define the User interface



export default function ClientIndex({clients}: ClientIndexProps) {
    const theme = TableTheme();
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const[viewDialogOpen, setViewDialogOpen] = useState(false);
    const[editDialogOpen, setEditDialogOpen] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<number | null>(null);
    const [clientToView, setClientToView] = useState<Client | null>(null);
    const [clientToEdit, setClientToEdit] = useState<Client | null>(null);

    const {toast} = useToast();
    const {data, setData, put, post, delete: destroy, processing, reset} = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        website: '',
        image: null as File | null,
    });
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            setData('image', fileList[0]);
        } else {
            setData('image', null);
        }
    };
    function handleSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post('/clients', {
            onSuccess: () => {
                setOpen(false);
                reset();
                toast({
                    title: "Success",
                    description: "Client added successfully",
                });
            },
            onError: (errors) => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to add client. Please try again.",
                });
            },
        });
    }

    const handleDeleteClick = (id: number) => {
        setClientToDelete(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (!clientToDelete) return;

        destroy(`/clients/${clientToDelete}`, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Client deleted successfully",
                });
                setDeleteDialogOpen(false);
                setClientToDelete(null);
            },
            onError: () => {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to delete client. Please try again.",
                });
            },
        });
    };
const handleViewClick = (client: Client) => {
    setClientToView(client);
    setViewDialogOpen(true);
}
const handleEditClick = (client: Client) => {
    setClientToEdit(client);
    // Initialize form data with client values
    setData({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        company: client.company || '',
        website: client.website || '',
        image: null,
    });
    setEditDialogOpen(true);
}
const handleEditSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!clientToEdit) return;

    put(`/clients/${clientToEdit.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            setEditDialogOpen(false);
            setClientToEdit(null);
            reset();
            toast({
                title: "Success",
                description: "Client updated successfully",
            });
        },
        onError: (errors) => {
            toast({
                variant: "destructive",
                title: "Error",
                description: Object.values(errors).flat().join('\n'),
            });
        },
    });
}
    const columns: TableColumn<Client>[] = [
        {
            name: '#',
            sortable: true,
            width: '80px',
            cell: (_row, index) => <span className="text-white">{index + 1}</span>,
        },
        {
            name: 'Name',
            sortable: true,
            cell: (row) =><button onClick={handleViewClick.bind(null, row)} className={`flex flex-row gap-2`}>{row.image ? <img src={`/clients_images/${row.image}`} alt={row.name} className="w-10 h-auto rounded-full" /> : null}{row.name}</button>,
        },
        {
            name: 'Email',
            selector: row => row.email ?? '-',
            sortable: true,
        },
        {
            name: 'Website',
            selector: row => row.website ?? '-',
            sortable: true,
        },
        {
            name: 'Pending Tasks',
            selector: row => row.tasks.length,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex flex-row gap-2 text-gray-500 text-sm">
        
                    <button onClick={() => handleEditClick(row)}>
                        <UserPen size={18} className="hover:text-gray-700 transition-colors" />
                    </button>
                    <button
                        onClick={() => handleDeleteClick(row.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        disabled={processing}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        },
    ];


    return (
        <PageLayout title="All Clients">
            <div className="flex items-center justify-between mb-4">
                <Button asChild variant="ghost" className="text-gray-700 hover:bg-transparent">
                    <Link href="/">← Back to Dashboard</Link>
                </Button>
                <Button
                    onClick={() => setOpen(true)}
                    className="bg-blue-700 hover:bg-blue-800 text-white"
                >
                    Create New Client
                </Button>
            </div>
            <Card>
                <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="sm:max-w-[425px] bg-primary text-white border border-borderColor">
                            <DialogHeader>
                                <DialogTitle className="mb-6">Client Info</DialogTitle>
                            </DialogHeader>
                            <div>
                                <form onSubmit={handleSubmit} className={'flex flex-col gap-4'}>
                                    <Input type={'text'} placeholder={'Name'} name={'name'} value={data.name}
                                           onChange={(e: { target: { value: string; }; }) => setData('name', e.target.value)} />
                                    <Input type={'email'} placeholder={'Email'} name={'email'} value={data.email}
                                           onChange={(e: { target: { value: string; }; }) => setData('email', e.target.value)} />
                                    <Input type={'tel'} placeholder={'Phone'} name={'phone'} value={data.phone}
                                           onChange={(e: { target: { value: string; }; }) => setData('phone', e.target.value)} />
                                    <Input type={'text'} placeholder={'Address'} name={'address'} value={data.address}
                                           onChange={(e: { target: { value: string; }; }) => setData('address', e.target.value)} />
                                    <Input type={'text'} placeholder={'Company'} name={'company'} value={data.company}
                                           onChange={(e: { target: { value: string; }; }) => setData('company', e.target.value)} />
                                    <Input type={'url'} placeholder={'website'} name={'website'} value={data.website}
                                           onChange={(e: { target: { value: string; }; }) => setData('website', e.target.value)} />
                                    <Input
                                        type="file"
                                        placeholder="Image"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <DialogFooter className="sm:justify-start">
                                        <Button type="submit"
                                                className={'bg-gradient-to-r from-[#3C3C3E] to-[#4C4C4E] text-white rounded-lg hover:from-[#4C4C4E] hover:to-[#5C5C5E] transition-all duration-300 font-medium text-sm'}
                                                size={'lg'}>{processing ? "Adding..." : "Add Client"}</Button>
                                    </DialogFooter>
                                </form>
                            </div>

                        </DialogContent>
                    </Dialog>
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
                <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
                    <DialogContent className="bg-primary text-white border border-borderColor">
                        <DialogHeader>
                            <DialogTitle>Client Details</DialogTitle>
                        </DialogHeader>

                       <div>
                           <p>Name: {clientToView?.name}</p>
                           <p>Email: {clientToView?.email}</p>
                           <p>Phone: {clientToView?.phone}</p>
                           <p>Address: {clientToView?.address}</p>
                           <p>Company: {clientToView?.company}</p>
                           <p>Website: {clientToView?.website}</p>
                       </div>
                    </DialogContent>
                </Dialog>

                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                    <DialogContent className="sm:max-w-[425px] bg-primary text-white border border-borderColor">
                        <DialogHeader>
                            <DialogTitle className="mb-6">Edit Client: {clientToEdit?.name}</DialogTitle>
                        </DialogHeader>
                        <div>
                            {clientToEdit && (
                                <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
                                    <Input type={'text'} placeholder={'Name'} name={'name'} value={data.name}
                                           onChange={(e: { target: { value: string; }; }) => setData('name', e.target.value)} />
                                    <Input type={'email'} placeholder={'Email'} name={'email'} value={data.email}
                                           onChange={(e: { target: { value: string; }; }) => setData('email', e.target.value)} />
                                    <Input type={'tel'} placeholder={'Phone'} name={'phone'} value={data.phone}
                                           onChange={(e: { target: { value: string; }; }) => setData('phone', e.target.value)} />
                                    <Input type={'text'} placeholder={'Address'} name={'address'} value={data.address}
                                           onChange={(e: { target: { value: string; }; }) => setData('address', e.target.value)} />
                                    <Input type={'text'} placeholder={'Company'} name={'company'} value={data.company}
                                           onChange={(e: { target: { value: string; }; }) => setData('company', e.target.value)} />
                                    <Input type={'url'} placeholder={'website'} name={'website'} value={data.website}
                                           onChange={(e: { target: { value: string; }; }) => setData('website', e.target.value)} />
                                    <Input
                                        type="file"
                                        placeholder="Image"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <DialogFooter className="sm:justify-start">
                                        <Button 
                                            type="submit"
                                            className="bg-blue-700 hover:bg-blue-800 text-white"
                                        >
                                            {processing ? "Updating..." : "Update Client"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>

                <DataTable
                    columns={columns}
                    data={clients}
                    pagination
                    responsive
                    striped={true}
                    theme="solarized"
                />
            </Card>
        </PageLayout>
    );
}