import { Product } from "../models/product.model";

let products: Product[] = []; 

export const getAllProducts = async (): Promise<Product[]> => {
  return products; 
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return products.find(product => product.id === id) || null; 
};

export const createProduct = async (data: Omit<Product, 'id'>): Promise<Product> => {
  const newProduct: Product = { id: String(products.length + 1), ...data }; 
  products.push(newProduct); 
  return newProduct;
};

export const updateProduct = async (id: string, data: Partial<Product>): Promise<Product | null> => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) return null;
  products[productIndex] = { ...products[productIndex], ...data }; 
  return products[productIndex];
};

export const deleteProduct = async (id: string): Promise<Product | null> => {
  const productIndex = products.findIndex(product => product.id === id);
  if (productIndex === -1) return null;
  const deletedProduct = products[productIndex];
  products.splice(productIndex, 1); 
  return deletedProduct;
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  return products.filter(product => product.category === category);
};