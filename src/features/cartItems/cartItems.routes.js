import express from "express";
import { CartItemsController } from './cartItems.controller.js';

const cartRouter = express.Router();

const cartController = new CartItemsController();

cartRouter.delete('/:id', cartController.delete)
cartRouter.get('/', cartController.get);
cartRouter.post('/', cartController.add);

export default cartRouter;