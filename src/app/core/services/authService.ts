import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";

import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private tokenKey = 'token';
    private logoutTimer: any;

    private _userSubject:BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public userData$:Observable<any>=this._userSubject.asObservable();

    sendUserData(value:any){
        this._userSubject.next(value);
    }

    saveToken(token: string): void {
        sessionStorage.setItem(this.tokenKey, token);

        const decoded: any = jwtDecode(token);
        const expiresAt = decoded.exp * 1000;
        const timeout = expiresAt - Date.now();

        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }

        this.logoutTimer = setTimeout(() => {
            this.logout();
        }, timeout);
    }

    logout() {
        this.clearToken()
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
        }
        window.location.href = '/landingpage';
    }

    getToken(): string | null {
        return sessionStorage.getItem(this.tokenKey);
    }
    clearToken(): void {
        sessionStorage.removeItem(this.tokenKey);
    }
    isLoggedIn(): boolean {
        const token = this.getToken();
        if (!token) return false;
        const decoded: any = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    }
}


