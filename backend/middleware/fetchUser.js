const jwt = require('jsonwebtoken');

const JWT_Secret = 'ranjanMOndal';

const fetchUser = (req, res, next)=> {
    //get the user from JWT token and add id to req object
    const token = req.header('token');
    if(!token){
        res.status(401).send({error : "Please Authenticate using a valid token header"});
    }
    try {
        //extract payload{id:'63eba90af28af32e5aceca96'} from the token by verifing and decoding
        const data = jwt.verify(token, JWT_Secret);
        req.user = data;
        next();
    } catch (error) {
        res.status(401).send({error : "Please Authenticate using a valid token catch"});
    }
    
}


module.exports = fetchUser;