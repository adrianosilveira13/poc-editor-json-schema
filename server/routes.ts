import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/step-definitions", async (req, res) => {
    try {
      const definitions = await storage.getStepDefinitions();
      res.json(definitions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch step definitions" });
    }
  });

  app.get("/api/file-types", async (req, res) => {
    try {
      const fileTypes = await storage.getFileTypes();
      res.json(fileTypes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch file types" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
