import { SignupState } from "../loginComponents/SignupForm";

class ConnectionManager {
    private token = localStorage.getItem('token') ? localStorage.getItem('token') : ''; // In case it was saved from previous tabs
    private expiration = localStorage.getItem('expiration'); // Expiration time of the token
    private expirationDate = this.expiration === null ? null : new Date(this.expiration); // Expiration time from date

    /**
     * Logins in with user credentials
     * @returns void
     */
    async login(username: string, password: string, callback: Function) {
        let response = await fetch('/token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password })
        })

        if (response.ok) {
            response.json().then(json => {
                this.token = json.token;
                localStorage.setItem('token', json.token);
                this.expirationDate = new Date(new Date().getTime() + 5 * 60000);
                localStorage.setItem('expiration', this.expirationDate.toString())
                callback(true)
            }
            );
        }
        else {
            callback(false);
        }
    }

    async signUp(signupInfo: SignupState, callback: Function) {
        let response = await fetch('/api/register_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        })

        if (response.ok) {
            callback(true, signupInfo.username, signupInfo.password);
        }
        else {
            callback(false);
        }
    }


    /**
     * Checks if a valid
     * @returns expired {Boolean} if a valid and non-expired token exists
     */
    checkTokenExpiration(): Boolean {
        let now = new Date();
        if (this.expirationDate === null || this.expirationDate < now) {
            return false;
        }
        return true;
    }

    /**
     * 
     * @param url {String} URL of api being requested
     * @param callback {Function} Function called after the get request is completed, called with the response json
     * @param tokenRequired {Boolean} Specify if the JWT token needs to be included in the request
     */
    getApi(url: string, callback: Function, tokenRequired: Boolean = true): void {
        this.checkTokenExpiration();

        fetch(
            url,
            tokenRequired ? {
                headers: {
                    Authorization: `JWT ${this.token}`
                }
            } : {}
        )
            .then(res => res.json())
            .then(json => callback(json));
    }

    postApi(url: string, data: any, callback: Function, tokenRequired: Boolean = true): void {
        this.checkTokenExpiration();

        fetch(
            url,
            tokenRequired ? {
                method: 'POST',
                headers: {
                    Authorization: `JWT ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            } : {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }
        )
            .then(res => res.json())
            .then(json => callback(json.result));
    }

    /**
     * 
     */
    logout() {
        this.token = '';
        this.expirationDate = null;
    }
}

let connectionManager = new ConnectionManager()
export default connectionManager;