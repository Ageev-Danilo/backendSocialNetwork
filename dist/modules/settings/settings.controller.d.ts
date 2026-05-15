import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedUser } from '../../types/token.types';
import type { SettingsCredentials } from './types/settings.types';
export declare const SettingsController: {
    getSettings(req: Request<object, any, object, object, AuthenticatedUser>, res: Response, next: NextFunction): Promise<void>;
    updateSettings(req: Request<object, {
        message: string;
    }, SettingsCredentials, object, AuthenticatedUser>, res: Response<{
        message: string;
    }>, next: NextFunction): Promise<void>;
};
//# sourceMappingURL=settings.controller.d.ts.map