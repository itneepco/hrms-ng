import { Injectable } from '@angular/core';

import { TrainingInfo } from '../models/training';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  trainingData: TrainingInfo;
}
