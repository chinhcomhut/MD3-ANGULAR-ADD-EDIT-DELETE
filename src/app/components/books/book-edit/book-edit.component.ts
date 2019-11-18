import { Component, OnInit, OnDestroy } from '@angular/core';
import { BooksModels} from '../../../models/books.models';
import { BooksService} from '../../../services/books.service';
import { Subscription} from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  isSuccess = false;
  public subscription: Subscription;
  public booksmodels: BooksModels;
  public subscriptionParams: Subscription;

  constructor(
    public booksService: BooksService,
    public routerService: Router,
    public activateRouteService: ActivatedRoute
    ) { }

  ngOnInit() {
    this.booksmodels = new BooksModels();
    this.loadData();
  }
  loadData() {
this.subscriptionParams = this.activateRouteService.params.subscribe(data  => {
  const i = data.id;
  this.subscription = this.booksService.getBook(i).subscribe((booksmodels: BooksModels) => {
    this.booksmodels = booksmodels;
  });
});
  }
  onEditBooks() {
this.subscription = this.booksService.updateBook(this.booksmodels).subscribe(data => {
  this.routerService.navigateByUrl('booksmodels');
  this.isSuccess = true;
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

}
