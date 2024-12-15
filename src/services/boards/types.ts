export interface CreateBoardDTO {
  title: string;
  userId: string;
  companyId: string;
}

export interface CreateListDTO {
  title: string;
  boardId: string;
}

export interface UpdateListDTO {
  title: string;
}

export interface MoveCardDTO {
  cardId: string;
  sourceListId: string;
  destinationListId: string;
  position: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}