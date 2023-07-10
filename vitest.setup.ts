import { vi } from "vitest";
import { VitestWorker } from "./src/renderer/tests/mock/vitest-worker";

vi.stubGlobal("Worker", VitestWorker);
