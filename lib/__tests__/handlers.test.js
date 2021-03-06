const handlers = require("../handlers");

test("home page renders", () => {
  const req = {};
  const res = { render: jest.fn() };

  handlers.home(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("home");
});

test("about page renders with fortune", () => {
  const req = {};
  const res = { render: jest.fn() };

  handlers.about(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("about");
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/)
    })
  );
});

test("section-test page renders", () => {
  const req = {};
  const res = { render: jest.fn() };

  handlers.sectionTest(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("section-test");
});

test("404 page renders", () => {
  const req = {};
  const res = { render: jest.fn() };

  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("404");
});

test("500 page renders", () => {
  const err = new Error("error occurred");
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();

  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe("500");
});
