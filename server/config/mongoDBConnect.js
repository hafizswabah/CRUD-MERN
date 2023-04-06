import mongoose from "mongoose";
export default function DBconnect(){
    mongoose.connect('mongodb://127.0.0.1:27017/crud-react')
    .then((res)=>{
        console.log('DataBase Connected');
    })
    .catch((err)=>{
        console.log('database error ;',err);
    })
}