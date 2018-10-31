import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { baseURL } from '../../shared/config/baseUrl';
import {
  EL_HPL_ADMIN,
  OM_REP_UPLOADER,
  TIME_OFFICE_ADMIN,
  TRAINING_ADMIN,
  VEHICLE_ADMIN,
} from '../../shared/models/global-codes';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { RoleMapper } from '../../shared/models/role-mapper';
import { FIN_REP_UPLOADER, HR_LEAVE_SUPER_ADMIN, HR_REP_UPLOADER } from './../../shared/models/global-codes';

@Injectable({
  providedIn: 'root'
})
export class RoleMapperService {
  constructor(private http: HttpClient, 
    private handler: ErrorHandlerService) {
  }

  getUrl() {
    return baseURL + 'api/rolemapper/'
  }

  getRoleName(code: string) {
    switch(code) {
      case EL_HPL_ADMIN: {
        return "Earned Leave Admin"
      }
      case TIME_OFFICE_ADMIN: {
        return "Time Office Admin"
      }
      case VEHICLE_ADMIN: {
        return "Vehicle Admin"
      }
      case TRAINING_ADMIN: {
        return "Training Admin"
      }
      case OM_REP_UPLOADER: {
        return "O&M Report Uploader"
      }
      case HR_REP_UPLOADER: {
        return "HR Report Uploader"
      }
      case FIN_REP_UPLOADER: {
        return "Finance Report Uploader"
      }
      case HR_LEAVE_SUPER_ADMIN: {
        return "HR Leave Super Admin"
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
    return this.http.get<RoleMapper>(this.getUrl() + `role/${role}?project_code=${project_code}`)
      .pipe(
        catchError(err => this.handler.handleError(err))
      )
  }
}

