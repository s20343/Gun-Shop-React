
const FormMode = {
    NEW: 'NEW',
    EDIT: 'EDIT'
}

export const formValidationKeys = {
    notEmpty: 'notEmpty',
    min_2: 'min_2',
    min_10: 'min_10',
    max_15: 'max_15',
    max_60: 'max_60',
    min_date: 'min_date',
    max_date: 'max_date',
    validPhone: 'validPhone',
    validNumber: 'validNumber',
    min_number: 'min_number',
    max_number: 'max_number'
}

export function getValidationErrorKey(error) {
    return `form.validation.messages.${error}`
}

export default FormMode

