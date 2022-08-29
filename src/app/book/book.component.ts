import { Component, OnInit, TemplateRef } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../books/book.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  text: string;
  book: Book;
  ngOnInit(): void {
    let id = this.route.snapshot.paramMap?.get('id');

    this.service.getDocument(id).subscribe(
      (res) => {
        console.log(res, 'res==>');
        this.book = res.document;
      },
      (err) => {

        if ((err.name = 'HttpErrorResponse')) {
          this.router.navigate(['/books']);

          console.log(err);
        }else{
        this.toastr.error(err.name);
      }
      }
    );
  }

  goTo(page: any) {
    this.router.navigate(['/books/' + this.book._id + '/' + page._id]);
  }

  openModal(template: TemplateRef<any>) {
    this.modalService.open(template);
  }
  onSubmit(): void {
    let id = this.route.snapshot.paramMap?.get('id');
    let pageToSave = 0;
    for (const page of this.book.pages) {
      if (page.pageNr > pageToSave) {
        pageToSave = page.pageNr + 1;
      } else if (page.pageNr === pageToSave) {
        pageToSave = page.pageNr + 1;
      } else {
        break;
      }
    }
    const hi = this.service.addPage(id, this.text, pageToSave).subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.modalService.dismissAll();
          this.toastr.success('Book Added', 'title');
        }
      },
      (err) => {
        // console.log(err);
        this.toastr.error('error', err.message);
      }
    );
  }
}
