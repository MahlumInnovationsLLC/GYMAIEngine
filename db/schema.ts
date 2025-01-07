import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const equipment = pgTable("equipment", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: ['active', 'inactive', 'maintenance'] }).notNull(),
  usage: integer("usage").notNull(),
  lastMaintenance: timestamp("last_maintenance").notNull(),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type", { enum: ['training', 'manual', 'policy'] }).notNull(),
  content: text("content").notNull(),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

export const insertEquipmentSchema = createInsertSchema(equipment);
export const selectEquipmentSchema = createSelectSchema(equipment);
export const insertDocumentSchema = createInsertSchema(documents);
export const selectDocumentSchema = createSelectSchema(documents);

export type InsertEquipment = typeof equipment.$inferInsert;
export type SelectEquipment = typeof equipment.$inferSelect;
export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferSelect;
