import * as moment from 'moment';

export class Utils {
    static convertMomentToDate(date: moment.Moment): string {
        return date.format('YYYY-MM-DD');
    }

    static convertMomentToDateTime(dateTime: moment.Moment): string {
        return dateTime.format('YYYY-MM-DD hh:mm');
    }
}
