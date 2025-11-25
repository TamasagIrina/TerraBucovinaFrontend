import { Component } from '@angular/core';
import * as PlantsActions from '../../core/store/plants/plants.actions';
import { Plant } from '../../core/interfaces/plant.interfece';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectAllPlants } from '../../core/store/plants/plants.selectors';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-about-plants',
  imports: [CommonModule],
  templateUrl: './about-plants.component.html',
  styleUrl: './about-plants.component.scss'
})
export class AboutPlantsComponent {
  plants$!: Observable<Plant[]>;

  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.store.dispatch(PlantsActions.loadPlants());


    this.plants$ = this.store.select(selectAllPlants);
  }

  getImageUrl(plant: Plant) {
    const base = environment.apiUrl.replace(/\/$/, '');
    const path = plant.imageUrl.startsWith('/') ? plant.imageUrl : '/' + plant.imageUrl;
    return base + path;
  }

  goToPlantDetails(id: number) {
    this.router.navigate(['details-plants', id]);
  }

}
