import { faker } from "@faker-js/faker";
import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express from "express";
import { HttpResponse, graphql } from "msw";
import { TasksDocument } from "@/graphql/schema.generated";

const buildMockTask = () => {
  const from = faker.date.anytime();
  const to = faker.date.future({ refDate: from });

  return {
    id: faker.string.uuid(),
    name: faker.lorem.words(),
    description: faker.lorem.paragraph(1),
    startAt: from,
    endAt: to,
  };
};

const handlers = [
  graphql.query(TasksDocument, () => {
    return HttpResponse.json({
      data: {
        tasks: {
          collection: Array.from({ length: 5 }).map(() => buildMockTask()),
        },
      },
    });
  }),
];

const app = express();

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors({
    origin: ["http://localhost:4500", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(8000, () => {
  /* eslint-disable no-console */
  console.log("running mock server...");
});
