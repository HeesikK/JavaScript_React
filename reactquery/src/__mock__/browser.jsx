import * as getAllData from "./apis/index";
import { setupWorker } from "msw/browser";

const handler = [...Object.values(getAllData)];

export const worker = setupWorker(...handler);
