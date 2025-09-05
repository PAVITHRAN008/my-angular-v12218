import { Injectable } from "@angular/core";
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})

export class UtilService {
    private secretKey = '12345678901234567890123456789012';
    private iv = '1234567890123456';
    async encryptPassword(password: string) {
        return CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(password),
            CryptoJS.enc.Utf8.parse(this.secretKey), {
            iv: CryptoJS.enc.Utf8.parse(this.iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
        ).toString();
    }
}