import * as getData from "./apis/index";
import { setupWorker } from "msw/browser";

const handler = [...Object.values(getData)];

export const worker = setupWorker(...handler);
