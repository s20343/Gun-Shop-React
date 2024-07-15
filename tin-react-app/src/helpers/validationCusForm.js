function validateField(fieldName, fieldValue) {
    let errorMessage = ''
    if(fieldName === 'firstName') {
        //first name validation
        if (!checkRequired(fieldValue)) {
            errorMessage = 'Field is required.'
        } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
            errorMessage = 'The field should contain 2 to 60 characters.'
        }
    }

    if(fieldName === 'lastName') {
        //last name validation
        if (!checkRequired(fieldValue)) {
            errorMessage = 'Field is required.'
        } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
            errorMessage = 'The field should contain 2 to 60 characters.'
        }
    }


    //nick name validation
    if(fieldName === 'nickName') {
        if (!checkTextLengthRange(fieldValue, 2, 15)) {
            errorMessage = 'The field should contain 2 to 15 characters.'
        }
    }
    if(fieldName === 'phoneNumber') {
        //phone number validation
        if (!checkRequired(fieldValue)) {
            errorMessage = 'Field is required.'
        } else if (!checkPhoneNumber(fieldValue)) {
            errorMessage = 'The field should contain a valid phone number.'
        }
    }

    return errorMessage;
}
