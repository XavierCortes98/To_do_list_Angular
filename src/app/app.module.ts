import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './compontents/list/list.component';
import { TaskComponent } from './compontents/task/task.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    BoardDetailComponent,
    HomeComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    DragDropModule,
    BrowserModule,
    MatCardModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
