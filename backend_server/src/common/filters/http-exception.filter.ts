import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let errors: any = null;

        if (request.url === '/favicon.ico') {
            return response.status(HttpStatus.NO_CONTENT).send();
        }

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            if (typeof exceptionResponse === 'object') {
                message =
                    (exceptionResponse as any).message ||
                    (exceptionResponse as any).error ||
                    exception.message;
                errors = (exceptionResponse as any).message;
            } else {
                message = exceptionResponse as string;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        // Log the error
        this.logger.error(
            `${request.method} ${request.url} - Status: ${status} - Message: ${message}`,
            exception instanceof Error ? exception.stack : ''
        );

        response.status(status).json({
            success: false,
            statusCode: status,
            message: Array.isArray(errors) ? errors.join(', ') : message,
            error: Array.isArray(errors) ? errors : undefined,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}