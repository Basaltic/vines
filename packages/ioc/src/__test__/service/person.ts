import { createDecorator } from '../../instantiation';
import { IApple } from './apple';

export interface IPerson {
  _serviceBrand: undefined;
  eatApple(): void;
}

export const IPerson = createDecorator<IPerson>('IPerson');

export class Person implements IPerson {
  _serviceBrand: undefined;

  constructor(@IApple private apple: IApple) {}

  eatApple(): void {
    console.log('I am jam -- ');
    this.apple.eat();
  }
}
