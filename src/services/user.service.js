// server call to user DB
import axios from 'axios';
import store from '../store/store';

export function getTopScores() {
  var apiCall = axios.get( 'http://localhost:8000/api/rank/top' ).then(response => {
    return response.data
  });
  return apiCall;
}

export function getCurrentRank() {
  const promise = axios.get( 'http://localhost:8000/api/rank/:gameId' );
  store.dispatch( getCurrentRank(promise) );
}

export function pushRank(user, score) {
  const promise = axios.post( `http://localhost:8000/api/userInfo/${user}/${score}` );
  store.dispatch( pushRank(promise) );
}
