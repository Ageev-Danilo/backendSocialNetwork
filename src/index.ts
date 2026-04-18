import { app } from './app/app'; 

import { SettingsRoutes } from './modules/settings/settings.routes';

app.use('/settings', SettingsRoutes);