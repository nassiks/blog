export const ADD_TAG = 'ADD_TAG'
export const REMOVE_TAG = 'REMOVE_TAG'

export interface AddTagAction {
  type: typeof ADD_TAG
  payload: string
}

export interface RemoveTagAction {
  type: typeof REMOVE_TAG
  payload: string
}

export type TagActions = AddTagAction | RemoveTagAction
