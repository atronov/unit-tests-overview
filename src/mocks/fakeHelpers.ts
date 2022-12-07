export const getCurrentDate = () => new Date();

export const getFormatDate = (date: Date) =>
    new Intl.DateTimeFormat('en-US').format(date);

export const getRandItem = <T>(array: Array<T>) =>
    array[~~(array.length * Math.random())];
