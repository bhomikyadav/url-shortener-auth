declare global {
    namespace Express {
        interface Response {
            create?(): typeof import('../utilities/response.middleware').createResponseFunction
        }
    }
}