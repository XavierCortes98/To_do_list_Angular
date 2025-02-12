import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BoardCardComponent } from './components/board-card/board-card.component';
import { BoardDetailComponent } from './pages/board-detail/board-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':boardId', component: BoardDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
