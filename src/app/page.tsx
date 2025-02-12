import React from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sistema POS Café
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta de Administrador */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Administrador</h2>
            <p className="text-gray-600 mb-4">Acceso a estadísticas y gestión del sistema</p>
            <Link href="/admin" className="block w-full py-2 px-4 bg-blue-500 text-white rounded text-center hover:bg-blue-600">
              Ingresar
            </Link>
          </Card>

          {/* Tarjeta de Barista */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Barista</h2>
            <p className="text-gray-600 mb-4">Gestión de pedidos y preparación</p>
            <Link href="/barista" className="block w-full py-2 px-4 bg-green-500 text-white rounded text-center hover:bg-green-600">
              Ingresar
            </Link>
          </Card>

          {/* Tarjeta de Pedidos */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4 text-purple-600">Pedidos</h2>
            <p className="text-gray-600 mb-4">Tomar nuevos pedidos de clientes</p>
            <Link href="/orders" className="block w-full py-2 px-4 bg-purple-500 text-white rounded text-center hover:bg-purple-600">
              Ingresar
            </Link>
          </Card>
        </div>
      </div>
    </main>
  );
}