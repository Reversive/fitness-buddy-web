import { Api } from './api.js';

export { UserApi, Credentials, SignUpCredentials,Verification};

class UserApi {
    static get url() {
        return `${Api.baseUrl}/users`;
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, controller);
        Api.token = undefined;
    }
    static async register(credentials){
        return await Api.post(`${UserApi.url}`,false,credentials);
    }
    static async verifyCode(code){
        return await Api.post(`${UserApi.url}/verify_email`,false,code);
    }
    static async resendVerificationCode(email) {
        const payload = new ResendVerification(email);
        return await  Api.post(`${UserApi.url}/resend_verification`, false, payload);
    }
}

class Credentials {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
class Verification {
    constructor(email, code) {
        this.email = email;
        this.code = code;
    }
}
class SignUpCredentials {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
class ResendVerification {
    constructor(email) {
        this.email = email;

    }

}