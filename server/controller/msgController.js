const msgs =  require("../model/messageModel");
module.exports.sendMsg = async (req,res,next)=> {
    try{
        const {message,from,to} = req.body;
        const data = await msgs.create({
        message: {text: message},  
        users: [from,to],
        sender: from,
        });
        if(data){

            return res.json({
                output:"successfully send",
               
               }); 
        }else{
            return res.json({output: "failure"});
        }
    }catch(e){
        console.log(e);
        next(e);
    }
    
}

module.exports.showMsg = async (req,res,next) => {
    try{
        const{from,to} = req.body;
        
        const data = await msgs.find({
            users: {
                $all: [from,to]
            },
         }).sort({updatedAt:1});
        
        const getmsg = data.map((otext)=> {
            return{
                checkSender: otext.sender.toString()===from,
                originalMessage: otext.message
            }
        
              
            
        })
        res.json(getmsg);
         


    }catch(e){
         next(e);
    }
}