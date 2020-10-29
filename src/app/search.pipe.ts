import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }
    searchText = searchText.toLowerCase();
    // This code will return a subset of an array of items if any item contains the searchText string.
    return items.filter( it => {
      return JSON.stringify(it).toLowerCase().includes(searchText);
    });
    // return null;
  }

}
