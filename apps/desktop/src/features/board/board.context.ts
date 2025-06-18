import { createContext } from 'react';
import { cardBoardEditor, type CardBoardEditor } from './board';

export const CardBoardEditorContext = createContext<CardBoardEditor>(cardBoardEditor);

export const CardBoardEditorProvider = CardBoardEditorContext.Provider;
