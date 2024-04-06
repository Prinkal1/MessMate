import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { apiConnector } from "../apiConnector"
import { menuEndpoints } from "../apis"

const {
    FETCH_MENU_API,
    ADD_MENU_API,
    UPDATE_MENU_API,
    FETCHALL_MENU_API,
} = menuEndpoints

export function menufetch(Day,navigate) {
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("GET", FETCH_MENU_API, {
                Day,
            })
            console.log("fetch menu API RESPONSE............", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }

        }catch (error) {
            console.log("MENUFETCH API ERROR............", error)
            toast.error("Could Not FETCH MENU")
        }
        dispatch(setLoading(false))
    }
    
}