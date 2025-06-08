import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const order = [
    { id: "1", product: "Laptop", date: "2025-05-10", amount: "$999.99" },
    { id: "2", product: "Phone", date: "2025-05-12", amount: "$799.99" },
    { id: "3", product: "Monitor", date: "2025-05-15", amount: "$299.99" },
];

export default function orderPage() {
    return (
        <div className="p-4 space-y-4">
            <h1 className="text-xl font-bold">order</h1>

            <div className="overflow-x-auto">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead className="w-[120px]">Date</TableHead>
                            <TableHead className="w-[100px] text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {order.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell className="font-medium">{order.product}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell className="text-right">{order.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-muted-foreground">Showing 1 to 3 of 3 entries</span>
                <div className="space-x-1">
                    <button className="px-2 py-1 border rounded text-xs" disabled>Prev</button>
                    <button className="px-2 py-1 border rounded text-xs">Next</button>
                </div>
            </div>
        </div>
    );
}