import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

// Dados simulados para o gráfico
const DATA = [
  { name: 'Seg', vendas: 4000 },
  { name: 'Ter', vendas: 3000 },
  { name: 'Qua', vendas: 2000 },
  { name: 'Qui', vendas: 2780 },
  { name: 'Sex', vendas: 1890 },
  { name: 'Sab', vendas: 6390 },
  { name: 'Dom', vendas: 8490 },
];

const StatCard = ({ title, value, icon: Icon, trend, isPositive }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-brand-bg rounded-full text-brand">
        <Icon size={24} />
      </div>
      <span className={`text-sm font-bold flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {trend} <TrendingUp size={14} className={isPositive ? '' : 'rotate-180'} />
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold text-dark-900 mt-1">{value}</p>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
           <h1 className="text-3xl font-serif font-bold text-dark-900">Dashboard Financeiro</h1>
           <p className="text-gray-500 mt-1">Visão geral do desempenho da sua loja nesta semana.</p>
        </div>
        <button className="bg-dark-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-brand transition-colors">
          Baixar Relatório
        </button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Receita Total" value="R$ 124.592,00" icon={DollarSign} trend="+12%" isPositive={true} />
        <StatCard title="Pedidos" value="1,245" icon={ShoppingBag} trend="+5%" isPositive={true} />
        <StatCard title="Novos Clientes" value="342" icon={Users} trend="+18%" isPositive={true} />
        <StatCard title="Ticket Médio" value="R$ 185,90" icon={TrendingUp} trend="-2%" isPositive={false} />
      </div>

      {/* Gráfico Principal */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
        <h3 className="text-lg font-bold text-dark-900 mb-6">Receita Semanal</h3>
        <ResponsiveContainer width="100%" height="85%">
          <AreaChart data={DATA}>
            <defs>
              <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4cbfa6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#4cbfa6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#4cbfa6' }}
            />
            <Area type="monotone" dataKey="vendas" stroke="#4cbfa6" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Pedidos Recentes (Tabela) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-dark-900">Pedidos Recentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-4">ID Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Data</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1024, 1023, 1022, 1021].map((id) => (
                <tr key={id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-dark-900">#{id}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200" />
                    Renan Cliente
                  </td>
                  <td className="px-6 py-4 text-gray-500">05 Fev, 2026</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">Pago</span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-dark-900">R$ 299,90</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;