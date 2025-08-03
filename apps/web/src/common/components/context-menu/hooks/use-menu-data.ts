import { useDataContext } from '../components/menu-provider';

export function useMenuData<T = { [key: string]: any }>() {
  const data = useDataContext();
  return data as T;
}
