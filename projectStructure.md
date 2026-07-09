my-nestjs-app/
├── src/
│   ├── common/                  # Generic, framework-agnostic utilities (Zero app-logic)
│   │   ├── decorators/          # Custom decorators (e.g., @CurrentUser)
│   │   ├── filters/             # HttpException filters
│   │   ├── guards/              # Generic guards (e.g., API key verification)
│   │   ├── interceptors/        # Logging, serialization interceptors
│   │   ├── middleware/          # Request logging, tracking middleware
│   │   └── pipes/               # Global validation and parsing pipes
│   │
│   ├── config/                  # Configuration management
│   │   ├── environments/        # Envs validation schemas (Joi/Zod)
│   │   ├── app.config.ts        # App/Server configuration variables
│   │   └── database.config.ts   # DB connection configs
│   │
│   ├── core/                    # Global framework setups (Imported ONCE in AppModule)
│   │   ├── database/            # Database initialization, migrations, seeds
│   │   ├── errors/              # System-wide custom exception definitions
│   │   ├── logger/              # Production logger setup (Winston/Pino)
│   │   └── core.module.ts       # Orchestrates app-wide global modules
│   │
│   ├── integrations/            # Outbound external third-party service clients
│   │   ├── aws/                 # AWS S3, SES SDK wrappers
│   │   ├── payment/             # Stripe or PayPal API clients
│   │   └── integrations.module.ts
│   │
│   ├── modules/                 # Core domain business logic (Feature Modules)
│   │   ├── auth/                # Dedicated authorization/identity module
│   │   └── users/               # Domain component example
│   │       ├── controllers/     # HTTP route handlers
│   │       ├── dto/             # Data transfer objects for request validation
│   │       ├── entities/        # DB schemas / ORM models (TypeORM/Prisma)
│   │       ├── interfaces/      # Domain specific TypeScript types
│   │       ├── services/        # Thick business logic execution layers
│   │       ├── users.module.ts  # Wires up components for this domain
│   │       └── users.service.spec.ts  # Co-located component unit testing
│   │
│   ├── app.module.ts            # Root application module bootstrapping
│   └── main.ts                  # Entry point (CORS, Swagger, Globals init)
│
├── test/                        # Isolated End-to-End (E2E) testing suites
│   ├── app.e2e-spec.ts          # Root routing E2E assertions
│   └── users.e2e-spec.ts        # User journey flow system tests
├── Dockerfile                   # Multi-stage production deployment container config
├── nest-cli.json                # Framework compiler options overrides
└── tsconfig.json                # Production compiler constraint flags
