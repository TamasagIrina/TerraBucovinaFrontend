import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesActions } from '../../core/store/categoris/category.actions';
import { Store } from '@ngrx/store';
import { Category } from '../../core/interfaces/category.interface';
import { selectCategoryAddSuccess } from '../../core/store/categoris/category.selectors';

@Component({
  selector: 'app-add-category',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  category: Omit<Category, 'id'> = {
    name: '',
    description: ''
  };

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.select(selectCategoryAddSuccess).subscribe(success => {
      if (success) {
        this.resetForm();
      }
    });
  }

  onSubmit() {
    this.store.dispatch(
      CategoriesActions.addCategory({
        category: this.category
      })
    );
  }

  resetForm() {
    this.category = {
      name: '',
      description: ''
    };
  }
}


