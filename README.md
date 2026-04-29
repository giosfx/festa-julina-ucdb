# Festa Julina Universitária - Sistema de Elegibilidade a Descontos

Sistema profissional de gerenciamento de elegibilidade a descontos para eventos universitários.

## 📋 Pré-requisitos

- Docker e Docker Compose
- .NET 10 SDK (para desenvolvimento local)
- Node.js 20+ (para desenvolvimento frontend)

## 🚀 Quick Start

```bash
# Copiar arquivo de ambiente
cp .env.example .env

# Subir todos os serviços
docker-compose up -d

# Acessar aplicações
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# Swagger: http://localhost:5000/swagger
# Keycloak Admin: http://localhost:8080 (admin/admin)
```

## 🏗️ Arquitetura

### Backend (.NET 10)
- **Domain**: Entidades, interfaces, enums e value objects
- **Application**: Serviços, DTOs, validadores e regras de negócio
- **Infrastructure**: EF Core, Dapper, repositórios e integrações externas
- **API**: Endpoints, middlewares e configuração

### Frontend (React 18 + TypeScript)
- **components/ui**: Componentes shadcn/ui
- **features**: Módulos por funcionalidade (auth, search, discount-management, audit, config)
- **hooks**: Hooks customizados
- **lib**: Utilitários, API client e formatters
- **routes**: Configuração de rotas
- **types**: Tipos TypeScript compartilhados

## 🔐 Configuração do Keycloak

1. Acesse http://localhost:8080
2. Login com admin/admin
3. Criar realm `festa-julina`
4. Criar clientes:
   - `festa-julina-api` (confidential)
   - `festa-julina-frontend` (public)
5. Criar roles: `admin`, `moderator`, `viewer`
6. Criar usuários e atribuir roles

## 📦 Estrutura do Projeto

```
/workspace
├── docker-compose.yml
├── .env.example
├── src/                    # Backend .NET
│   ├── API/
│   ├── Domain/
│   ├── Application/
│   └── Infrastructure/
├── frontend/               # Frontend React
│   └── src/
│       ├── components/
│       ├── features/
│       ├── hooks/
│       ├── lib/
│       ├── routes/
│       └── types/
└── scripts/                # Scripts auxiliares
```

## 🔧 Desenvolvimento Local

### Backend
```bash
cd src/API
dotnet run
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## ✅ Checklist de Qualidade

- [x] Type-safe do início ao fim
- [x] Validação de CPF/RA/RF no front e back
- [x] Server-side pagination + loading states
- [x] Cards mobile responsivos
- [x] Auditoria imutável
- [x] RBAC com Keycloak
- [x] Código modular e limpo

## 📝 Licença

MIT
