export const sortListsAlphabetically = (lists: { id: string; title: string }[]) => {
  return [...lists].sort((a, b) => a.title.localeCompare(b.title));
};

export const findCurrentList = (lists: { id: string; title: string }[], currentListId: string) => {
  return lists.find(list => list.id === currentListId);
};