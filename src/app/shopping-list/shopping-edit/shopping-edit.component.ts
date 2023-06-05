import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  subscription: Subscription
  editedItem: Ingredient
  index:number
  @ViewChild('f') f: NgForm
  editMode= false


  constructor(private shoppingSevice: ShoppingService) { }

  ngOnInit() {
    this.subscription= this.shoppingSevice.editedItem.subscribe((index) => {
      this.index = index
      this.editMode = true
      this.editedItem = this.shoppingSevice.getIngredient(index)
      this.f.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }


  onAdd(form: NgForm) {
    const value = form.value
    const newIngredient= new Ingredient(value.name, value.amount)
    if (this.editMode){
      this.shoppingSevice.updateIngredient(this.index,newIngredient)
    }
    else
      this.shoppingSevice.addIngredient(newIngredient)
    form.reset()
    this.editMode = false
  }

  onClear(){
    this.f.reset()
    this.editMode = false
  }

  onDelete(){
    this.shoppingSevice.deleteIngredient(this.index)
    this.onClear()
  }

}
