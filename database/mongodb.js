import mongoose from "mongoose";

import {DB_URI, NODE_ENV} from "../config/env.js"

if(!DB_URI){
    throw new Error("Please define the uri")
}

const connectToDatabase = async()=>{
    try {
        await mongoose.connect(DB_URI);
        console.log(`mongo uri ${DB_URI}`)

        console.log(`Connected to database in ${NODE_ENV} mode`)
        
    } catch (error) {
        console.log(DB_URI)
        console.log("Error connecting to the database", error)
        process.exit(1)
    }

}

export default connectToDatabase;