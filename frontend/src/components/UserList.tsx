import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { User } from '../types/User';

interface UserListProps {
  onEdit: (user: User) => void;
  reload?: boolean;
}

export function UserList({ onEdit, reload }: UserListProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | string | null>(null);

  async function fetchUsers() {
    setLoading(true);
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(userId: number | string) {
    const confirmed = window.confirm(
      'Tem certeza que deseja excluir este usuário?'
    );
    if (!confirmed) return;

    setDeletingId(userId);

    try {
      await api.delete(`/users/${userId}`);
      setUsers(prev => prev.filter(user => user.id !== userId));
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [reload]);

  if (loading) {
    return (
      <div className="mt-6 bg-white p-6 rounded shadow text-center text-gray-500">
        Carregando usuários...
      </div>
    );
  }

  return (
    <div className="mt-6 bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Usuários</h2>

      {users.length === 0 ? (
        <p className="text-gray-500">Nenhum usuário cadastrado</p>
      ) : (
        <ul className="space-y-3">
          {users.map(user => (
            <li
              key={user.id}
              className="border rounded-lg p-3 flex justify-between items-center hover:bg-gray-50 transition"
            >
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">
                  {user.email} • {user.age} anos
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(user)}
                  className="px-3 py-1 text-sm rounded bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                  className="px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                >
                  {deletingId === user.id ? 'Excluindo...' : 'Excluir'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
