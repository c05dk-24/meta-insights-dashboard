export interface List {
  id: string;
  title: string;
}

export interface ListSelectorProps {
  currentListId: string;
  lists: List[];
  onSelect: (listId: string) => void;
  disabled?: boolean;
}

export interface ListOptionProps {
  list: List;
  isCurrentList: boolean;
}