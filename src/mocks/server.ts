import { faker } from "@faker-js/faker";
import { createMiddleware } from "@mswjs/http-middleware";
import cors from "cors";
import express from "express";
import { HttpResponse, graphql } from "msw";
import { EmployeesDocument } from "@/graphql/schema.generated";

const buildMockEmployee = () => ({
  id: faker.string.uuid(),
  employeeCode: faker.string.alphanumeric({
    casing: "upper",
    length: 8,
  }),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
});

const handlers = [
  graphql.query(EmployeesDocument, () => {
    return HttpResponse.json({
      data: {
        employees: {
          collection: Array.from({ length: 5 }).map(() => buildMockEmployee()),
        },
      },
    });
  }),
];

const app = express();

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cors({
    origin: ["http://localhost:4500"],
  }),
);
app.use(express.json());
app.use(createMiddleware(...handlers));
app.listen(8000, () => {
  /* eslint-disable no-console */
  console.log("running mock server...");
});
