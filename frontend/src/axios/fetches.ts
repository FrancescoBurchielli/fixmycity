import axios from "axios";
import { baseUrl } from "./index";


export const getAllIssues =async (callback:Function) => {
    const results = await axios.get(baseUrl+"/issues");
    setTimeout(()=>callback(results.data),1000);
}

