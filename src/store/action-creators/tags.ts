import { ADD_TAG, AddTagAction, REMOVE_TAG, RemoveTagAction } from '../../types/tagsTypes'

export const addTag = (tag: string): AddTagAction => ({
  type: ADD_TAG,
  payload: tag,
})

export const removeTag = (tag: string): RemoveTagAction => ({
  type: REMOVE_TAG,
  payload: tag,
})
