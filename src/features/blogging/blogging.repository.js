import {ObjectId} from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class BlogRepository{

    constructor(){
        this.collection = "blogs";
    }
 
    async add(newBlog){
        try{
            // 1 . Get the db.
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newBlog);
            return newBlog;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async update(){
        try{
            // 1 . Get the db.
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.updateOne(
                {id: new ObjectId(id)},
                {$inc:{
                    title: title,
                    content: content,
                    author: author
                }},
                {upsert: true}) 
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const blogs = await collection.find().toArray();
            console.log(blogs);
            return blogs;
        } catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({_id: new ObjectId(id)});
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async delete(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection)
            const result = await collection.deleteOne({_id: new ObjectId(id)});
            return result.deletedCount>0;
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with database", 500);    
        }
    }

    async getNextCounter(db){
        const resultDocument = await db.collection("counters").findOneAndUpdate(
            {_id:'id'},
            {$inc:{value: 1}},
            {returnDocument:'after'}
        )  
        console.log(resultDocument);
        return resultDocument.value.value;
    }

}

export default BlogRepository;