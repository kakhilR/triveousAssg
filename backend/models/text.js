const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
    data:{
        type:Array,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},  
{
    timestamp:true,
}
)

module.exports = mongoose.model('Text',textSchema);