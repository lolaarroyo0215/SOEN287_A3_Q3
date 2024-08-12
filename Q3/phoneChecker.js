function phoneChecker(phoneNumber){
    const regex = /^\d{3}-\d{3}-\d{4}$/;
    let message = '';
    if(regex.test(phoneNumber)){
        message = 'phone number is valid';
    } else {
        message = `phone number: ${phoneNumber} is not valid\nit should match the format: ddd-ddd-dddd`;
    }
    return message;
    }
export {phoneChecker};
