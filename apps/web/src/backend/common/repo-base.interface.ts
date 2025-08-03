import { BaseEntity } from './base.do';

export interface IRepo<T extends BaseEntity> {
    getOne(id: string): Promise<T | undefined>;
    getList(where: Partial<T>): Promise<T[]>;
    getAll(): Promise<T[]>;
    create(entity: Partial<T>): Promise<T>;
    update(id: string, entity: Partial<T>): Promise<number>;
    delete(id: string): Promise<void>;
}
