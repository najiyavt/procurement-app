import React, { useState } from 'react'; 
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Modal from './Modal'; // Your existing Modal component
import '../styles/PurchaseOrder.css';

const suppliers = [
    { id: 1, name: 'Supplier A' },
    { id: 2, name: 'Supplier B' },
    { id: 3, name: 'Supplier C' }
];

const stockUnits = ["pcs", "kg", "liters"]; 

const generateOrderNo = () => `PO-${Date.now()}`;

const PurchaseOrder = () => {
    const [orderNo, setOrderNo] = useState(generateOrderNo());
    const [orderDate, setOrderDate] = useState(new Date().toLocaleDateString());
    const [supplier, setSupplier] = useState('');
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
    const [itemNo, setItemNo] = useState('');
    const [itemName, setItemName] = useState('');
    const [stockUnit, setStockUnit] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [packingUnit, setPackingUnit] = useState('');
    const [orderQty, setOrderQty] = useState('');

    const handleAddItem = () => {
        const netAmount = orderQty * unitPrice;
        const newItem = {
            itemNo,
            itemName,
            stockUnit,
            unitPrice: parseFloat(unitPrice),
            packingUnit,
            orderQty,
            netAmount,
        };
        setItems([...items, newItem]);
        resetItemForm();
    };

    const resetItemForm = () => {
        setItemNo('');
        setItemName('');
        setStockUnit('');
        setUnitPrice('');
        setPackingUnit('');
        setOrderQty('');
        setIsModalOpen(false);
    };

    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            items.map(item => ({
                'Item No': item.itemNo,
                'Item Name': item.itemName,
                'Stock Unit': item.stockUnit,
                'Unit Price': item.unitPrice.toFixed(2),
                'Packing Unit': item.packingUnit,
                'Order Qty': item.orderQty,
                'Net Amount': item.netAmount.toFixed(2),
            }))
        );
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Purchase Order');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'purchase_order.xlsx');
    };

    const printPurchaseOrder = () => {
        const printContent = document.getElementById('print-content').innerHTML;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(`
            <html>
                <head>
                    <title>Print Purchase Order</title>
                    <link rel="stylesheet" type="text/css" href="styles/PurchaseOrder.css">
                </head>
                <body>
                    <div class="header">
                        <h1>Purchase Order</h1>
                        <p>Supplier: ${supplier}</p>
                        <p>Order No: ${orderNo}</p>
                        <p>Order Date: ${orderDate}</p>
                    </div>
                    <div>${printContent}</div>
                    <script>
                        window.print();
                        window.onafterprint = function() {
                            window.close();
                        }
                    </script>
                </body>
            </html>
        `);
        newWindow.document.close();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Purchase Order</h2>

            {/* Supplier Selection */}
            <div className="mb-6">
                <label className="block mb-2 font-medium text-gray-700">Supplier Name</label>
                <input
                    type="text"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select supplier..."
                />
                <button onClick={() => setIsSupplierModalOpen(true)} className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200">
                    Search
                </button>
            </div>

            {/* Display Order No and Order Date */}
            <div className="mb-6">
                <p className="text-gray-600"><strong>Order No:</strong> {orderNo}</p>
                <p className="text-gray-600"><strong>Order Date:</strong> {orderDate}</p>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200">Add Item</button>
            <div className="mt-6">
                {items.length === 0 ? (
                    <p className="text-gray-500">No items added.</p>
                ) : (
                    <div id="print-content">
                        <ul className="space-y-4">
                            {items.map((item, index) => (
                                <li key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                                    <h3 className="font-bold text-lg">{item.itemNo}</h3>
                                    <p><strong>Name:</strong> {item.itemName}</p>
                                    <p><strong>Stock Unit:</strong> {item.stockUnit}</p>
                                    <p><strong>Unit Price:</strong> ${item.unitPrice.toFixed(2)}</p>
                                    <p><strong>Packing Unit:</strong> {item.packingUnit}</p>
                                    <p><strong>Order Qty:</strong> {item.orderQty}</p>
                                    <p><strong>Net Amount:</strong> ${item.netAmount.toFixed(2)}</p>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 font-bold text-xl text-gray-800">
                            Total: ${items.reduce((acc, item) => acc + item.netAmount, 0).toFixed(2)}
                        </div>
                    </div>
                )}
            </div>
            <button onClick={exportToExcel} className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-200">Export Purchase Order to Excel</button>
            <button onClick={printPurchaseOrder} className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition duration-200">Print Purchase Order</button>

            {/* Modal for adding a new item */}
            <Modal isOpen={isModalOpen} onClose={resetItemForm} title="Add Item">
                <div className="mb-4">
                    <label className="block mb-1">Item No</label>
                    <input
                        type="text"
                        value={itemNo}
                        onChange={(e) => setItemNo(e.target.value)}
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Stock Unit</label>
                    <select
                        value={stockUnit}
                        onChange={(e) => setStockUnit(e.target.value)}
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select stock unit...</option>
                        {stockUnits.map((unit, index) => (
                            <option key={index} value={unit}>{unit}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Unit Price</label>
                    <input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Packing Unit</label>
                    <input
                        type="text"
                        value={packingUnit}
                        onChange={(e) => setPackingUnit(e.target.value)}
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Order Qty</label>
                    <input
                        type="number"
                        value={orderQty}
                        onChange={(e) => setOrderQty(e.target.value)}
                        className="border border-gray-300 rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button onClick={handleAddItem} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200">Add Item</button>
            </Modal>

            {/* Modal for selecting supplier */}
            <Modal isOpen={isSupplierModalOpen} onClose={() => setIsSupplierModalOpen(false)} title="Select Supplier">
                <ul className="space-y-2">
                    {suppliers.map((supplier) => (
                        <li key={supplier.id}>
                            <button onClick={() => {
                                setSupplier(supplier.name);
                                setIsSupplierModalOpen(false);
                            }} className="w-full text-left p-2 border border-gray-300 rounded hover:bg-gray-200">
                                {supplier.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default PurchaseOrder;
