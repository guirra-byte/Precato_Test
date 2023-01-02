
interface IDateProvider {

  compareInHour(end_date_return: Date): Promise<number>
  compareInDays(start_date: Date, end_date: Date): Promise<number>
  dateNow(): Promise<Date>
  replaceToUTC(date: Date): Promise<string>
  addDays(days: number): Promise<Date>
}

export { IDateProvider }