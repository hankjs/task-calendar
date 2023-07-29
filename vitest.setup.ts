import { vi } from "vitest";
import { VitestWorker } from "./src/renderer/tests/mock/vitest-worker";
import { VitestTCBridge } from "./src/renderer/tests/mock/bridge";
import { BRIDGE_KEY } from "@task/config/constant";

vi.stubGlobal("Worker", VitestWorker);
vi.stubGlobal(BRIDGE_KEY, VitestTCBridge);
