import { http, HttpResponse } from "msw";

export const getTodoData = http.get("api/products", () => {
  return HttpResponse.json([
    { id: 1, content: "할일1" },
    { id: 2, content: "할일2" },
  ]);
});

export const getMovieData = http.get("api/movies", () => {
  return HttpResponse.json([
    { id: 1, title: "범죄도시" },
    { id: 2, title: "신세계" },
  ]);
});
