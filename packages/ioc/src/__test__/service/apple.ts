import { createDecorator } from '../../instantiation';

export interface IApple {
  _serviceBrand: undefined;
  eat(): void;
}

export const IApple = createDecorator<IApple>('IApple');

export class Apple implements IApple {
  _serviceBrand: undefined;
  eat() {
    console.log('eat apple');
  }
}
