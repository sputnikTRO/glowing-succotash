export default function BaristaPage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Panel de Barista</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Pedidos Pendientes</h2>
          <p className="text-gray-600">Aquí se mostrarán los pedidos por preparar...</p>
        </div>
      </div>
    );
  }