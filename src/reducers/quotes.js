export default (state = [], action) => {
  let quote = action.quote
  let quoteId = action.quoteId
  let index
  switch (action.type) {
    case 'ADD_QUOTE':
      return [...state, quote]
    case 'REMOVE_QUOTE':
      return state.filter(quote => quote.id !== quoteId)
    case 'UPVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === quoteId);
      quote = state[index];

      return [
        ...state.slice(0, index),
        Object.assign({}, quote, { votes: quote.votes += 1 }),
        ...state.slice(index + 1)
      ];
    case 'DOWNVOTE_QUOTE':
      index = state.findIndex(quote => quote.id === quoteId);
      quote = state[index];
      if (quote.votes <= 0) {
        return state
      } else {
        return [
          ...state.slice(0, index),
          Object.assign({}, quote, { votes: quote.votes -= 1 }),
          ...state.slice(index + 1)
        ];
      }
    default: 
      return state;
  }
}
