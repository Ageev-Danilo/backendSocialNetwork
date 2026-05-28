import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { SettingsRoutes } from '../modules/settings/settings.routes';
// import { AuthRoutes } from '../modules/auth/auth.routes';
import { AlbumsRouter } from '../modules/albums/albums.router';
import { mailRouter } from '../modules/mail/mail.router';
import { PostsRouter } from '../modules/posts/posts.router';
import { friendsRouter } from '../modules/friends/friends.router';
import { chatRouter } from '../modules/chat/chat.router';

export const appRoutes = Router();


// appRoutes.use('/auth', AuthRoutes);
appRoutes.use('/albums', AlbumsRouter); 
appRoutes.use('/users', userRoutes);
appRoutes.use('/settings', SettingsRoutes);
appRoutes.use('/mail', mailRouter);
appRoutes.use('/posts', PostsRouter);
appRoutes.use('/friends', friendsRouter);
appRoutes.use('/chats', chatRouter);

appRoutes.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: Date.now() });
});