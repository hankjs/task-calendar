import { it, expect, vi, describe, beforeEach } from "vitest";
import { findTimeElement } from "../helper";

describe("Contextmenu helper", () => {
    it("should find time element", () => {
        const target = document.createElement("div");
        target.dataset.eventId = "1";
        const result = findTimeElement(target);
        expect(result).toBe(target);
    });

    it("should find parent time element", () => {
        const parent = document.createElement("div");
        parent.dataset.eventId = "1";
        const target = document.createElement("div");
        parent.appendChild(target);
        const result = findTimeElement(target);
        expect(result).toBe(parent);
    });

    it("should not find parent time element is null", () => {
        const parent = document.createElement("div");
        const target = document.createElement("div");
        parent.appendChild(target);
        const result = findTimeElement(target);
        expect(result).toBeNull();
    });
});
