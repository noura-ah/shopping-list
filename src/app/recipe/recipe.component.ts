import { Component } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  chosenRecipe:Recipe
  private subscribtion:Subscription

  constructor(private recipeSevice: RecipeService){}

  ngOnInit(){
    this.subscribtion= this.recipeSevice.recipeDetails.subscribe((recipe:Recipe) => {
      this.chosenRecipe=recipe
    })  
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe()
  }

}
