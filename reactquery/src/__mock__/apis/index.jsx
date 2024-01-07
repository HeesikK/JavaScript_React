import { http, HttpResponse } from "msw";

export const getData = http.get("api/products", () => {
  return HttpResponse.json([
    { id: 1, content: "할일1" },
    { id: 2, content: "할일2" },
  ]);
});
