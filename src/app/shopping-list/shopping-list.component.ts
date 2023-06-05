import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  ingredients:Ingredient[] = []
  private subscribtion :Subscription

  constructor( private shoppingSevice: ShoppingService){}

  ngOnInit(){
    this.ingredients=this.shoppingSevice.getIngredients()
    this.subscribtion = this.shoppingSevice.ingredientAdded.subscribe(ingredients => this.ingredients=ingredients)
  }
  onAddItem(ingredient: Ingredient){
    this.ingredients.push(ingredient)
  }

  onEditItem(index: number){
    this.shoppingSevice.editedItem.next(index)
  }

  ngOnDestroy(){
    this.subscribtion.unsubscribe()
  }
}
