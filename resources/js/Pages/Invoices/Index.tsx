import PageLayout from "@/Layouts/PageLayout";
import Card from "@/Components/ui/Card";
import React from "react";
import {Input} from "@/Components/ui/input";
import InvoiceRow from "@/Components/ui/InvoiceRow";
import {Textarea} from "@/Components/ui/textarea";
import {Button} from "@/Components/ui/button";
import {Label} from "@/Components/ui/label";
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/Components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/Components/ui/calendar";
import { format } from "date-fns"
const InvoiceIndex = () => {
    const [date, setDate] = React.useState<Date>()
    return (
        <PageLayout title={'Invoices'}>
            <Card className={`!p-10`}>
                <form action="">
                    <div className={`flex flex-col gap-8`}>
                        <div className={`grid grid-cols-2 gap-4`}>
                            <div className={`flex flex-col gap-3`}>
                                <Input type={'text'} placeholder={'Name'}
                                       className={`w-full border-transparent !text-[36px] pl-0`} name={`invoice_title`} value={`Invoice`} />
                            </div>
                            <div className={`flex flex-col gap-3`}>
                                <Input type={'text'} placeholder={'Name'}
                                       className={`w-full border-transparent !text-[36px] text-right pr-0`} name={`invoice_number`} value={`#1`} />
                            </div>
                        </div>
                        <div className={`grid grid-cols-2 gap-4`}>

                            <div className={`flex flex-col gap-4`}>
                                <div>From</div>
                                <div>
                                    <Input type={'text'} placeholder={'Name'} name={`from_name`} className={`w-full`} />
                                </div>
                                <div>
                                    <Input type={'text'} placeholder={'Email'} name={`from_email`} className={`w-full`} />
                                </div>
                                <div>
                                    <Input type={'text'} placeholder={'Address'} name={`from_address`} className={`w-full`} />
                                </div>
                            </div>
                            <div className={`flex flex-col gap-4`}>
                                <div>To</div>
                                <div>
                                    <Input type={'text'} placeholder={'Name'} name={`to_name`} className={`w-full`} />
                                </div>
                                <div>
                                    <Input type={'text'} placeholder={'Email'} name={`to_email`} className={`w-full`} />
                                </div>
                                <div>
                                    <Input type={'text'} placeholder={'Address'} name={`to_address`} className={`w-full`} />
                                </div>
                            </div>
                        </div>
                        <div className={`grid grid-cols-2 gap-4`}>

                            <div className={`flex flex-col gap-4`}>
                                <Label>Invoice Date</Label>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full min-h-12 bg-transparent border-borderColor hover:bg-zinc-800 hover:text-white justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-zinc-950 active:bg-zinc-700 text-white border-borderColor ">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                </div>

                            </div>
                            <div className={`flex flex-col gap-4`}>
                                <Label>Due Date</Label>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full min-h-12 bg-transparent border-borderColor hover:bg-zinc-800 hover:text-white justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" p-0 bg-zinc-950 active:bg-zinc-700 text-white border-borderColor w-full">
                                            <Calendar

                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                            </div>
                        </div>
                        <div className={`flex flex-col gap-10`}>
                            <div className={`invoice_row`}><InvoiceRow /></div>
                            <div className={`flex justify-end`}>
                                <div className={`flex flex-col justify-end gap-4 w-2/12`}>
                                    <div className={`flex justify-between gap-4 w-full items-center`}>
                                        Subtotal: <span><Input type={'text'} placeholder={'Name'} name={`subtotal`} className={`w-full text-right border-transparent`} disabled value={`$0.00`} /></span>
                                    </div>
                                    <div className={`flex justify-between gap-4 w-full items-center`}>
                                        Total: <span><Input type={'text'} placeholder={'Name'} name={`total`} className={`w-full text-right border-transparent`} disabled value={`$0.00`}/></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`flex flex-col gap-3`}>
                            <Label>Notes</Label>
                            <Textarea placeholder={'Notes'} className={`w-full border-borderColor min-h-24`} name={`notes`} />
                        </div>
                        <div>
                            <Button className={`bg-blue-700 hover:bg-blue-800 px-16 py-8`}>Create Invoice</Button>
                        </div>
                    </div>

                </form>

            </Card>
        </PageLayout>
    );
};

export default InvoiceIndex;