import { Router } from "express";

const subsriptionRouter = Router();

subsriptionRouter.get('/',(req,res)=>{
    res.send({title:'GET  all subsriptions'})
})
subsriptionRouter.get('/:id',(req,res)=>{
    res.send({title:'GET all subsription details'})
})
subsriptionRouter.post('/',(req,res)=>{
    res.send({title:'CREATE subsription'})
})
subsriptionRouter.put('/:id',(req,res)=>{
    res.send({title:'UPDATE subsription'})
})
subsriptionRouter.delete('/:id',(req,res)=>{
    res.send({title:'DELETE all subsription'})
})
subsriptionRouter.put('/:id/cancel',(req,res)=>{
    res.send({title:'CANCEL subsription'})
})
subsriptionRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({title:'GET upcoming renewals'})
})

export default subsriptionRouter