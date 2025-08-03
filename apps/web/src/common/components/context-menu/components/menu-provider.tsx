import React, { useContext, createContext } from 'react';

const MenuContext = createContext({});

export function useDataContext() {
  return useContext(MenuContext);
}

export interface ProviderProps {
  [key: string]: any;
}

export const MenuDataProvider: React.FC<ProviderProps> = (props) => {
  return <MenuContext.Provider value={props}>{props.children}</MenuContext.Provider>;
};
