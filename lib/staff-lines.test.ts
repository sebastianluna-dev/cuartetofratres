import { describe, expect, it } from "vitest";
import { staffLines } from "./staff-lines";

describe("staffLines", () => {
  it("draws five lines per staff", () => {
    expect(staffLines("hero").paths).toHaveLength(15);
    expect(staffLines("poster").paths).toHaveLength(10);
    expect(staffLines("wide").paths).toHaveLength(15);
  });

  it("gives each kind its own drawing box", () => {
    expect(staffLines("hero").viewBox).toBe("0 0 100 100");
    expect(staffLines("wide").viewBox).toBe("0 0 200 70");
  });

  it("starts every path past the left edge and keeps the lines of a staff in order", () => {
    const { paths } = staffLines("hero");
    for (const path of paths) expect(path.startsWith("M-4.0 ")).toBe(true);
    const firstY = (path: string) => Number(path.slice(1).split("L")[0]?.split(" ")[1]);
    const staff = paths.slice(0, 5).map(firstY);
    expect([...staff].sort((a, b) => a - b)).toEqual(staff);
  });

  it("is deterministic", () => {
    expect(staffLines("poster")).toBe(staffLines("poster"));
  });
});
