import { Router } from 'express';
import { FriendsController } from './friends.controller';

export const FriendsRouter = Router();

FriendsRouter.get('/', FriendsController.getFriendsById);
FriendsRouter.get('/recommendations', FriendsController.getAllProfiles);
FriendsRouter.get('/requests', FriendsController.getFriendRequests);

FriendsRouter.post('/request', FriendsController.sendFriendRequest);
FriendsRouter.post('/accept', FriendsController.acceptFriendRequest);
FriendsRouter.delete('/delete', FriendsController.deleteFriend);