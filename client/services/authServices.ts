import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const getUserFromToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const res = await axios.get("http://localhost:5213/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        console.error("Profile fetch error:", error);
        return null;
    }
}