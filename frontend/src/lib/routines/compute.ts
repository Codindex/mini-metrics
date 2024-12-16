import prisma from "../db/client";
import { fetchAllVideos } from "../api/camera/fetch";
import { FormulaWithResults } from "../db/formula";

// type Results = {
//   [name: string]: string | string[];
// }

export async function compute(formula: FormulaWithResults, period: number) {
  const lastTime = formula.results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[-1].createdAt;
  const time = lastTime;
  time.setMinutes(time.getMinutes() + period);
  
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
          });
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
}
