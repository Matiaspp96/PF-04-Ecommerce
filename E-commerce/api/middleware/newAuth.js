
const Users = require('../models/users');
const {  verifyToken } = require('../utils/handleToken');

const protectRoute = async (req, res, next) => {
	if(req.headers.authorization){
		try {
			const token = req.headers.authorization;
			const decodedToken = await verifyToken(token);
			return decodedToken && next();
		} catch (error) {
			console.log(error);
			return res.status(401).json({message:'Not authorized'});
			
		}
	};
};

const isAdmin =async (req, res, next) => {
	 if(req.headers.authorization){
		const token = req.headers.authorization;
		const decodedToken = await verifyToken(token);
		if(decodedToken.role === 'admin'){
			return next()
		}
	}
	
		return res.status(401).json({message:'Not authorized'});

	
}


module.exports =  { protectRoute, isAdmin };
