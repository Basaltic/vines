import { Board } from './board';
import { ImageNodeDescription } from './node/node-impl/image';

export const board = new Board();

export const useBoard = () => board;

// register nodes
board.descriptionRegistry.register(ImageNodeDescription);
