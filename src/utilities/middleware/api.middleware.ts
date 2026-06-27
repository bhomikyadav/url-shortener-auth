import {
    Request, Response, NextFunction
} from "express";
import { randomUUID } from 'node:crypto'
import { createResponseFunction } from '../response.middleware'

import { RequestContext } from '../request-context';




async function addRequestId(req: Request, res: Response, next: NextFunction) {

    RequestContext.run(() => {
        const requestId =
            req.headers["x-request-id"]?.toString() ?? randomUUID();
        RequestContext.set('requestId', requestId);

        next();
    })

}

async function handleResponseFunction(req: Request, res: Response, next: NextFunction) {
    res.create = createResponseFunction;
    next();
}



export default [addRequestId,handleResponseFunction]