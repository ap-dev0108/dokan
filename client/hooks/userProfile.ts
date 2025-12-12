import {  useState, useEffect } from "react";
import { getUserFromToken } from "@/services/authServices";

export const userProfile = async () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserFromToken();
                setProfile(data);
            } catch (err) {
                setError("Failed to fetch user profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return { profile, loading, error };
}