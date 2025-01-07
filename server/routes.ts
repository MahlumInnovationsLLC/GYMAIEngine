import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { equipment, documents } from "@db/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/equipment", async (_req, res) => {
    try {
      const equipmentData = await db.select().from(equipment);
      res.json(equipmentData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch equipment data" });
    }
  });

  app.get("/api/documents", async (_req, res) => {
    try {
      const documentsData = await db.select().from(documents);
      res.json(documentsData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch documents" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
