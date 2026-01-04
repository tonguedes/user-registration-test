# 📋 Cadastro de Usuários — Teste Técnico Full Stack

Projeto desenvolvido como **teste técnico**, utilizando **Node.js + React + TypeScript**, com foco em **boas práticas**, **validação de dados**, **organização de código** e **UX simples e eficiente**.

---

## 🧰 Stack utilizada

### Backend
- Node.js
- TypeScript
- Express
- Zod (validação de dados)
- Persistência em memória

### Frontend
- React
- TypeScript
- TailwindCSS
- Axios

---

## 🎯 Funcionalidades

### Backend
- ✅ Cadastro de usuários
- ✅ Validação de dados com Zod
  - `name`: obrigatório, mínimo 3 caracteres
  - `email`: obrigatório, formato válido e **único**
  - `age`: obrigatório, maior ou igual a 18
- ✅ Listagem de usuários
- ✅ Atualização de usuários
- ✅ Exclusão de usuários
- ✅ Retorno de erros de validação de forma clara e estruturada

### Frontend
- ✅ Formulário de cadastro e edição reutilizado
- ✅ Listagem de usuários
- ✅ Exclusão com confirmação
- ✅ Exibição amigável de erros da API
- ✅ Loading states (formulário e lista)
- ✅ Layout simples, limpo e responsivo com TailwindCSS

---

## 🧠 Decisões técnicas

- O **mesmo formulário** é utilizado para criação e edição de usuários, evitando duplicação de código.
- O estado de edição é centralizado no componente `App.tsx`, mantendo os componentes desacoplados.
- As validações são feitas no backend com **Zod**, garantindo consistência e segurança.
- A exclusão utiliza **loading por item**, evitando bloquear toda a interface.
- Persistência em memória foi utilizada conforme solicitado no escopo do teste.

---

## 📥 Como baixar o projeto

Você pode clonar o repositório utilizando o Git:

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git

Em seguida, entre na pasta do projeto:

cd NOME_DO_REPOSITORIO

📁 Estrutura do projeto

.
├─ backend/
│  ├─ src/
│  ├─ package.json
│  └─ tsconfig.json
├─ frontend/
│  ├─ src/
│  ├─ package.json
│  └─ vite.config.ts
├─ README.md
└─ .gitignore

🚀 Como rodar o projeto
▶ Backend

cd backend
npm install
npm run dev

Servidor iniciará em:

http://localhost:3333

▶ Frontend

cd frontend
npm install
npm run dev

Aplicação disponível em:

http://localhost:5173

🔗 Endpoints da API
Método	Rota	Descrição
GET	/users	Lista usuários
POST	/users	Cria usuário
PUT	/users/:id	Atualiza usuário
DELETE	/users/:id	Exclui usuário
📌 Observações

    Projeto desenvolvido com foco em clareza, boas práticas e facilidade de manutenção.

    Código organizado para facilitar leitura e avaliação.

    Ideal para demonstrar domínio de CRUD, validação de dados e arquitetura básica em React + Node.js.

👨‍💻 Autor

Heverton Guedes
Desenvolvedor Full Stack


---

## ✅ Agora faça o commit final do README

```bash
git add README.md
git commit -m "docs: add instructions to clone and run the project"
git push