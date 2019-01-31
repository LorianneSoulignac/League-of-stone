import axios from "axios";
import { SERVER_URL } from './consts';

const request = ()=>{
  axios
  .get(
    SERVER_URL +
      "/matchmaking/request?matchmakingId="+this.state.matchmakingId+"&token="+this.state.token
  ).then(res => {
    if (res.data.status === "ok") {
      console.log("request envoyé")
      console.log(res)
      }
    });
}


export {
  request
}