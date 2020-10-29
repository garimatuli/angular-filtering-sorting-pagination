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
  searchText: any;

  public rows: Array<any> = [];

  public page: number = 1;
  public itemsPerPage: number = 3;
  public maxSize: number = 3;
  public numPages: number = 1;
  public length: number = 0;

  public config: any = {
    paging: true,
    // sorting: {columns: this.columns},
    // filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };


  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.getData();
    // this.onChangeTable(this.config);
  }

  getData() {
    this.appService.getDataService().subscribe(
      (item) => {
        this.dataList = item['dt'];
        this.onChangeTable(this.config);
        console.log(this.dataList);
      }
    );
  }

  public changePage(page:any, data:Array<any>):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    // if (config.filtering) {
    //   Object.assign(this.config.filtering, config.filtering);
    // }
    //
    // if (config.sorting) {
    //   Object.assign(this.config.sorting, config.sorting);
    // }
    //
    // let filteredData = this.changeFilter(this.data, this.config);
    // let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, this.dataList) : this.dataList;
    this.length = this.dataList.length;
  }
}

