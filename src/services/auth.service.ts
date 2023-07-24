import { LoginResponse } from "../types/login.type";
import { ProfileResponse } from "../types/profile.type";
import { AxiosResponse, http } from "./http.service";

export async function login(
    email: string,
    password: string
): Promise<AxiosResponse<LoginResponse>> {
    return await http.post<LoginResponse>(
        "https://api.codingthailand.com/api/login",
        {
            email: email,
            password: password,
        }
    );
}

export function logout(): void {
    localStorage.removeItem("token");
}

export async function getProfile(): Promise<
    AxiosResponse<ProfileResponse | null>
> {
    const token = JSON.parse(localStorage.getItem("token")!) as LoginResponse;
    if (!token) {
        return null;
    }
    return await http.get<ProfileResponse>(
        "https://api.codingthailand.com/api/profile",
        {
            headers: {
                Authorization: `Bearer ${token.access_token}`,
            },
        }
    );
}
