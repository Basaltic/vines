import { Injectable } from '@vines/core';
import { EventEmitter as EventEmitter3 } from 'eventemitter3';

@Injectable()
export class EventEmitter extends EventEmitter3 {}
