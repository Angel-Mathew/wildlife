import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; //for password

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
    },
    password: {
        type: String,
        required: function(){
            return !this.googleId;
        },
        minlength: 6,
    },
    googleId:{
        type: String,
        unique: true,
        sparse: true,
    },
},{ timestamps:true});

UserSchema.pre('save',async function(next){
    if(this.isModified('password') &&  this.password){
    this.password = await bcrypt.hash(this.password,10);

    }
    next();
});
UserSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
};

const User = mongoose.model('User',UserSchema);

export default User;

