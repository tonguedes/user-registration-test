import { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { FormErrors } from '../types/FormErrors';
import type { User } from '../types/User';

interface UserFormProps {
  onCreated: () => void;
  editingUser?: User | null;
  onCancelEdit?: () => void;
}

export function UserForm({
  onCreated,
  editingUser = null,
  onCancelEdit,
}: UserFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  /* Preenche o formulário quando clicar em editar */
  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setAge(String(editingUser.age));
    }
  }, [editingUser]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      if (editingUser) {
        //  UPDATE
        await api.put(`/users/${editingUser.id}`, {
          name,
          email,
          age: Number(age),
        });
      } else {
        //  CREATE
        await api.post('/users', {
          name,
          email,
          age: Number(age),
        });
      }

      clearForm();
      onCreated();
      onCancelEdit?.();
    } catch (error: any) {
      const apiErrors = error.response?.data?.errors;

      const formattedErrors: FormErrors = {
        name: apiErrors?.name?._errors?.[0],
        email: apiErrors?.email?._errors?.[0],
        age: apiErrors?.age?._errors?.[0],
      };

      setErrors(formattedErrors);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!editingUser) return;

    const confirmDelete = window.confirm(
      'Tem certeza que deseja excluir este usuário?'
    );
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await api.delete(`/users/${editingUser.id}`);
      clearForm();
      onCreated();
      onCancelEdit?.();
    } finally {
      setLoading(false);
    }
  }

  function clearForm() {
    setName('');
    setEmail('');
    setAge('');
    setErrors({});
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        {editingUser ? 'Editar Usuário' : 'Cadastro de Usuário'}
      </h2>

      {/* Nome */}
      <div>
        <input
          className={`w-full border rounded p-2 focus:outline-none focus:ring-2
            ${errors.name ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'}
          `}
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          className={`w-full border rounded p-2 focus:outline-none focus:ring-2
            ${errors.email ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'}
          `}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      {/* Idade */}
      <div>
        <input
          className={`w-full border rounded p-2 focus:outline-none focus:ring-2
            ${errors.age ? 'border-red-500 focus:ring-red-300' : 'focus:ring-blue-300'}
          `}
          placeholder="Idade"
          value={age}
          onChange={e => setAge(e.target.value)}
        />
        {errors.age && (
          <p className="text-sm text-red-600 mt-1">{errors.age}</p>
        )}
      </div>

      {/* Botões */}
      <div className="flex gap-3">
        <button
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded disabled:opacity-50"
        >
          {loading
            ? 'Salvando...'
            : editingUser
              ? 'Salvar alterações'
              : 'Cadastrar'}
        </button>

        {editingUser && (
          <>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 rounded"
            >
              Excluir
            </button>

            <button
              type="button"
              onClick={onCancelEdit}
              className="border px-4 rounded"
            >
              Cancelar
            </button>
          </>
        )}
      </div>
    </form>
  );
}
