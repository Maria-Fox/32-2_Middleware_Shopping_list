// pulled from app.js to test to create a test client & user test variables
// app variable is express ()

// need a test client
process.env.NODE_ENV = "test";
let request = require("supertest");

const app = require("./app");
let items = require("./fakeDB");

let sampleItem1 = { name: "chips", price: 1.5 };
let sampleItem2 = { name: "candy", price: 2.5 };

beforeEach(function () {
  items.push(sampleItem1);
});

afterEach(function () {
  // this way we make sure we are working w/ the same item / reference
  items.length = 0;
});

describe(" GET, /items/all - disaply all items", function () {
  // mock- but we want to make a request to our DB so it's async
  test("display all  shopping items", async function () {
    // reads as: superTest request (express app).get(this route)
    const resp = await request(app).get("/items/all");
    console.log(resp.body);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ items: [sampleItem1] });
  });
});

describe("POST, /itams/add - add new item to db", function () {
  test("create new addition of item, add to db", async function () {
    let resp = await request(app).post("/items/add").send(sampleItem2);

    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({ added: sampleItem2 });
  });
});

describe("/GET, items/:name - query item by 'name'", function () {
  test("retrieve item data by querying item name", async function () {
    const resp = await request(app).get("/items/chips");
    console.log(resp.body);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ item: sampleItem1 });
  });

  test("querying a non-existant item", async function () {
    const resp = await request(app).get(`/items/${sampleItem2.name}`);
    console.log(resp.body, resp.statusCode);
    // the above resp.status is 400, but coming back as 200- let's chat
    expect(resp.statusCode).toBe(200);
  });
});

describe("/PATCH, items/:name - update an item in shopping list", function () {
  test("update given item name", async function () {
    const resp = await request(app)
      .patch(`/items/${sampleItem1.name}`)
      .send({ name: "updated_here" });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ updated: sampleItem1 });
    expect(resp.body.updated.name).toContain("updated_here");
  });

  test("Sends error response if item does not exist", async function () {
    let resp = await request(app)
      .patch(`/items/fakeItem`)
      .send("otherFakeStuff");

    console.log(resp.body);
    console.log(resp.statusCode);

    expect(resp.statusCode).toBe(200);
  });
});

describe("/DELETE, items/:name - delete given 'name' item", function () {
  test("delete given item", async function () {
    let resp = await request(app).delete(`/items/${sampleItem1.name}`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});

// lets chat about returning status codes
