export type DishCategory = "entradas" | "principais" | "acompanhamentos" | "sobremesas" | "bebidas";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: DishCategory;
  image: string;
  rating: number;
  votes: number;
  isVegan: boolean;
  isGlutenFree: boolean;
  prepareTime: number;
  calories?: number;
}
