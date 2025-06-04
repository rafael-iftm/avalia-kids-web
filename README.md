# 📚 Avalia Kids Web

**Avalia Kids Web** é o painel web para professores da plataforma Avalia Kids — um sistema de diagnóstico educacional gamificado para crianças do 1º ao 4º ano do ensino fundamental.

Este painel permite que educadores gerenciem questões e acompanhem o desempenho dos alunos de forma prática e centralizada.

## ✨ Funcionalidades

- ✅ Login com autenticação JWT
- ✅ Cadastro de questões com enunciado, alternativas e resposta correta
- ✅ Classificação por ano escolar e tipo de matéria (Matemática, Português etc.)
- ✅ Visualização de resultados dos alunos com filtros por nome, turma e desempenho

## 🧰 Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Axios](https://axios-http.com/)
- [jwt-decode](https://github.com/auth0/jwt-decode)

## 📦 Backend

Este frontend se comunica com os microsserviços existentes no projeto `avalia-kids` via API Gateway:

| Serviço           | Função                         |
|-------------------|--------------------------------|
| auth-service      | Autenticação e login do professor |
| question-service  | Cadastro e consulta de questões |
| quiz-service      | Resultados das avaliações       |
| student-service   | Informações dos alunos          |

## 🚀 Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/rafael-iftm/avalia-kids-web.git
cd avalia-kids-web
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a URL da API

```bash
cp .env.example .env
```

Obs: edite o arquivo `.env` e defina `VITE_API_BASE_URL`

### 4. Rode o projeto

```bash
npm run dev
```

## 📁 Estrutura inicial

```
avalia-kids-web
├── public/
├── src/
│   ├── pages/
│   ├── components/
│   ├── routes/
│   ├── services/
│   └── App.tsx
├── .env
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

## 📝 Licença

Este projeto é apenas para fins acadêmicos.