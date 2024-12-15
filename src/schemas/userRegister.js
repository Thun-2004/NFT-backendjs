export const BaseValidator = {
    username: {
        in: ['body'], 
        exists: {
            errorMessage: "Username is required"
        }, 
        isLength: {
            options: {
                min: 5, 
                max: 32
            }, 
            errorMessage: "length should be 5 to 32"
        }
    }, 
    password: {
        in: ['body'], 
        exists: {
            errorMessage: "Pw is required"
        },
        isLength: {
            options: {
                min: 5, 
                max: 10
            }, 
            errorMessage: "length should be 5 to 10"
        }, 

    }, 
}; 


export const ValidateRegister = {
    ...BaseValidator, 
    email: {
        exists: {
            errorMessage: "Email is required"
        },
        isEmail: {
            errorMessage: 'Must be a valid e-mail address'
        }
    }
}

export const ValidateLogin = {
    ...BaseValidator
}