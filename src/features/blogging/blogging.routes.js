// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import BlogController from './blogging.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const blogRouter = express.Router();
const blogController = new BlogController();

blogRouter.get(
  '/',jwtAuth,
  (req, res)=>{
    blogController.getAllBlogs(req, res)
 }
);

blogRouter.post(
  '/',jwtAuth,
  (req, res)=>{
    blogController.addBlog(req, res)
 }
);

blogRouter.get(
  '/:id',jwtAuth,
  (req, res)=>{
    blogController.getOneBlog(req, res)
 }
);

blogRouter.put(
  '/:id',jwtAuth,
  (req, res)=>{
    blogController.updateBlog(req, res)
 }
);

blogRouter.delete(
  '/:id',jwtAuth,
  (req, res, next)=>{
    blogController.delete(req, res, next)
});

export default blogRouter;