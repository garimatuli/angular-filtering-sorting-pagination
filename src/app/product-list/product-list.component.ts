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
  // searchText: any;

  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'Product Id', name: 'productId', filtering: {filterString: '', placeholder: 'Filter by Product Id'}, sort: false},
    {title: 'Category', name: 'category', filtering: {filterString: '', placeholder: 'Filter by Category'}, sort: ''},
    {title: 'Amount', name: 'amount', filtering: {filterString: '', placeholder: 'Filter by Amount'}, sort: 'desc'},
    // {title: 'Amount', name: 'amount', filtering: {filterString: '', placeholder: 'Filter by Amount'}, sort: 'asc'},
];

  public page = 1;
  public itemsPerPage = 4;
  public maxSize = 3;
  public numPages = 1;
  public length = 0;

  public config: any = {
    paging: true,
    filtering: {filterString: ''},
    sorting: {columns: this.columns},
    className: ['table-striped', 'table-bordered', 'table-hover', 'table-sm']
  };


  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.getData();
    // this.onChangeTable(this.config);
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

  // calculating start & end page on clicking on a page number
  public changePage(page: any, data: Array<any>): Array<any> {
    const start = (page.page - 1) * page.itemsPerPage;
    const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  // filter data based on filter string
  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].toString().match(column.filtering.filterString);
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

  // sort data
  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    const columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }

    let filteredData = this.changeFilter(this.dataList, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log('Clicked cell data: ', data);
  }
}

