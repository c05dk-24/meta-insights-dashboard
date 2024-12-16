// Add this new method to the BoardStore interface
moveCardToList: (sourceListId: string, targetListId: string, cardId: string) => void;

// Add this to the store implementation
moveCardToList: (sourceListId, targetListId, cardId) => {
  set((state) => {
    if (!state.activeBoard) return state;
    
    const newLists = state.activeBoard.lists.map(list => {
      if (list.id === sourceListId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      if (list.id === targetListId) {
        const cardToMove = state.activeBoard?.lists
          .find(l => l.id === sourceListId)?.cards
          .find(c => c.id === cardId);
          
        if (cardToMove) {
          return {
            ...list,
            cards: [...list.cards, { ...cardToMove, list_id: targetListId }]
          };
        }
      }
      return list;
    });

    return {
      ...state,
      activeBoard: {
        ...state.activeBoard,
        lists: newLists
      }
    };
  });
},