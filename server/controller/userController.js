const User = require("../model/userModel");
const bcrypt = require("bcrypt");
module.exports.login = async (req,res,next) => {
    try{
        const user = req.body;
        const{userName,password} = user;
        
        const userNameCheck = await User.findOne({userName});
        if(!userNameCheck){
            return res.json({msg: "enter correct username and password", status: false});
        }
        else{
           const passwordCheck = await bcrypt.compare(password,userNameCheck.password);
           if(!passwordCheck){
               return res.json({msg: "enter correct username and password", status:false});
           }else{
               return res.json({status: true, userNameCheck});
           }
        }
        

    }catch(e){
             console.log(e);
             next(e);
    }
};
module.exports.register = async (req,res,next)=> {
    try{
        const{userName,email,password} = req.body;
        const userNameCheck = await User.findOne({userName});
        if(userNameCheck){
            return res.json({ msg: "username already exist", status: false});
        }
        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.json({ msg: "email already exist", status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            email,
            password:hashedPassword,
        });
        delete user.password;
        return res.json({status: true, user})
    }catch(e){
          console.log(e);
          next(e);
    }
  
    
};

module.exports.setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const Image = req.body.image;
      console.log("naybody listening");
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage: Image,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.chat = async(req,res,next) => {
    try{
        const data = await User.find({_id:{$ne: req.params.id}},[ 
          'userName',
          'id',
          'avatarImage',
          'email',
        ]
       
        );
     return res.json(data);

    }catch(e){
      next(e);
    }
  };