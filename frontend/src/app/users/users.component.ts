import {Component, computed, effect, inject, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {toSignal} from "@angular/core/rxjs-interop";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";


interface User {
  id: number;
  name: string;
  email: string;
}
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private http = inject(HttpClient);

  // 1️⃣ Load users from API using toSignal
  usersFromApi = toSignal(
    this.http.get<User[]>('https://jsonplaceholder.typicode.com/users'),
    { initialValue: [] }
  );

  // 2️⃣ Writable signal for local user list (initialized later)
  users = signal<User[]>([]);

  // 3️⃣ Writable signal for filter input
  filter = signal('');

  // 4️⃣ Computed: filtered user list
  filteredUsers = computed(() =>
    this.users().filter(user =>
      user.name.toLowerCase().includes(this.filter().toLowerCase())
    )
  );

  // 5️⃣ Computed: total count
  userCount = computed(() => this.users().length);

  constructor() {
    // Initialize user list from API
    effect(() => {
        this.users.set(this.usersFromApi());
    }, { allowSignalWrites: true });

    // Effect: log whenever filter changes
    effect(() => {
      console.log(`🔍 Filter: "${this.filter()}" — ${this.filteredUsers().length} users match`);
    });
  }

  // Add a new user
  addUser(name: string, email: string) {
    if (!name.trim() || !email.trim()) return;
    const newUser: User = {
      id: Date.now(),
      name,
      email
    };
    this.users.update(users => [...users, newUser]);
  }
}
