
import { useState } from 'react';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { Toast } from './components/Toast';
import type { User } from './types/User';

export default function App() {
  const [reload, setReload] = useState(false);
  const [toast, setToast] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);

  function showToast(message: string) {
    setToast(message);
    setTimeout(() => setToast(''), 3000);
  }


  return (

    <div className="min-h-screen bg-gray-100 p-6">
      {toast && <Toast message={toast} onClose={() => setToast('')} />}

      <div className="max-w-xl mx-auto space-y-6">
        <UserForm
          editingUser={editingUser}
          onCancelEdit={() => setEditingUser(null)}
          onCreated={() => {
            setReload(!reload);
            showToast(editingUser ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!');
            setEditingUser(null);
          }}
        />

        <UserList
          key={String(reload)}
          onEdit={(user: User) => setEditingUser(user)}
        />
      </div>
    </div>

  );


}
