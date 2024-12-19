export const ValidateNFT = {
    name: {
        in: ['body'], 
        exists: {
            errorMessage: "Name is required"
        }, 
        isLength: {
            options: {
                min: 4, 
                max: 32
            }, 
            errorMessage: "name should be 4 to 32"
        }
    }, 
    price: {
        in: ['body'], 
        exists: {
            errorMessage: "Price is required"
        }, 
        isNumeric: {
            errorMessage: "Price should be numeric"
        }, 
        isPositive: {
            errorMessage: "Price should be positive"
        }
    },
    
}