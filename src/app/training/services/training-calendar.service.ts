import { CalendarEvent } from 'angular-calendar';
import { CALENDAR_COLORS } from './../../shared/models/global-codes';
import { EXTERNAL_TRAINING } from './../models/training-global-codes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { baseURL } from './../../shared/config/baseUrl';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { TrainingInfo } from './../models/training';

@Injectable({
  providedIn: 'root'
})
export class TrainingCalendarService {
  private trg_calendar_url = baseURL + 'api/training/calendar';

  constructor(private http: HttpClient, private handler: ErrorHandlerService) {}

  getAllTrainings(): Observable<any> {
    return this.http.get<TrainingInfo[]>(`${this.trg_calendar_url}`)
      .pipe(
        map(trainingInfos => {
          return trainingInfos.map(training => {
            const from_date = new Date(training.from_date);
            const to_date = new Date(training.to_date);
            const no_of_days = dateDiffInDays(from_date, to_date) + 1;

            let substr;
            if (no_of_days === 1) {
              substr = `${no_of_days} day programme`;
            } else {
              substr = `${no_of_days} days programme from ${formatDate(from_date)} to ${formatDate(to_date)}`;
            }
            const title = `${training.course_title} (${substr})`;

            const calEvent = {
              title: title,
              start: new Date(training.from_date),
              end: new Date(training.to_date),
              color: training.training_type === EXTERNAL_TRAINING  ? CALENDAR_COLORS.blue : CALENDAR_COLORS.yellow,
              type: training.training_type
            };
            return calEvent;
          });
        }),
        catchError(err => this.handler.handleError(err))
      );
  }
}

function formatDate(date) {
  const dd = date.getDay();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();
  let dd_str, mm_str;

  if (dd < 10) {
    dd_str = '0' + dd;
  }
  if (mm < 10) {
    mm_str = '0' + mm;
  }

  return dd_str + '/' + mm_str + '/' + yyyy;
}

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}
