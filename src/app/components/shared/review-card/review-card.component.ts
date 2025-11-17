import { Component, Input } from '@angular/core';
import { Review } from '../../core/interfaces/review.inerface';
import { User } from '../../core/interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/authService/auth-sevices.service';

@Component({
  selector: 'app-review-card',
  imports: [CommonModule
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent {
  @Input() review!: Review;
  isExpanded = false;
  isTextLong = false;
  user:User | undefined;

  constructor(private apiAuth: AuthService){}

  ngOnInit(): void {
    this.isTextLong = this.review.body.length > 160;
    this.apiAuth.getUserById(this.review.userId).subscribe(user =>{
      this.user=user;
      console.log(user);
    })
  }

  isStarFilled(index: number, stars: number): boolean {
    return index < Math.floor(stars);
  }
  toggleText(): void {
    this.isExpanded = !this.isExpanded;
  }

  getStarsArray(count: number): number[] {
    return Array(5).fill(0);
  }

  // getUserName(user: User | number | null): string {
  //   if (user && typeof user === 'object') {
  //     return user.name ?? 'Anonim';
  //   }
  //   return 'Anonim';
  // }

  // getUserImage(user: User | number | null): string {
  //   if (user && typeof user === 'object' && user.imageUrl) {
  //     return user.imageUrl;
  //   }
  //   return 'https://via.placeholder.com/50'; // fallback default image
  // }
}
