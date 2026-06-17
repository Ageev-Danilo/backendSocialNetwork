import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import type { StringValue } from 'ms';
import { AuthenticationError, ConflictError, NotFoundError } from '../../errors/app.errors';
import { env } from '../../config/env';
import { UserRepository } from './user.repository';
import type { UserServiceContract } from './types/user.contracts';
import type { ProfileCredentials } from './types/user.types';

const defaultData = {
    firstName: 'firstName',
    lastName: 'lastName',
    date: new Date().toISOString(),
    signature: 'yoursignature',
    profileImage: 'image',
};

export const UserService: UserServiceContract = {
    async login(dto) {
        const user = await UserRepository.findByEmailWithPassword(dto.email);
        if (!user) throw new NotFoundError('User');

        const isMatched = await compare(dto.password, user.password);
        if (!isMatched) throw new AuthenticationError('Passwords do not match');

        const token = sign({ id: user.id }, env.SECRET_KEY, {
            expiresIn: env.TOKEN_TTL as StringValue,
        });
        return { token };
    },

    async register(dto) {
        const existing = await UserRepository.findByEmail(dto.email);
        if (existing) throw new ConflictError('User with such email');

        const hashedPassword = await hash(dto.password, 10);
        const created = await UserRepository.create({
            email: dto.email,
            password: hashedPassword,
        });

        const token = sign({ id: created.id }, env.SECRET_KEY, {
            expiresIn: env.TOKEN_TTL as StringValue,
        });
        return { token };
    },

    async me(dto) {
        const user = await UserRepository.findById(dto.userId);
        if (!user) throw new NotFoundError('User');
        return user;
    },

    async updateProfile(dto, data: ProfileCredentials) {
        const user = await UserRepository.findById(dto.userId);
        if (!user) throw new NotFoundError('User');

        const dateValue = data.date;
        const isDate = (value: unknown): value is Date => value instanceof Date;
        const updatedData: ProfileCredentials = {
            ...defaultData,
            ...data,
            date: isDate(dateValue) ? dateValue.toISOString() : (dateValue ?? defaultData.date),
        };

        return await UserRepository.updateProfile(dto.userId, updatedData);
    },

    async getSuggestions(name) {
        const suggestions = await UserRepository.getSuggestions(name);
        return suggestions;
    },
};
