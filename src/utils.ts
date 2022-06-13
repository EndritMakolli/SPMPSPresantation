export const arrayToMap = <T>(array: T[], key: string) => {
  return new Map(
    array.map((obj) => {
      //@ts-ignore
      return [obj[key], obj];
    })
  );
};

export const monthMap = new Map<number, string>()
  .set(0, "Janar")
  .set(1, "Shkurt")
  .set(2, "Mars")
  .set(3, "Prill")
  .set(4, "Maj")
  .set(5, "Qershor")
  .set(6, "Korrik")
  .set(7, "Gusht")
  .set(8, "Shtator")
  .set(9, "Tetor")
  .set(10, "Nëntor")
  .set(11, "Dhjetor");

export const dateParser = (dateString: string): string => {
  let dateObj = new Date(dateString);

  console.log(dateString);

  console.log(dateObj);

  let date =
    dateObj.getDate() +
    " " +
    monthMap.get(dateObj.getMonth()) +
    ", " +
    dateObj.getFullYear();

  return date;
};
