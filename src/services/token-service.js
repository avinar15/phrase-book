export default class TokenService {
    static getAuthToken() {
        let token = localStorage.getItem("token");
        if (token !== '') {
            token = `Bearer ${token}`;
        }
        return token;
    }
}