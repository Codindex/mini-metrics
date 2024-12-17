import "server-only";
import prisma from "../db/client";
import { fetchAllVideos } from "../api/camera/fetch";
import { FormulaWithResults } from "../db/formula";

// type Results = {
//   [name: string]: string | string[];
// }

export async function compute(formula: FormulaWithResults) {
  let isFinished = false;
  const lastTime = formula.results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[-1].createdAt;
  // Assuming we have periods expressed in minutes
  const period = formula.period ? +formula.period : 1;
  const time = lastTime;
  time.setMinutes(time.getMinutes() + period);
  // if (formula.endAt) {
  //   const endAt = new Date("1970T"+formula.endAt);
  // }
  
  // This assume we test it only on the same day it occurs
  const endTime = lastTime;
  endTime.setMinutes(formula.endAt ? new Date(formula.endAt).getMinutes() : new Date().getMinutes());
  endTime.setHours(formula.endAt ? new Date(formula.endAt).getHours() : new Date().getHours());
  
  let stringLeft = formula.formula;

  let count = false;
  while (true) {
    const [command, unread] = stringLeft.split(" ", 2);
    console.log(command);

    switch (command) {
      case "num":
        count = true;
        break;
      case "cars":
        if (count) {
          const videos = await fetchAllVideos();
          const cars = videos.filter((value) =>
            value.typevehicule === "car"
            && lastTime < value.createat
            && value.createat < time
          );
          const result = cars.length;

          await prisma.formula.update({
            where: {
              id: formula.id,
            },
            data: {
              results: {
                create: {
                  result: result,
                  type: "number",
                  createdAt: time,
                }
              }
            },
            include: {
              results: true,
            }
          });
          isFinished =
            lastTime.getTime() + period*60000 > Date.now() ||
            lastTime.getTime() + period*60000 > endTime.getTime();
        }
        break;
      default:
        break;
    }

    if (unread == "") {
      break;
    }
    console.log(unread);
    stringLeft = unread;
  }
  return isFinished;
}
