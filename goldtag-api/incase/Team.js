const mongoose = require('mongoose')

    const teamSchema= new mongoose.Schema({
        belong:{
            type:mongoose.Types.ObjectId,
            required:[true," parent subheader is required"],
        },
        title:{
            type:String,
            required:[true,'Team title is required']
        },
        description:{
            type:String
        },
        partnerlist:{
            type:Array
        }
        }
        )
    
    
        module.exports=mongoose.model('Team',teamSchema) 