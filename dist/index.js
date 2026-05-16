"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app/app");
const settings_routes_1 = require("./modules/settings/settings.routes");
app_1.app.use('/settings', settings_routes_1.SettingsRoutes);
