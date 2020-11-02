import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  title = 'angularTry';
  dataList: any = [];
  direction: number;
  isDesc = false;
  column = 'CategoryName';

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Product Id', name: 'productId'},
    {title: 'Category', name: 'category', filtering: {filterString: '', placeholder: 'Filter by Category'}},
    {title: 'Amount', name: 'amount', filtering: {filterString: '', placeholder: 'Filter by Amount'}},
];

  public page = 1;
  public itemsPerPage = 4;
  public maxSize = 3;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    filtering: {
      filterString: '',
      category: { filterString: '' },
      amount: { filterString: '' },
    },
    sorting: {columns: this.columns},
    className: ['table-striped', 'table-bordered', 'table-hover', 'table-sm']
  };


  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.getData();
  }

  // get data from App Service
  getData() {
    this.appService.getDataService().subscribe(
      (item) => {
        this.dataList = item['dt'];
        this.onChangeTable(this.config);
        console.log(this.dataList);
      }
    );
  }

  // sort function
  sort(property) {
    this.isDesc = !this.isDesc; // change the direction
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  // calculating start & end page on clicking on a page number
  public changePage(page: any, data: Array<any>): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  // filter data based on particular columns
  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          if (column.name === 'category') {
            return item[column.name].toString().match(this.config.filtering.category.filterString);
          }
          if (column.name === 'amount') {
            return item[column.name].toString().match(this.config.filtering.amount.filterString);
          }
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    // filter data based on all columns
    const tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    const filteredData = this.changeFilter(this.dataList, this.config);
    this.rows = page && config.paging ? this.changePage(page, filteredData) : filteredData;
    this.length = filteredData.length;
  }

}

