export const actionObject = (
  type: string,
  payload?: any | null
): AnyAction => ({
  type,
  payload,
});
