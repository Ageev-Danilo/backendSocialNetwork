import { Router } from 'express';
import { FriendsController } from './friends.controller';

export const FriendsRouter = Router();

FriendsRouter.get('/:id', FriendsController.getFriendsById);
FriendsRouter.post('/request', FriendsController.sendFriendRequest);