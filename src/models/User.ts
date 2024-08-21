import 
    mongoose, 
    { 
    Schema, 
    Document, 
    Types 
    } from "mongoose";

// interfaces for user
export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: "RECRUITER" | "STUDENT";
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
}

// interfaces for user
export interface Recruiter extends Document {
    workingIndustry: string;
    phoneNo: string;
    fieldOfInterest: "FRONTEND" | "BACKEND" | "FULLSTACK" | "AIML" | "DEVOPS" | "SOFTWARE_DEVELOPER_ENGINEER" | "OTHER";
    resume: string;
    amount: number;
    user: Types.ObjectId;  // Reference to User
}

// interfaces for user
export interface Student extends Document {
    collegeName: string;
    fieldOfInterest: "FRONTEND" | "BACKEND" | "FULLSTACK" | "AIML" | "DEVOPS" | "SOFTWARE_DEVELOPER_ENGINEER" | "OTHER";
    resume: string;
    user: Types.ObjectId;  // Reference to User
}

// Define schemas
const UserSchema: Schema<User> = new Schema({
    email : {
        type: String, 
        required: true, 
        unique: true, 
        match: [/.+\@.+\..+/, "Please use a valid email address"] 
    },
    password: { 
        type: String, 
        required: true 
    },
    name: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ["RECRUITER", "STUDENT"], required: true 
    },
    verifyCode: { 
        type: String 
    },
    verifyCodeExpiry: { 
        type: Date 
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    }
});

const RecruiterSchema: Schema<Recruiter> = new Schema({
    workingIndustry: { 
        type: String, 
        required: true 
    },
    phoneNo: { 
        type: String, 
        required: true 
    },
    fieldOfInterest: { 
        type: String, 
        enum: ["FRONTEND", "BACKEND", "FULLSTACK", "AIML", "DEVOPS", "SOFTWARE_DEVELOPER_ENGINEER", "OTHER"], required: true 
    },
    resume: { 
        type: String, //cloudinary url link here 
        required: true 
    },
    amount: { 
        type: Number 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User",  
    }
});

const StudentSchema: Schema<Student> = new Schema({
    collegeName: { 
        type: String, 
        required: true 
    },
    fieldOfInterest: { 
        type: String, 
        enum: ["FRONTEND", "BACKEND", "FULLSTACK", "AIML", "DEVOPS", "SOFTWARE_DEVELOPER_ENGINEER", "OTHER"], required: true 
    },
    resume: { 
        type: String, 
        required: true 
    },
    user: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
    }
});

// Creating models

// structure is if exists then return User model 
// else return with creating and return it.

const UserModel = 
(mongoose.models.User as mongoose.Model<User>) || 
(mongoose.model<User>("User", UserSchema));

const RecruiterModel = 
(mongoose.models.Recruiter as mongoose.Model<Recruiter>) || 
(mongoose.model<Recruiter>("Recruiter", RecruiterSchema));

const StudentModel =
(mongoose.models.Student as mongoose.Model<Student>) || 
(mongoose.model<Student>("Student", StudentSchema));


export { 
    UserModel, 
    RecruiterModel, 
    StudentModel, 
};
