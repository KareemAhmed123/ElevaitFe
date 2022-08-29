import {
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiserviceService } from '../apiservice.service';
import { Book } from './book.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  constructor(
    private service: ApiserviceService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService

  ) {}

  books: Book[] = [];
  ngOnInit(): void {
    this.service.getAllData().subscribe((res) => {
      this.books = res.documents;
    },(err)=>{
      if(err.name="HttpErrorResponse"){
      console.log(err);
      this.toastr.error('Backend is not responding');
    }
    this.toastr.error('Backend is not responding');

    });
  }
  bookForm = this.formBuilder.group({
    title: [null, [Validators.required, Validators.minLength(3)]],
    author: [null, [Validators.required, Validators.minLength(3)]],
    date: [null, [Validators.required, Validators.minLength(3)]],
  });
  openModal(template: TemplateRef<any>) {
    this.modalService.open(template);
  }
  delete(id:any){
    this.service.delete(id).subscribe((data)=>{
      if (data.statusCode === 204) {
        this.toastr.success( 'Book deleted');
        this.ngOnInit();
      }
    },(err)=>{
      console.log(err);
      this.toastr.error(err.status,err.name);
    });
  }
  onSubmit(): void {
    const hi = this.service.addBook(this.bookForm.value).subscribe((data) => {
      if (data.statusCode === 200) {
        this.modalService.dismissAll();
        this.toastr.success( 'Book Added','title');
        this.bookForm=this.formBuilder.group({
          title: [null, [Validators.required, Validators.minLength(3)]],
          author: [null, [Validators.required, Validators.minLength(3)]],
          date: [null, [Validators.required, Validators.minLength(3)]],
        });
      }
    },(err)=>{
      console.log(err);
      this.toastr.error(err.error.message);
    });
  }
}
