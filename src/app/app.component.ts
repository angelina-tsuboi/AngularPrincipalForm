import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  inputItemNgModel;
  textareaItemNgModel;
  inputItemFormControl = new FormControl();
  textareaItemFormControl = new FormControl();
}
