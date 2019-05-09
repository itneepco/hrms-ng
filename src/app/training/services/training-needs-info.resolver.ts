import { TrainingNeedInfo } from './../models/training-needs';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { NeedsInfoService } from './needs-info.service';

@Injectable({
  providedIn: 'root'
})
export class NeedsInfoResolver implements Resolve<any> {
  constructor(private needsInfoService: NeedsInfoService) {}

  resolve(route: ActivatedRouteSnapshot): Promise<TrainingNeedInfo> {
    return new Promise((resolve, reject) => {
      const id = +route.paramMap.get('needInfoId');
      this.needsInfoService.getTrainingNeed(id)
        .subscribe(
          data => resolve(data),
          err => reject(err)
        );
    });
  }
}
