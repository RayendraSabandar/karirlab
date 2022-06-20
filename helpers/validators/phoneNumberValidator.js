function phoneNumberValidator(phoneNumber) {
    const plussixtwo = /^\+([62]{2})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})[-. ]?([0-9]{4,5})$/
    const zeroeight = /^\(?([0]{1})\)?[-. ]?([0-9]{3})[- ]?(\d{4})[- ]?(\d{4,5})$/

    if(!plussixtwo.test(phoneNumber) && !zeroeight.test(phoneNumber)) {
        throw new Error('Phone number must start with +62 or 0 and have at max 13 digits');
    } 
}

module.exports = phoneNumberValidator