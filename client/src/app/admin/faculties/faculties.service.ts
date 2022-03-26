import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultiesService {

  constructor(private http: HttpClient) { }

  getFaculties(skip: number, limit: number) {
    return this.http.get(`${environment.apiUrl}/faculties`, { headers: { authorization: `Bearer ${localStorage.getItem('token')}` }, params: { skip, limit } });
  }
}
