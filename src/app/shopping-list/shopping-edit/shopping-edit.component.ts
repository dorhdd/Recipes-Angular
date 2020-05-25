import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static:false}) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editIndex: number;
  editItem: Ingredient;
  
  constructor(private ShoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.ShoppingListService.startedEditing.subscribe((index:number)=>{
      this.editMode = true;
      this.editIndex = index;
      this.editItem = this.ShoppingListService.getIngredientItem(index)
      this.shoppingListForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    })
  }

  onSubmit(form: NgForm){
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.ShoppingListService.updateIngredient(newIngredient, this.editIndex)
    } else{
        this.ShoppingListService.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset()
  }

  onDeleteItem(){
    this.ShoppingListService.deleteIngredient(this.editIndex)
    this.onClearInputs()
  }

  onClearInputs(){
    this.shoppingListForm.reset()
    this.editMode = false
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  


}
