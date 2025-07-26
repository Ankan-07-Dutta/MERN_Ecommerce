import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[25,"Invalid name. Please enter a name with fewer than 25 characters"],
        minLength: [3,"Name should contain more than three characters"],
    },
    email:{
        type: String,
        required:[true,"Please enter your email"],
        unique:true,
        validate: [validator.isEmail,"please enter valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength: [8,"Passwolrd should be greater than eight characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetpasswordExpire:Date
},{timestamps:true})


// Password hashing
userSchema.pre("save", async function(next) {
    // 1st - updating profile(name,email, image) but paasword will not be hashed agian
    //  2nd - updating paasword 
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,
        { expiresIn: process.env.JWT_EXPIRE })
}

userSchema.methods.verifyPassword = async function(userEnteredPassword){
    return await bcrypt.compare(userEnteredPassword,this.password);
}

// generating token
userSchema.methods.generatePasswordResetToken = function(){
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetpasswordExpire = Date.now() + 30*60*1000; //30 minutes
    return resetToken;
}

export default mongoose.model("User",userSchema);