export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Total Contacts</div>
          <div className="text-3xl font-bold text-gray-900">1,234</div>
          <div className="text-sm text-green-600 mt-2">+12% from last month</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Active Chats</div>
          <div className="text-3xl font-bold text-gray-900">56</div>
          <div className="text-sm text-blue-600 mt-2">8 unassigned</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">Products</div>
          <div className="text-3xl font-bold text-gray-900">342</div>
          <div className="text-sm text-gray-600 mt-2">In stock</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-2">AI Agents</div>
          <div className="text-3xl font-bold text-gray-900">4</div>
          <div className="text-sm text-green-600 mt-2">All active</div>
        </div>
      </div>
    </div>
  );
}
