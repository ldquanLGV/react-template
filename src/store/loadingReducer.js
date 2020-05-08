export default (state = {}, action) => {
  const { type } = action;
  const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  console.log(matches)
  return {
    ...state,
    [requestName]: requestState === "REQUEST",
  };
};