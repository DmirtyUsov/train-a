import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'carriageClass',
  standalone: true,
})
export class CarriageClassPipe implements PipeTransform {
  transform(value: string): string {
    const match = value.match(/\d+/);
    if (!match) return value;

    const number = parseInt(match[0], 10);

    let suffix = 'th';
    if (number === 1) suffix = 'st';
    else if (number === 2) suffix = 'nd';
    else if (number === 3) suffix = 'rd';

    return `${number}${suffix} class`;
  }
}
