import {Label} from "@/Components/ui/label";
import {Input} from "@/Components/ui/input";

const InvoiceRow = () => {
    return (
        <div className={`flex gap-4 justify-between`}>
            <div className={`flex flex-col gap-3 w-2/5`}>
                <Label>Description</Label>
                <Input type={`text`} placeholder={'Description'} className={`w-full`} />
            </div>
            <div className={`flex flex-col gap-3 w-1/5`}>
                <Label>Quantity</Label>
                <Input type={`text`} placeholder={'1'} value={1} className={`w-full`} />
            </div>
            <div className={`flex flex-col gap-3 w-1/5`}>
                <Label>Rate</Label>
                <Input type={`text`} placeholder={'Rate'} className={`w-full`} />
            </div>
            <div className={`flex flex-col gap-3 w-1/5 text-right`}>
                <Label>Amount</Label>
                <Input type={`text`} disabled value={`$0.00`} className={`w-full text-right border-transparent`} />
            </div>
        </div>
    );
};

export default InvoiceRow;