export type FormikErrorType = {
    email?: string
    password?: string
}
export type FormikValuesType = {
    email: string
    password: string
}


export const validate = (values: FormikValuesType) => {
    const errors: FormikErrorType = {};
    if (!values.email) {
        errors.email = 'Required';
    }
    if (!values.password) {
        errors.password = 'Required';
    }
    return errors;
};