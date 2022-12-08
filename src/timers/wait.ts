// async обёртка над setTimeout для красивого теста
export const wait = (mils: number) => new Promise((resolve) => setTimeout(resolve, mils));
