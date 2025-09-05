import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';
import { AuthService } from './authService';
import { tap } from 'rxjs/operators';
import { StateManagerService } from './state-manager.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private authToken: any;
  private SIGNIN = '/api/auth/register';
  private LOGIN = '/api/auth/login';
  private CHECK_USER_NAME = '/api/auth/check-username';
  private FORGOT_CHANGE_PASS = "/api/auth/forgotPass"

  private GET_USERS = '/api/users';
  private DELETE_USER = '/api/users/deleteUser';
  private CREATER_USER = '/api/users/createUser';
  private CHANGE_PASS = '/api/users/changePass';
  constructor(private http: HttpClient, private authService: AuthService,private stateManager:StateManagerService) {
    //this.authToken = this.authService.getToken();
    this.getToken();
  }
  getToken() {
    this.stateManager.getUserDetailsFromState().subscribe((userStateData: any) => {
      this.authToken=userStateData.token;
    })
  }
  private apiUrl(url: string): string {
    return `${ENV.apiUrl}${url}`;
  }
  get<T>(endpoint: string, options?: {
    pathParams?: (string | number)[],
    queryParams?: any,
  }): Observable<T> {

    let url = this.apiUrl(endpoint);
    if (options?.pathParams?.length) {
      url += '/' + options.pathParams.join('/');
    }

    let params = new HttpParams();
    if (options?.queryParams) {
      Object.keys(options.queryParams).forEach(key => {
        if (options.queryParams[key] !== undefined && options.queryParams[key] !== null) {
          params = params.set(key, options.queryParams[key]);
        }
      });
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    return this.http.get<T>(url, { headers, params });
  }
  postData(endpoint: string, requestData: any): Observable<any> {
    const fullUrl = this.apiUrl(endpoint);
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    if (this.authToken) {
      httpHeaders = httpHeaders.set('Authorization', `Bearer ${this.authToken}`);
    }
    return this.http.post<any>(fullUrl, requestData, { headers: httpHeaders });
  }

  put<T>(endpoint: string, body: any, options?: {
    pathParams?: (string | number)[],
    queryParams?: any,
  }): Observable<T> {

    let url = this.apiUrl(endpoint);
    if (options?.pathParams?.length) {
      url += '/' + options.pathParams.join('/');
    }

    let params = new HttpParams();
    if (options?.queryParams) {
      Object.keys(options.queryParams).forEach(key => {
        if (options.queryParams[key] !== undefined && options.queryParams[key] !== null) {
          params = params.set(key, options.queryParams[key]);
        }
      });
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }
    return this.http.put<T>(url, body, { headers, params });
  }


  signIn(data: any): Observable<any> {
    return this.postData(this.SIGNIN, data);
  }
  logIn(data: any): Observable<any> {
    return this.postData(this.LOGIN, data).pipe(
      tap((res: any) => {
        if (res.data.success)
          this.authService.saveToken(res.data.token);
      })
    );
  }
  getUserList(): Observable<any> {
    return this.get(this.GET_USERS);
  }
  getParticularUser(data: any): Observable<any> {
    return this.get(this.GET_USERS, { pathParams: [data._id] });
  }
  deleteUser(data: any): Observable<any> {
    return this.get(this.DELETE_USER, { pathParams: [data.id] });
  }
  createrUser(data: any): Observable<any> {
    return this.postData(this.CREATER_USER, data);
  }
  editUser(data: any): Observable<any> {
    return this.put(this.GET_USERS, data, { pathParams: [data._id] });
  }
  changePassword(data: any): Observable<any> {
    return this.put(this.CHANGE_PASS, data, { pathParams: [data.id] });
  }
  userVerfy(data: any): Observable<any> {
    return this.get(this.CHECK_USER_NAME, { pathParams: [data] });
  }
  forgotChangePass(data: any): Observable<any> {
    return this.postData(this.FORGOT_CHANGE_PASS, data);
  }

}


