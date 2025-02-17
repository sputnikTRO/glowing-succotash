import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Sistema POS Café
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Botón de Administrador */}
          <Link href="/admin" className="p-6 hover:shadow-lg transition-shadow bg-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">Administrador</h2>
            <p className="text-gray-600 mb-4">Acceso a estadísticas y gestión del sistema</p>
          </Link>
          {/* Botón de Barista */}
          <Link href="/barista" className="p-6 hover:shadow-lg transition-shadow bg-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">Barista</h2>
            <p className="text-gray-600 mb-4">Gestión de pedidos y preparación</p>
          </Link>
          {/* Botón de Pedidos */}
          <Link href="/pedidos" className="p-6 hover:shadow-lg transition-shadow bg-white rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-orange-600">Pedidos</h2>
            <p className="text-gray-600 mb-4">Tomar nuevos pedidos de clientes</p>
          </Link>
        </div>
      </div>
    </main>
  );
}