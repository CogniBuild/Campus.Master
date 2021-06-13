import { Pipe, PipeTransform } from '@angular/core';
import { Classroom } from '../../../modules/classroom/shared/model/classrooms';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Classroom[], search = ''): Classroom[] {
    if (!search.trim()) {
      return value;
    }

    return value.filter((data: Classroom) => {
      return data.title.toLowerCase().includes(search.toLowerCase());
    });

  }
}
