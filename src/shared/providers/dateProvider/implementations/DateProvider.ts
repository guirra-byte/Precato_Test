import { IDateProvider } from "../IDateProvider";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs
  .extend(utc);

export class DateProvider implements IDateProvider {
  async dateNow(): Promise<Date> {
    return dayjs()
      .utc()
      .local()
      .toDate();
  }

  async replaceToUTC(date: Date): Promise<string> {
    const replaceDateFormat: string = dayjs(date)
      .utc()
      .local()
      .format();

    return replaceDateFormat;
  }

  async compareInHour(end_date_return: Date): Promise<number> {
    const replaceEndDateFormat: string = await this.replaceToUTC(end_date_return);

    const requireDateNow: Date = await this.dateNow();
    const replaceDateNow: string = await this.replaceToUTC(requireDateNow);

    const compareDates: number = dayjs(replaceEndDateFormat)
      .diff(replaceDateNow, "hours");

    return compareDates;
  }

  async compareInDays(start_date: Date, end_date: Date): Promise<number> {
    const replaceStartDate: string = await this
      .replaceToUTC(start_date);

    const replaceEndDate: string = await this
      .replaceToUTC(end_date);

    const compareDates: number = dayjs(replaceEndDate)
      .diff(replaceStartDate, "days");

    return compareDates;
  }

  async addDays(date: number): Promise<Date> {
    const addDays: Date = dayjs()
      .add(date, "days")
      .toDate();

    return addDays;
  }

  async compareIsBefore(date: Date): Promise<boolean> {
    const dateNow = await this.replaceToUTC(await this.dateNow());
    const dateToCompare = await this.replaceToUTC(date);

    const compareIsBefore = dayjs(dateNow).isBefore(dateToCompare);
    return compareIsBefore
  }

  async addHours(hours: number): Promise<Date> {
    const addHours = dayjs().add(hours, 'hours').toDate();
    return addHours;
  }
}