Copyexport default function BaristaPage() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Panel de Barista</h1>
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Pedidos Actuales</h2>
            <p className="text-gray-600">Aquí irán los pedidos pendientes...</p>
          </div>
        </div>
      </div>
    );
  }