import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('Email must be in correct format')
        .required('Field is required'),
    password: yup
        .string()
        .min(6, 'Min length must be > 6')
        .max(50, 'Max length must be < 50')
        .required('Field is required'),
});

export const regSchema = yup.object({
    email: yup
        .string()
        .email('Email must be in correct format')
        .required('Field is required'),
    password: yup
        .string()
        .min(6, 'Min length must be > 6')
        .max(50, 'Max length must be < 50')
        .required('Field is required'),
});