'use strict'

exports.isAdmin=(req,res,next)=>{
    if(req.user.role != 'ROLE_ADMIN'){
        return res.status(403).send({message:'No tienes permisos'});
    }
    next();
};
