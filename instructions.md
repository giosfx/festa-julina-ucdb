# 🎯 CONTEXTO & OBJETIVO

Criar um sistema profissional de gerenciamento de elegibilidade a descontos para uma "Festa Julina Universitária". O foco NÃO é financeiro, mas sim controlar quem TEM ou NÃO direito ao desconto, respeitando limites configuráveis, registrando auditoria e permitindo busca flexível por RA, RF, Nome ou CPF.

# 🛠️ STACK TÉCNICA OBRIGATÓRIA

- Frontend: React 18+ (TypeScript) + Vite + TailwindCSS + shadcn/ui + TanStack Query + React Hook Form + Zod + React Router + Lucide Icons
- Backend: .NET 10 (ASP.NET Core Web API) + C# 12 + Minimal APIs ou Controllers limpos + EF Core 10 + Dapper (para queries legadas) + AutoMapper
- Banco: MS SQL Server (2 contexts/esquemas: 1 para dados acadêmicos/funcionários via SQL externo, 1 para gestão de descontos via migrations)
- Auth: Keycloak (OIDC/OAuth2) com integração front/back, validação de JWT, mapeamento de roles
- Infra: Docker Compose, .env, Swagger/Scalar, ESLint/Prettier, Husky (opcional)

# 📐 ARQUITETURA & ESTRUTURA DE PASTAS

Front:
src/
├── components/ui (shadcn)
├── features/ (auth, search, discount-management, audit, config)
├── hooks/ (useAuth, useDiscounts, useSearch)
├── lib/ (api, utils, formatters)
├── routes/
└── types/

Back:
src/
├── Domain/ (Entities, Interfaces, Enums, ValueObjects)
├── Application/ (CQRS ou Services, DTOs, Validators, Interfaces)
├── Infrastructure/ (EF Core, Dapper, Keycloak, SQL Files, Repositories)
├── API/ (Endpoints, Middlewares, Filters, Swagger)
└── Migrations/

# 🔑 REGRAS DE NEGÓCIO

1. Busca: RA (6 dígitos), RF (4 dígitos), Nome (contains), CPF (formato BR). Validação rigorosa no front e back.
2. Limites: Cada tipo de usuário pode ter um limite máximo de descontos ativos/configuráveis. Somente `ADMIN` pode configurar/alterar esses limites.
3. Concessão/Remoção: Registro de quem concedeu/revogou, data/hora (UTC → conversão local no front), status do desconto.
4. Permissões (RBAC):
   - `admin`: configurar limites, conceder, revogar, ver logs
   - `moderator`: conceder, revogar, ver logs
   - `viewer/academic`: apenas consulta (se aplicável)
5. Auditoria: Tabela/coleção imutável para histórico de concessões e revogações.
6. Sem valores monetários. O sistema só registra "direito ativo/inativo" e "quantidade utilizada vs. limite".

# 🎨 UI/UX & RESPONSIVIDADE

- Visual profissional, limpo, acessível e consistente. Usar shadcn/ui como base.
- Desktop: Tabelas paginadas, colunas ordenáveis, filtros laterais ou superiores.
- Mobile (<768px): Tabelas devem se transformar automaticamente em CARDS funcionais. Sem scroll horizontal, sem quebra de linhas. Usar flex/grid responsivo e utilitários Tailwind (`hidden md:table-cell`, `md:hidden`, etc.).
- Paginação server-side em todas as listagens.
- Feedbacks visuais: Toasts (sucesso/erro), skeletons, empty states, modais de confirmação.
- Tema: suporte a light/dark mode (opcional, mas preferível).

# 🔐 AUTENTICAÇÃO & KEYCLOAK

- Configuração OIDC no frontend (react-oidc-context ou @react-keycloak/web).
- Backend valida JWT via `AddAuthentication(JwtBearerDefaults.AuthenticationScheme)` com validação de audience, issuer e extração de roles (`realm_access.roles` ou `resource_access.{client_id}.roles`).
- Middleware de autorização por endpoint (`[Authorize(Roles = "admin")]`, etc.).
- Tratamento de token expirado, refresh token e fallback de sessão.

# 🗄️ BANCO DE DADOS & QUERIES

- Contexto 1 (`LegacyDbContext`): Somente leitura. Queries fornecidas em `/Infrastructure/Queries/academicos.sql` e `funcionarios.sql`. Executadas via Dapper. Mapear para DTOs imutáveis.
- Contexto 2 (`DiscountDbContext`): Gerenciado via EF Core Migrations. Entidades: `DiscountLimitConfig`, `DiscountRecord`, `AuditLog`.
- Conexões via `IConfiguration` com fallback para variáveis de ambiente.
- Índices em CPF, RA, RF, Status e Data para performance.

# 📝 INSTRUÇÕES PARA O VIBE-CODING (PASSO A PASSO)

1. **Gere a estrutura base** com Docker Compose (SQL Server + Keycloak), `.env.example`, e setup do .NET 10 + React.
2. **Implemente Keycloak** no backend (validação JWT + roles) e no frontend (login, rotas protegidas, hook `useAuth`).
3. **Crie o banco de descontos** com EF Core Migrations (`DiscountLimitConfig`, `DiscountRecord`, `AuditLog`).
4. **Implemente o repositório legado** com Dapper carregando `.sql` do disco. Cache opcional (5 min).
5. **Desenvolva a API**: endpoints paginados, busca unificada, criação/revogação de desconto, configuração de limites, logs.
6. **Monte o frontend**: Dashboard, tela de busca, tabela/cards responsivos, modais de ação, formulários com Zod + RHF, toasts.
7. **Refine responsividade**: Garanta que `<Table>` vira `<Card>` em mobile sem quebras. Use `@media` ou classes Tailwind `md:`/`lg:`.
8. **Adicione testes mínimos**: 1 unitário (regra de limite), 1 integração (endpoint de busca), 1 e2e (fluxo concessão → revogação).

# ✅ CHECKLIST DE QUALIDADE

- [ ] Type-safe do início ao fim (DTOs ↔ Entities ↔ UI)
- [ ] Validação de CPF/RA/RF no front e back
- [ ] Server-side pagination + loading states
- [ ] Cards mobile sem scroll horizontal ou overflow
- [ ] Auditoria imutável (timestamp UTC, conversão local só na exibição)
- [ ] Roles mapeadas corretamente do Keycloak
- [ ] Código modular, sem lógica de UI no backend, sem regras de negócio no frontend
- [ ] Documentação Swagger/Scalar + README com setup local

# 💡 INSTRUÇÕES FINAIS PARA A IA

- Gere o código em etapas. Não tente entregar tudo de uma vez.
- Mantenha commits lógicos e explique decisões arquiteturais.
- Priorize shadcn/ui, Tailwind, EF Core 10, Dapper e padrões modernos de .NET 10.
- Se houver ambiguidade, assuma boas práticas de produção (tratamento de erros, logging, sanitização, rate limit básico).
- Ao finalizar cada etapa, aguarde meu `next` antes de prosseguir.
