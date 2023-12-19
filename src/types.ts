export type TItem = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: TItem[];
};
