import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";

import { getAppRoutes, getBlogRoutes } from "../getAppRoutes";

vi.mock("fs");

const mockedFs = fs as unknown as {
  readdirSync: vi.Mock;
  existsSync: vi.Mock;
  statSync: vi.Mock;
};

function createMockDirent(name: string, isDir: boolean): fs.Dirent {
  return {
    name,
    isDirectory: () => isDir,
    isFile: () => !isDir,
    isBlockDevice: () => false,
    isCharacterDevice: () => false,
    isSymbolicLink: () => false,
    isFIFO: () => false,
    isSocket: () => false,
  } as unknown as fs.Dirent;
}

describe("getAppRoutes", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns correct routes ignoring __tests__ folders", () => {
    mockedFs.readdirSync.mockImplementation((dir, opts) => {
      if (opts && opts.withFileTypes) {
        if (dir.endsWith("[locale]")) {
          return [
            createMockDirent("adopters", true),
            createMockDirent("__tests__", true),
          ];
        }
        if (dir.endsWith("adopters")) {
          return [createMockDirent("page.tsx", false)];
        }
        return [];
      }
      return [];
    });

    const routes = getAppRoutes();
    expect(routes).toEqual(["/adopters"]);
  });
});

describe("getBlogRoutes", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("returns blog routes with lastmod from index.md", () => {
    mockedFs.readdirSync.mockImplementation((dir, opts) => {
      if (opts && opts.withFileTypes) {
        return [
          createMockDirent("blog1", true),
          createMockDirent("notafolder", false),
        ];
      }
      return [];
    });

    mockedFs.existsSync.mockImplementation((p) => p.includes("index.md"));

    mockedFs.statSync.mockReturnValue({
      mtime: new Date("2024-05-20"),
    } as fs.Stats);

    const routes = getBlogRoutes();
    expect(routes).toEqual([{ loc: "/en/blog1", lastmod: "2024-05-20" }]);
  });

  it("returns blog routes with lastmod from index.adoc if index.md missing", () => {
    mockedFs.readdirSync.mockImplementation((dir, opts) => {
      if (opts && opts.withFileTypes) {
        return [createMockDirent("blog2", true)];
      }
      return [];
    });

    mockedFs.existsSync.mockImplementation((p) => p.includes("index.adoc"));

    mockedFs.statSync.mockReturnValue({
      mtime: new Date("2024-06-26"),
    } as fs.Stats);

    const routes = getBlogRoutes();
    expect(routes).toEqual([{ loc: "/en/blog2", lastmod: "2024-06-26" }]);
  });

  it("skips folders without index.md or index.adoc", () => {
    mockedFs.readdirSync.mockImplementation((dir, opts) => {
      if (opts && opts.withFileTypes) {
        return [createMockDirent("blog3", true)];
      }
      return [];
    });

    mockedFs.existsSync.mockReturnValue(false);

    const routes = getBlogRoutes();
    expect(routes).toEqual([]);
  });
});
