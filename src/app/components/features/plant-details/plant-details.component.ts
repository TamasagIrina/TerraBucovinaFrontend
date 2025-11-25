import { Component, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Plant } from '../../core/interfaces/plant.interfece';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectPlantById } from '../../core/store/plants/plants.selectors';
import { CommonModule } from '@angular/common';
import { ReviewCardComponent } from '../../shared/review-card/review-card.component';
import { environment } from '../../../../environments/environment';
import * as PlantsActions from '../../core/store/plants/plants.actions';

@Component({
  selector: 'app-plant-details',
  imports: [CommonModule,
    RouterLinkWithHref,

  ],
  templateUrl: './plant-details.component.html',
  styleUrl: './plant-details.component.scss'
})
export class PlantDetailsComponent {
  plant$!: Observable<Plant | undefined>;

  readonly router = inject(ActivatedRoute);
  id!: number;
  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const idFromRoute = params.get('id');
      this.id = idFromRoute ? parseInt(idFromRoute, 10) : 0;
      this.store.dispatch(PlantsActions.loadPlants());
      this.plant$=this.store.select(selectPlantById(this.id));
      


    });
  }

    getImageUrl(plant: Plant) {
      if(!plant || !plant.imageUrl){
        return  'https://placehold.co/60x40/cccccc/ffffff?text=Img';
      }
      const base = environment.apiUrl.replace(/\/$/, '');
      const path = plant.imageUrl.startsWith('/') ? plant.imageUrl : '/' + plant.imageUrl;
      return base + path;
    }
}
