import { Router } from 'express';
import { authenticateMiddleware } from '../../middlewares/authenticate.middleware';
import { validateMiddleware } from '../../middlewares/validate.middleware';
import { FriendsController } from './friends.controller';
import {
    acceptFriendSchema,
    createFriendRequestSchema,
    deleteFriendSchema,
} from './friends.schema';

export const friendsRouter = Router();

friendsRouter.get('/recommendations', authenticateMiddleware, FriendsController.getRecommendations);

friendsRouter.get('/', authenticateMiddleware, FriendsController.getFriends);

friendsRouter.get('/requests', authenticateMiddleware, FriendsController.getFriendRequests);

friendsRouter.post(
    '/requests',
    // authenticateMiddleware,
    validateMiddleware(createFriendRequestSchema),
    FriendsController.createFriendRequest,
);

friendsRouter.post(
    '/',
    // authenticateMiddleware, 
    validateMiddleware(acceptFriendSchema),
    FriendsController.acceptFriend,
);

friendsRouter.delete(
    '/',
    // authenticateMiddleware,                                                 
    validateMiddleware(deleteFriendSchema),
    FriendsController.deleteFriend,
);
