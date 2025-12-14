import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const getUserFromToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const res = await axios.get("http://localhost:5213/Auth/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const decoded: any = jwtDecode(token);

        console.log("Profile Data:", res.data);
        return { ...res.data, decoded};
    } catch (error) {
        console.error("Profile fetch error:", error);
        return null;
    }
}