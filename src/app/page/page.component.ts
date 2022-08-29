import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiserviceService } from '../apiservice.service';
import { BookComponent } from '../book/book.component';
import { Book } from '../books/book.model';
import { Page } from './page.model';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
})
export class PageComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,

  ) { }
  book: Book;
  page: Page;
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap?.get('id');

    let pageId = this.route.snapshot.paramMap?.get('pageId');

    this.service.getDocument(id).subscribe((res) => {
      this.book = res.document;
      for (const page of res.document.pages) {
        if (page._id === pageId) {
          this.page = page;
          return;
        }
      }
    }, (err) => {
      if (err.name = "HttpErrorResponse") {
        this.router.navigate(['/books']);

        console.log(err);
        this.toastr.error('Backend is not responding');
      } else {
        this.toastr.error(err.name);
      }
    });

  }
}
