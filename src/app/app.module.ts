import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BoardDetailComponent } from './pages/board-detail/board-detail.component';
import { BoardCardComponent } from './compontents/board-card/board-card.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { ListComponent } from './compontents/list/list.component';
import { TaskComponent } from './compontents/task/task.component';
import { HomeComponent } from './pages/home/home.component';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    BoardDetailComponent,
    HomeComponent,
    ClickOutsideDirective,
    BoardCardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    TextFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    DragDropModule,
    MatInputModule,
    BrowserModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
