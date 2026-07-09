my-nestjs-mongo-app/
├── src/
│   ├── common/                  # Reusable utilities
│   │   ├── decorators/          # e.g., @ActiveUser(), @IsObjectId()
│   │   ├── dto/                 # PaginationQueryDto, BaseResponseDto
│   │   └── pipes/               # ParseObjectIdPipe (validates Mongo IDs)
│   │
│   ├── config/                  # Configuration maps
│   │   ├── environments/        # Zod/Joi validation schema for MONGO_URI
│   │   └── database.config.ts   # Parses mongodb setup configurations
│   │
│   ├── core/                    # System initializations
│   │   ├── database/            
│   │   │   ├── database.module.ts # Configures MongooseModule.forRootAsync()
│   │   │   └── transaction.util.ts # Wrapper for multi-document ACID transactions
│   │   └── core.module.ts       # Wires global database setup
│   │
│   ├── modules/                 # Feature Domains
│   │   └── users/               
│   │       ├── controllers/     
│   │       ├── dto/             # Request payloads (CreateUserDto)
│   │       ├── interfaces/      
│   │       ├── schemas/         # Mongoose Schema Definitions
│   │       │   ├── user.schema.ts  # @Schema() definition & UserDocument type
│   │       │   └── profile.schema.ts # Sub-document schemas
│   │       ├── repositories/    # Data Access Layer (Prevents Mongoose leak to service)
│   │       │   └── users.repository.ts
│   │       ├── services/        # Business Logic Layer
│   │       └── users.module.ts  # Configures MongooseModule.forFeature()
│   │
│   ├── app.module.ts            
│   └── main.ts                  
