import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NgModel } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import { CommonModule } from '@angular/common';
import { pipe } from 'rxjs';

registerLocaleData(localeAr);




@Component({
  selector: 'app-root',
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  standalone: true,
  imports: [RouterOutlet,DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'date-app';
}
