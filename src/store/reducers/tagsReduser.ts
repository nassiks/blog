import { ADD_TAG, REMOVE_TAG, TagActions } from '../../types/tagsTypes'

export interface TagsState {
  tags: string[]
}

const initialState: TagsState = {
  tags: [],
}

export function tagsReducer(state = initialState, action: TagActions): TagsState {
  switch (action.type) {
    case ADD_TAG:
      return { ...state, tags: [...state.tags, action.payload] }
    case REMOVE_TAG:
      return { ...state, tags: state.tags.filter((tag) => tag !== action.payload) }
    default:
      return state
  }
}
