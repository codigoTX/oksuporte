const User = require('../models/User');

module.exports = {
  private: async (req, res, next) => {
    if(!req.body.token && !req.query.token){
      res.json({a:'a'});
      return;
    };


    
    let token;

    if(req.body.token === '' || req.body.token === null ? token = req.query.token : token = req.body.token);
    
    if(token === '' || token === null){
      res.json({b:'b'});
      return;
    };    

    const user = await User.findOne({token});
    if(!user){
      res.json({c:'c'});
      return;
    };    
    next();
  }
};