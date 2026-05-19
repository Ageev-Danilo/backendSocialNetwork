import * as yup from 'yup';

export const createFriendRequestSchema = yup.object({
    receiverProfileId: yup
        .number()
        .integer('Must be an integer')
        .positive('Must be positive')
        .required('Field is required'),
});

export const acceptFriendSchema = yup.object({
    senderProfileId: yup
        .number()
        .integer('Must be an integer')
        .positive('Must be positive')
        .required('Field is required'),
});

export const deleteFriendSchema = yup.object({
    contactProfileId: yup
        .number()
        .integer('Must be an integer')
        .positive('Must be positive')
        .required('Field is required'),
});

export const rejectFriendRequestSchema = yup.object({
    senderProfileId: yup
        .number()
        .integer('Must be an integer')
        .positive('Must be positive')
        .required('Field is required'),
});