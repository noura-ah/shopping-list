import { Injectable, Output } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  ingredients: Ingredient[] = [
    new Ingredient('Apples',5),
    new Ingredient('Tomatoes',5),
  ]

  ingredientAdded = new Subject<Ingredient[]>()
  editedItem = new Subject<number>()

  constructor() { }

  getIngredients(){
    return this.ingredients.slice()
  }

  addIngredient(ingredient:Ingredient){
    this.ingredients.push(ingredient)
    this.ingredientAdded.next(this.ingredients.slice())
  }

  addIngredients(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients)
    this.ingredientAdded.next(this.ingredients.slice())
  }

  getIngredient(index: number){
    return this.ingredients[index]
  }

  updateIngredient(index: number,ingredient: Ingredient){
    console.log(index,ingredient)
    this.ingredients[index]= ingredient
    this.ingredientAdded.next(this.ingredients.slice())
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index,1)
    this.ingredientAdded.next(this.ingredients.slice())
  }
}
