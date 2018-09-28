import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { RoleMapper } from '../model/role-mapper';
import { EL_ADMIN, TIME_OFFICE_ADMIN, MEDICAL_ADMIN, VEHICLE_ADMIN, TRAINING_ADMIN } from '../model/global-code';

@Injectable({
  providedIn: 'root'
})
export class RoleMapperService {
  constructor(private http: HttpClient, 
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + 'api/rolemapper'
  }

  getRoleName(code: string) {
    switch(code) {
      case EL_ADMIN: {
        return "Earned Leave Admin"
      }
      case TIME_OFFICE_ADMIN: {
        return "Time Office Admin"
      }
      case MEDICAL_ADMIN: {
        return "Medical Admin"
      }
      case VEHICLE_ADMIN: {
        return "Vehicle Admin"
      }
      case TRAINING_ADMIN: {
        return "Training Admin"
      }
    }
  }

  getRoleMappers(pageIndex: number, pageSize: number): Observable<RoleMapper[]> {
    return this.http.get<RoleMapper[]>(this.getUrl() + "?pageIndex=" + pageIndex + "&pageSize=" + pageSize)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  addRoleMapper(roleMapper: RoleMapper) {
    return this.http.post(this.getUrl(), roleMapper)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  editRoleMapper(id: number, roleMapper: RoleMapper) {
    return this.http.put(this.getUrl() + id, roleMapper)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  deleteRoleMapper(id: number) {
    return this.http.delete(this.getUrl() + id)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }

  getRoleMapper(role: string, project_code?: string) {
    return this.http.get<RoleMapper>(`${this.getUrl()}/role/${role}?project_code=${project_code}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}

