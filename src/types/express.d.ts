declare global {
    namespace Express {
        interface Request {
            create?(): string
        }
    }
}