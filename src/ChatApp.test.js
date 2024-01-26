// src/App.test.js
import { render, screen } from "@testing-library/react";
import App from "./App";
import { W3CWebSocket } from "websocket";

jest.mock("websocket", () => ({
  ...jest.requireActual("websocket"),
  w3cwebsocket: jest.fn(),
}));

let originalWebSocket;

beforeAll(() => {
  // Сохраняем оригинальную глобальную переменную WebSocket
  originalWebSocket = global.WebSocket;
  // Подменяем глобальную переменную WebSocket на мок-функцию
  global.WebSocket = W3CWebSocket;
});

afterAll(() => {
  // Восстанавливаем оригинальную глобальную переменную WebSocket после всех тестов
  global.WebSocket = originalWebSocket;
});

test("renders chat container", () => {
  render(<App />);
  const containerElement = screen.getByTestId("chat-container");
  expect(containerElement).toBeInTheDocument();
});
