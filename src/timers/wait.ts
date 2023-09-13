// async wrapper over setTimeout just for beauty
export const wait = (mils: number) => new Promise((resolve) => setTimeout(resolve, mils));
