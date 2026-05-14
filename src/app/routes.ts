import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { SettingsRoutes } from '../modules/settings/settings.routes';
// import { AuthRoutes } from '../modules/auth/auth.routes';
import { AlbumsRouter } from '../modules/albums/albums.router';
import { FriendsRouter } from '../modules/friends/friends.router';


export const appRoutes = Router();


// appRoutes.use('/auth', AuthRoutes);
appRoutes.use('/albums', AlbumsRouter); 
appRoutes.use('/users', UserRoutes);
appRoutes.use('/settings', SettingsRoutes);
appRoutes.use('/friends', FriendsRouter);

appRoutes.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});