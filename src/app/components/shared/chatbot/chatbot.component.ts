import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api-service/api.service';
import { ChatProduct } from '../../core/interfaces/chat.interface';

interface ChatMessage {
  from: 'user' | 'bot';
  text: string;
  products?: ChatProduct[];
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  private api = inject(ApiService);

  readonly open = signal(false);
  readonly loading = signal(false);
  readonly messages = signal<ChatMessage[]>([
    { from: 'bot', text: 'Salut! 🌿 Spune-mi ce problemă ai (ex. „am insomnie", „sunt stresat") și îți recomand un produs potrivit.' }
  ]);

  draft = '';

  toggle(): void {
    this.open.update(o => !o);
  }

  send(): void {
    const text = this.draft.trim();
    if (!text || this.loading()) {
      return;
    }

    this.messages.update(m => [...m, { from: 'user', text }]);
    this.draft = '';
    this.loading.set(true);

    this.api.chat(text).subscribe({
      next: (res) => {
        this.messages.update(m => [...m, { from: 'bot', text: res.reply, products: res.products }]);
        this.loading.set(false);
      },
      error: () => {
        this.messages.update(m => [...m, { from: 'bot', text: 'Ne pare rău, a apărut o eroare. Te rog încearcă din nou.' }]);
        this.loading.set(false);
      }
    });
  }
}
