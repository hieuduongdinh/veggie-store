// controllers/product.controller.ts
import type { Request, Response } from "express";
import * as ProductService from "../services/product.service";
import { Product } from "../models/product.model";

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products: Product[] = await ProductService.getAllProducts();
    res.status(200).json({ message: "Success", data: products });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Success", data: product });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({ message: "Product created successfully", data: product });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.updateProduct(req.params.id, req.body);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully", data: product });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductService.getProductsByCategory(req.params.category);
    res.status(200).json({ message: "Success", data: products });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products by category",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};