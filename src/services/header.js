import TokenService from "./token-service";

function getCommonHeaders() {
    const token = TokenService.getAuthToken();
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
    }
}

export default getCommonHeaders;