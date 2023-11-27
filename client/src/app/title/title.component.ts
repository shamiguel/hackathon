import { Component, ElementRef, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormGroup, FormsModule, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../auth.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.sass'
})
export class TitleComponent {
  constructor(public dialog: MatDialog) {}
  @Input() isLoggedIn: boolean = false;
  @Output() loginChange = new EventEmitter<boolean>();

  handleLogout(){
    this.loginChange.emit(false)
    
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        isLoggedIn: this.isLoggedIn,
        loginChange: this.loginChange,
      }
    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule],
})
export class DialogAnimationsExampleDialog {

    form:FormGroup;
    @Input() isLoggedIn!: boolean; // Receive isLoggedIn from parent
    @Output() loginChange = new EventEmitter<boolean>();

    constructor(
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
      private fb:FormBuilder, 
      private authService: AuthService, 
      private router: Router,
      @Inject(MAT_DIALOG_DATA) private data: any,
      ) { 
      this.form = this.fb.group({
          username: [''],
          password: ['']
      });
      this.isLoggedIn = this.data.isLoggedIn;
      this.loginChange = this.data.loginChange;
    }

  updateIsLoggedIn(newState: boolean){
    this.isLoggedIn = newState
  }


  login(){
    console.log(this.isLoggedIn)
    const val = this.form.value;
    if(val.username && val.password){
      console.log("We're going!")
      this.authService.login(val.username, val.password)
        .subscribe(
          (data)=>{
            console.log(data)
            if(this.authService.isLoggedIn()){
              console.log("User is logged in", data)
              this.isLoggedIn = true;
              this.loginChange.emit(true)
              this.dialog.closeAll()
            }
          }
        )
    }
    console.log("hello", this.authService.isLoggedIn())
  }
  handleSubmit(){
    console.log("hello!")
    this.login()
  }
}