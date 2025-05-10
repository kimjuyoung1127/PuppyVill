import { pgTable, text, serial, integer, boolean, timestamp, jsonb, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email"),
  role: text("role").default("admin"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  role: true,
});

// Website content: banner announcements, notices
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isActive: boolean("is_active").default(true),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  buttonText: text("button_text"),
  buttonLink: text("button_link"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).pick({
  title: true,
  content: true,
  isActive: true,
  startDate: true,
  endDate: true,
  buttonText: true,
  buttonLink: true,
});

// Programs offered by Puppyville
export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // 'education', 'fitness', etc.
  description: text("description").notNull(),
  benefits: jsonb("benefits").default([]),
  emoji: text("emoji"),
  imageUrl: text("image_url"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertProgramSchema = createInsertSchema(programs).pick({
  title: true,
  category: true,
  description: true,
  benefits: true,
  emoji: true,
  imageUrl: true,
  order: true,
});

// Daily schedule items
export const scheduleItems = pgTable("schedule_items", {
  id: serial("id").primaryKey(),
  timeSlot: text("time_slot").notNull(), // e.g. "09:00 - 10:00"
  activity: text("activity").notNull(),
  description: text("description"),
  icon: text("icon"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertScheduleItemSchema = createInsertSchema(scheduleItems).pick({
  timeSlot: true,
  activity: true,
  description: true,
  icon: true,
  order: true,
});

// Monthly program calendar
export const monthlyPrograms = pgTable("monthly_programs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  date: date("date").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertMonthlyProgramSchema = createInsertSchema(monthlyPrograms).pick({
  title: true,
  date: true,
  description: true,
  imageUrl: true,
});

// Photo gallery
export const galleryImages = pgTable("gallery_images", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category").default("general"), // e.g. "playtime", "education", "grooming"
  tags: text("tags").array(),
  dateAdded: date("date_added").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGalleryImageSchema = createInsertSchema(galleryImages).pick({
  title: true,
  description: true,
  imageUrl: true,
  category: true,
  tags: true,
  dateAdded: true,
});

// Price items for various services
export const priceItems = pgTable("price_items", {
  id: serial("id").primaryKey(),
  service: text("service").notNull(),
  category: text("category").notNull(), // e.g. "daycare", "hotel", "grooming"
  description: text("description"),
  price: text("price").notNull(),
  duration: text("duration"),
  notes: text("notes"),
  isPopular: boolean("is_popular").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertPriceItemSchema = createInsertSchema(priceItems).pick({
  service: true,
  category: true,
  description: true,
  price: true,
  duration: true,
  notes: true,
  isPopular: true,
  order: true,
});

// Grooming services
export const groomingServices = pgTable("grooming_services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  beforeImageUrl: text("before_image_url"),
  afterImageUrl: text("after_image_url"),
  price: text("price"),
  duration: text("duration"),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertGroomingServiceSchema = createInsertSchema(groomingServices).pick({
  title: true,
  description: true,
  beforeImageUrl: true,
  afterImageUrl: true,
  price: true,
  duration: true,
  order: true,
});

// Cafe menu items
export const cafeItems = pgTable("cafe_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(),
  category: text("category").default("drinks"), // e.g. "drinks", "desserts", "snacks"
  imageUrl: text("image_url"),
  isPopular: boolean("is_popular").default(false),
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCafeItemSchema = createInsertSchema(cafeItems).pick({
  name: true,
  description: true,
  price: true,
  category: true,
  imageUrl: true,
  isPopular: true,
  order: true,
});

// Admissions/tour requests
export const admissionRequests = pgTable("admission_requests", {
  id: serial("id").primaryKey(),
  ownerName: text("owner_name").notNull(),
  dogName: text("dog_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  requestType: text("request_type").default("tour"), // e.g. "tour", "admission", "consultation"
  preferredDate: date("preferred_date"),
  preferredTime: text("preferred_time"),
  message: text("message"),
  status: text("status").default("pending"), // "pending", "confirmed", "completed", "cancelled"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAdmissionRequestSchema = createInsertSchema(admissionRequests).pick({
  ownerName: true,
  dogName: true,
  email: true,
  phone: true,
  requestType: true,
  preferredDate: true,
  preferredTime: true,
  message: true,
});

// FAQ items
export const faqItems = pgTable("faq_items", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").default("general"), // e.g. "general", "food", "grooming"
  order: integer("order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertFaqItemSchema = createInsertSchema(faqItems).pick({
  question: true,
  answer: true,
  category: true,
  order: true,
});

// Reviews from customers
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  authorName: text("author_name").notNull(),
  dogName: text("dog_name"),
  content: text("content").notNull(),
  rating: integer("rating").notNull(), // 1-5 stars
  isAnonymous: boolean("is_anonymous").default(false),
  isVerified: boolean("is_verified").default(false),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviews).pick({
  authorName: true,
  dogName: true,
  content: true,
  rating: true,
  isAnonymous: true,
  imageUrl: true,
});

// Site settings and content
export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  siteName: text("site_name").default("퍼피빌"),
  logoUrl: text("logo_url"),
  phone: text("phone"),
  email: text("email"),
  address: text("address"),
  businessHours: jsonb("business_hours").default({}),
  socialLinks: jsonb("social_links").default({}),
  metaTitle: text("meta_title").default("퍼피빌 - 애견 유치원"),
  metaDescription: text("meta_description"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).pick({
  siteName: true,
  logoUrl: true,
  phone: true,
  email: true,
  address: true,
  businessHours: true,
  socialLinks: true,
  metaTitle: true,
  metaDescription: true,
});

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Program = typeof programs.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;

export type ScheduleItem = typeof scheduleItems.$inferSelect;
export type InsertScheduleItem = z.infer<typeof insertScheduleItemSchema>;

export type MonthlyProgram = typeof monthlyPrograms.$inferSelect;
export type InsertMonthlyProgram = z.infer<typeof insertMonthlyProgramSchema>;

export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

export type PriceItem = typeof priceItems.$inferSelect;
export type InsertPriceItem = z.infer<typeof insertPriceItemSchema>;

export type GroomingService = typeof groomingServices.$inferSelect;
export type InsertGroomingService = z.infer<typeof insertGroomingServiceSchema>;

export type CafeItem = typeof cafeItems.$inferSelect;
export type InsertCafeItem = z.infer<typeof insertCafeItemSchema>;

export type AdmissionRequest = typeof admissionRequests.$inferSelect;
export type InsertAdmissionRequest = z.infer<typeof insertAdmissionRequestSchema>;

export type FaqItem = typeof faqItems.$inferSelect;
export type InsertFaqItem = z.infer<typeof insertFaqItemSchema>;

export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;

export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingsSchema>;
