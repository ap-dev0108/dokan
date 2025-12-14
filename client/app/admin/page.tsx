import AdminSidebar from "@/components/layout/admin-sidebar";
import { mockAnalytics } from "@/lib/admin-data";
import { Users, ShoppingCart, DollarSign, AlertTriangle } from "lucide-react";

export default function AdminPage() {
    const { totalRevenue, totalOrders, totalUsers, lowStockProducts, salesData, userGrowthData } = mockAnalytics;

    const maxRevenue = Math.max(...salesData.map(data => data.revenue));
    const maxUsers = Math.max(...userGrowthData.map(data => data.users));

    return (
        <div className="flex min-h-screen bg-dokan-light">
            <AdminSidebar />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto">
                    <h1 className="font-manrope text-4xl font-bold text-dokan-dark mb-8"> Dashboard Analytics </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg p-6 border border-dokan-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <DollarSign size={24} className="text-green-600"/>
                                </div>
                            </div>

                            <p className="font-quicksand text-gray-600 text-sm mb-1">Total Revenue</p>
                            <h3 className="font-manrope text-3xl font-bold text-dokan-dark">{totalRevenue.toLocaleString()}</h3>
                        </div>

                        <div className="bg-white rounded-lg p-6 border border-dokan-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <ShoppingCart size={24} className="text-blue-600"/>
                                </div>
                            </div>

                            <p className="font-quicksand text-gray-600 text-sm mb-1">Total Orders</p>
                            <h3 className="font-manrope text-3xl font-bold text-dokan-dark">{totalOrders}</h3>
                        </div>

                        <div className="bg-white rounded-lg p-6 border border-dokan-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Users className="text-purple-600" size={24} />
                                </div>
                            </div>

                            <p className="font-quicksand text-gray-600 text-sm mb-1">Total Users</p>
                            <h3 className="font-manrope text-3xl font-bold text-dokan-dark">{totalUsers}</h3>
                        </div>

                        <div className="bg-white rounded-lg p-6 border border-dokan-border">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-red-100 rounded-lg">
                                    <AlertTriangle className="text-red-600" size={24} />
                                </div>
                            </div>
                            
                            <p className="font-quicksand text-gray-600 text-sm mb-1">Low Stock Items</p>
                            <h3 className="font-manrope text-3xl font-bold text-dokan-dark">{lowStockProducts}</h3>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}