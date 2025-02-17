'use client'
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Coffee, DollarSign, Users } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const CafeSystem = () => {
  const [products, setProducts] = useState([]);
  const [currentOrder, setCurrentOrder] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState('customer');

  // Cargar productos desde Supabase
  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('active', true);
      
      if (data) setProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) setOrders(data);
    };

    loadOrders();

    // Suscripción a cambios en tiempo real
    const channel = supabase
      .channel('orders')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, (payload) => {
        setOrders(current => [payload.new, ...current]);
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  // Vista del Cliente
  const CustomerView = () => (
    <div className="p-4">
      <Card className="mb-4 p-4">
        <h2 className="text-xl font-bold mb-4">Haz tu Pedido</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentOrder([...currentOrder, item])}
              className="p-4 border rounded-lg hover:bg-gray-100"
            >
              <p className="font-bold">{item.name}</p>
              <p>$ {item.price.toFixed(2)} MXN</p>
            </button>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Tu Pedido</h2>
        {currentOrder.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>$ {item.price.toFixed(2)} MXN</span>
          </div>
        ))}
        {currentOrder.length > 0 && (
          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>$ {currentOrder.reduce((sum, item) => sum + item.price, 0).toFixed(2)} MXN</span>
            </div>
            <button
              onClick={() => {
                setOrders([...orders, {
                  id: orders.length + 1,
                  items: currentOrder,
                  total: currentOrder.reduce((sum, item) => sum + item.price, 0),
                  status: 'pending',
                  timestamp: new Date()
                }]);
                setCurrentOrder([]);
                alert('¡Pedido procesado!');
              }}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      </Card>
    </div>
  );

  // Vista del Barista
  const BaristaView = () => (
    <div className="p-4">
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Pedidos Pendientes</h2>
        {orders
          .filter(order => order.status === 'pending')
          .map((order) => (
            <div key={order.id} className="mb-4 p-4 border rounded">
              <div className="font-bold mb-2">Pedido #{order.id}</div>
              {order.items.map((item, idx) => (
                <div key={idx}>{item.name}</div>
              ))}
              <button
                onClick={() => {
                  const updatedOrders = orders.map(o => 
                    o.id === order.id ? {...o, status: 'completed'} : o
                  );
                  setOrders(updatedOrders);
                }}
                className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Marcar como Listo
              </button>
            </div>
          ))}
      </Card>
    </div>
  );

  // Vista del Administrador
  const AdminView = () => {
    // Calcular estadísticas
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageTicket = totalOrders > 0 ? totalSales / totalOrders : 0;

    // Datos para gráficos
    const salesByDay = orders.reduce((acc, order) => {
      const date = new Date(order.timestamp).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = { date, sales: 0, orders: 0 };
      }
      acc[date].sales += order.total;
      acc[date].orders += 1;
      return acc;
    }, {});

    const chartData = Object.values(salesByDay);

    return (
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-6 w-6 text-blue-500 mr-2" />
              <div>
                <p className="text-gray-600">Ventas Totales</p>
                <p className="text-2xl font-bold">$ {totalSales.toFixed(2)} MXN</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Coffee className="h-6 w-6 text-green-500 mr-2" />
              <div>
                <p className="text-gray-600">Pedidos Totales</p>
                <p className="text-2xl font-bold">{totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-purple-500 mr-2" />
              <div>
                <p className="text-gray-600">Ticket Promedio</p>
                <p className="text-2xl font-bold">$ {averageTicket.toFixed(2)} MXN</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="mb-6 p-4">
          <h2 className="text-xl font-bold mb-4">Ventas por Día</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Ventas ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Pedidos por Día</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#82ca9d" name="Número de Pedidos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 bg-white shadow mb-4">
        <div className="flex space-x-4">
          <button
            onClick={() => setView('customer')}
            className={`p-2 ${view === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
          >
            Cliente
          </button>
          <button
            onClick={() => setView('barista')}
            className={`p-2 ${view === 'barista' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
          >
            Barista
          </button>
          <button
            onClick={() => setView('admin')}
            className={`p-2 ${view === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'} rounded`}
          >
            Administrador
          </button>
        </div>
      </div>

      {view === 'customer' && <CustomerView />}
      {view === 'barista' && <BaristaView />}
      {view === 'admin' && <AdminView />}
    </div>
  );
};

export default CafeSystem;