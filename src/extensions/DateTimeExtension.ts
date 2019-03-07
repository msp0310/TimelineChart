import DateTime from 'typescript-dotnet-es6/System/Time/DateTime';
import TimeSpan from 'typescript-dotnet-es6/System/Time/TimeSpan';

export default class DateTimeHelper
{
  public static parse (dateString: string): DateTime
  {
    const matchArray = dateString.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/);
    const date = matchArray ? matchArray[0] : null
    const time = dateString.replace(date, '').trimLeft().split(':')

    let datetime = date == null || date.length == 0
      ? DateTime.today : new DateTime(date);
    datetime = datetime.addHours(parseInt(time[0] || '0'))
    datetime = datetime.addMinutes(parseInt(time[1] || '0'))

    return datetime
  }
}
