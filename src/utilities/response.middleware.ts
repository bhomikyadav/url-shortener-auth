import { Response } from 'express';

import httpStatus from 'http-status';
import { RequestContext } from './request-context';

type requestObjType = {
    requestId: String | undefined,
    data: any,
    timeStamp: String,
    success: Boolean,
    msg: String
}


async function createResponseFunction(this: Response, { code = httpStatus.INTERNAL_SERVER_ERROR, msg = 'An unexpected error occurred on the server. Please try again later.', data = {} }: {
    code: number;
    msg?: string;
    data?: any;
}): Promise<Response> {
    let requestId = RequestContext.get<String>('requestId'),
        timeStamp = new Date().toDateString();

    let requestObj: requestObjType = {
        requestId,
        data: data,
        timeStamp,
        success: code === httpStatus.OK,
        msg,

    }

    return this.status(code).send(requestObj);
}


export { createResponseFunction }


