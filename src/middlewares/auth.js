import jwt from 'jsonwebtoken'
//has JWT token in cookie + extract user_id from JWT token

// export const extractUserId = (req, res, next) => {
//     const cookies = req.cookies || req.headers.authorization; 

//     if(!cookies.JWT_token || cookies.expire > Date.now()){
//         return res.status(401).send("Unauthorized"); 
//     }
//     const token = cookies.JWT_token;

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 
//         if(decoded.user_id)
//             return res.status(200).send({ msg: "success", user_id: decoded.user_id });

//         req.user_id = decoded.user_id; 
//         next();

//     }catch (error){
//         return res.status(401).send("Invalid token");
//     }
// }

export const extractUserId = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send("Unauthorized: Missing or invalid Authorization header");
    }

    const token = authHeader.split(" ")[1]; // Extract the token part after "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded.user_id) {
            return res.status(401).send("Unauthorized: Invalid token payload");
        }

        // Attach the user_id to the request object for downstream usage
        req.user_id = decoded.user_id;

        next(); // Pass control to the next middleware or route
    } catch (error) {
        return res.status(401).send("Unauthorized: Invalid token");
    }
};



