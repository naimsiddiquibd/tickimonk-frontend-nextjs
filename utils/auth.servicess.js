import { authKey } from "@/constant/authkey";
import { setLocalStorage } from "./local-storage";

export  const storeUserInfo = ({accessToken}) => {
     return setLocalStorage(authKey, accessToken);
}