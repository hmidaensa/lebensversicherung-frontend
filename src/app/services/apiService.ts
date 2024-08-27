import { Observable } from "rxjs";

export interface ApiService {

    get<T>(url: string): Observable<T> 
    
      post<T>(url: string, body: any): Observable<T> 
      put<T>(url: string, body: any): Observable<T>  
    
      delete<T>(url: string): Observable<T>  
}
