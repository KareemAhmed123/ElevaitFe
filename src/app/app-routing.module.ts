import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books/books.component';
import { PageComponent } from './page/page.component';

const routes: Routes = [
  {
    path: 'books',
    component: BooksComponent,
  }

  ,{
    path:'books/:id',
    component: BookComponent,

  },
  {
    path:'books/:id/:pageId',
    component: PageComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
