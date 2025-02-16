import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BoardDetailComponent } from './pages/board-detail/board-detail.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { ClickOutsideDirective } from './directive/click-outside.directive';
import { ListComponent } from './components/list/list.component';
import { TaskComponent } from './components/task/task.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { HomeComponent } from './pages/home/home.component';

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './components/login/login.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    HomeComponent,
    NewBoardComponent,
    BoardCardComponent,
    BoardDetailComponent,
    ClickOutsideDirective,
    LoginComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AppRoutingModule,
    TextFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    DragDropModule,
    MatInputModule,
    BrowserModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
