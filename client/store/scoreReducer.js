import axios from 'axios'

//action types
export const ADDED_SCORE = 'ADDED_SCORE'
export const GOT_AVERAGE = 'GOT_AVERAGE'

//action creators
export const addedScore = score => ({
  type: ADDED_SCORE,
  score
})

export const getAverage = () => ({
  type: GOT_AVERAGE
})

//thunk creators -- do I even need any?

//initial state
// const initialState = {
//     score: 0
// }
//reducer

export default function(state = 0, action) {
  switch (action.type) {
    case ADDED_SCORE:
      let newScore = state + action.score
      return newScore;
    // case GOT_AVERAGE:
    // let allScores = state.slice();
    //   return allScores.reduce((total, score, index) => {
    //     total += score
    //     if (index === state.length - 1) {
    //       return total / state.length
    //     } else {
    //       return total
    //     }
    //   })
    default:
      return state
  }
}
