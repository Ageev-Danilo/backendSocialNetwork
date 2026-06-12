import * as yup from 'yup';


export const createChatSchema = yup.object({
    name: yup.string().optional().nullable(),
    isGroup: yup.boolean().optional(),
    avatar: yup.string().optional().nullable(),
    memberIds: yup.array().of(yup.number().integer().positive()).min(1).required(),
});

export const updateChatSchema = yup.object({
    name: yup.string().optional().nullable(),
    avatar: yup.string().optional().nullable(),
    memberIds: yup.array().of(yup.number().integer().positive()).optional(),
});

export const createMessageSchema = yup.object({
    text: yup.string().trim().required('Message text is required'),
});