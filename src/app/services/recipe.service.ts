import { Injectable, Output } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [
    new Recipe(' test', 'test desc', 
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
    [new Ingredient('bread',3)]),
    new Recipe(' test2', 'test desc2',
     'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
     [new Ingredient('orange',3),new Ingredient('potatos',5)])
  ]
  
  @Output() recipeDetails = new Subject<Recipe>()
  
  constructor() { }

  getRecipes(){
    // slice() to return a copy from arr
    return this.recipes.slice()
  }

  getRecipe(id:number){
    return this.recipes[id]
  }


}
