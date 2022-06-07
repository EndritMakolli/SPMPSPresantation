export const arrayToMap = <T>(array: T[], key: string) => {
  return new Map(
    array.map((obj) => {
      //@ts-ignore
      return [obj[key], obj];
    })
  );
};
