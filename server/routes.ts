import express, { type Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { 
  insertUserSchema,
  insertAnnouncementSchema,
  insertProgramSchema,
  insertScheduleItemSchema,
  insertMonthlyProgramSchema,
  insertGalleryImageSchema,
  insertPriceItemSchema,
  insertGroomingServiceSchema,
  insertCafeItemSchema,
  insertAdmissionRequestSchema,
  insertFaqItemSchema,
  insertReviewSchema,
  insertSiteSettingsSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - all prefixed with /api
  const router = express.Router();

  // User/Auth endpoints
  router.post("/login", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    try {
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, we would set up a session here
      res.json({ 
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/users", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validatedData.username);
      
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const newUser = await storage.createUser(validatedData);
      
      res.status(201).json({ 
        id: newUser.id,
        username: newUser.username,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json({ 
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Announcement endpoints
  router.get("/announcements", async (req: Request, res: Response) => {
    try {
      const activeOnly = req.query.active === "true";
      const announcements = activeOnly ? 
        await storage.getActiveAnnouncements() : 
        await storage.getAnnouncement(0).then(() => []);
      
      res.json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/announcements/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const announcement = await storage.getAnnouncement(id);
      
      if (!announcement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      
      res.json(announcement);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/announcements", async (req: Request, res: Response) => {
    try {
      const validatedData = insertAnnouncementSchema.parse(req.body);
      const newAnnouncement = await storage.createAnnouncement(validatedData);
      res.status(201).json(newAnnouncement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid announcement data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/announcements/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedAnnouncement = await storage.updateAnnouncement(id, req.body);
      
      if (!updatedAnnouncement) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      
      res.json(updatedAnnouncement);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/announcements/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAnnouncement(id);
      
      if (!success) {
        return res.status(404).json({ message: "Announcement not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Program endpoints
  router.get("/programs", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const programs = category ? 
        await storage.getProgramsByCategory(category) : 
        await storage.getAllPrograms();
      
      res.json(programs);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/programs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getProgram(id);
      
      if (!program) {
        return res.status(404).json({ message: "Program not found" });
      }
      
      res.json(program);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/programs", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProgramSchema.parse(req.body);
      const newProgram = await storage.createProgram(validatedData);
      res.status(201).json(newProgram);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid program data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/programs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedProgram = await storage.updateProgram(id, req.body);
      
      if (!updatedProgram) {
        return res.status(404).json({ message: "Program not found" });
      }
      
      res.json(updatedProgram);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/programs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProgram(id);
      
      if (!success) {
        return res.status(404).json({ message: "Program not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Schedule endpoints
  router.get("/schedule", async (req: Request, res: Response) => {
    try {
      const scheduleItems = await storage.getAllScheduleItems();
      res.json(scheduleItems);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/schedule/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const scheduleItem = await storage.getScheduleItem(id);
      
      if (!scheduleItem) {
        return res.status(404).json({ message: "Schedule item not found" });
      }
      
      res.json(scheduleItem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/schedule", async (req: Request, res: Response) => {
    try {
      const validatedData = insertScheduleItemSchema.parse(req.body);
      const newScheduleItem = await storage.createScheduleItem(validatedData);
      res.status(201).json(newScheduleItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid schedule item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/schedule/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedScheduleItem = await storage.updateScheduleItem(id, req.body);
      
      if (!updatedScheduleItem) {
        return res.status(404).json({ message: "Schedule item not found" });
      }
      
      res.json(updatedScheduleItem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/schedule/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteScheduleItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Schedule item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Monthly programs
  router.get("/monthly-programs", async (req: Request, res: Response) => {
    try {
      const year = parseInt(req.query.year as string) || new Date().getFullYear();
      const month = parseInt(req.query.month as string) || new Date().getMonth();
      
      const monthlyPrograms = await storage.getMonthlyProgramsByMonth(year, month);
      res.json(monthlyPrograms);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/monthly-programs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const monthlyProgram = await storage.getMonthlyProgram(id);
      
      if (!monthlyProgram) {
        return res.status(404).json({ message: "Monthly program not found" });
      }
      
      res.json(monthlyProgram);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/monthly-programs", async (req: Request, res: Response) => {
    try {
      const validatedData = insertMonthlyProgramSchema.parse(req.body);
      const newMonthlyProgram = await storage.createMonthlyProgram(validatedData);
      res.status(201).json(newMonthlyProgram);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid monthly program data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/monthly-programs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedMonthlyProgram = await storage.updateMonthlyProgram(id, req.body);
      
      if (!updatedMonthlyProgram) {
        return res.status(404).json({ message: "Monthly program not found" });
      }
      
      res.json(updatedMonthlyProgram);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/monthly-programs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteMonthlyProgram(id);
      
      if (!success) {
        return res.status(404).json({ message: "Monthly program not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Gallery endpoints
  router.get("/gallery", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const images = category ? 
        await storage.getGalleryImagesByCategory(category) : 
        await storage.getAllGalleryImages();
      
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const image = await storage.getGalleryImage(id);
      
      if (!image) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      
      res.json(image);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/gallery", async (req: Request, res: Response) => {
    try {
      const validatedData = insertGalleryImageSchema.parse(req.body);
      const newImage = await storage.createGalleryImage(validatedData);
      res.status(201).json(newImage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid gallery image data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedImage = await storage.updateGalleryImage(id, req.body);
      
      if (!updatedImage) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      
      res.json(updatedImage);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/gallery/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteGalleryImage(id);
      
      if (!success) {
        return res.status(404).json({ message: "Gallery image not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Price endpoints
  router.get("/prices", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const prices = category ? 
        await storage.getPriceItemsByCategory(category) : 
        await storage.getAllPriceItems();
      
      res.json(prices);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/prices/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const price = await storage.getPriceItem(id);
      
      if (!price) {
        return res.status(404).json({ message: "Price item not found" });
      }
      
      res.json(price);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/prices", async (req: Request, res: Response) => {
    try {
      const validatedData = insertPriceItemSchema.parse(req.body);
      const newPriceItem = await storage.createPriceItem(validatedData);
      res.status(201).json(newPriceItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid price item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/prices/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedPriceItem = await storage.updatePriceItem(id, req.body);
      
      if (!updatedPriceItem) {
        return res.status(404).json({ message: "Price item not found" });
      }
      
      res.json(updatedPriceItem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/prices/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePriceItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Price item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Grooming services endpoints
  router.get("/grooming", async (req: Request, res: Response) => {
    try {
      const services = await storage.getAllGroomingServices();
      res.json(services);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/grooming/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = await storage.getGroomingService(id);
      
      if (!service) {
        return res.status(404).json({ message: "Grooming service not found" });
      }
      
      res.json(service);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/grooming", async (req: Request, res: Response) => {
    try {
      const validatedData = insertGroomingServiceSchema.parse(req.body);
      const newService = await storage.createGroomingService(validatedData);
      res.status(201).json(newService);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid grooming service data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/grooming/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedService = await storage.updateGroomingService(id, req.body);
      
      if (!updatedService) {
        return res.status(404).json({ message: "Grooming service not found" });
      }
      
      res.json(updatedService);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/grooming/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteGroomingService(id);
      
      if (!success) {
        return res.status(404).json({ message: "Grooming service not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Cafe items endpoints
  router.get("/cafe", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const items = category ? 
        await storage.getCafeItemsByCategory(category) : 
        await storage.getAllCafeItems();
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/cafe/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getCafeItem(id);
      
      if (!item) {
        return res.status(404).json({ message: "Cafe item not found" });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/cafe", async (req: Request, res: Response) => {
    try {
      const validatedData = insertCafeItemSchema.parse(req.body);
      const newItem = await storage.createCafeItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cafe item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/cafe/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedItem = await storage.updateCafeItem(id, req.body);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Cafe item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/cafe/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteCafeItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "Cafe item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Admission requests endpoints
  router.get("/admissions", async (req: Request, res: Response) => {
    try {
      const status = req.query.status as string;
      const requests = status ? 
        await storage.getAdmissionRequestsByStatus(status) : 
        await storage.getAllAdmissionRequests();
      
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/admissions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const request = await storage.getAdmissionRequest(id);
      
      if (!request) {
        return res.status(404).json({ message: "Admission request not found" });
      }
      
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/admissions", async (req: Request, res: Response) => {
    try {
      const validatedData = insertAdmissionRequestSchema.parse(req.body);
      const newRequest = await storage.createAdmissionRequest(validatedData);
      res.status(201).json(newRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid admission request data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/admissions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedRequest = await storage.updateAdmissionRequest(id, req.body);
      
      if (!updatedRequest) {
        return res.status(404).json({ message: "Admission request not found" });
      }
      
      res.json(updatedRequest);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/admissions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteAdmissionRequest(id);
      
      if (!success) {
        return res.status(404).json({ message: "Admission request not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // FAQ endpoints
  router.get("/faq", async (req: Request, res: Response) => {
    try {
      const category = req.query.category as string;
      const faqItems = category ? 
        await storage.getFaqItemsByCategory(category) : 
        await storage.getAllFaqItems();
      
      res.json(faqItems);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/faq/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const faqItem = await storage.getFaqItem(id);
      
      if (!faqItem) {
        return res.status(404).json({ message: "FAQ item not found" });
      }
      
      res.json(faqItem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/faq", async (req: Request, res: Response) => {
    try {
      const validatedData = insertFaqItemSchema.parse(req.body);
      const newFaqItem = await storage.createFaqItem(validatedData);
      res.status(201).json(newFaqItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid FAQ item data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/faq/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedFaqItem = await storage.updateFaqItem(id, req.body);
      
      if (!updatedFaqItem) {
        return res.status(404).json({ message: "FAQ item not found" });
      }
      
      res.json(updatedFaqItem);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/faq/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteFaqItem(id);
      
      if (!success) {
        return res.status(404).json({ message: "FAQ item not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Reviews endpoints
  router.get("/reviews", async (req: Request, res: Response) => {
    try {
      const verifiedOnly = req.query.verified === "true";
      const reviews = verifiedOnly ? 
        await storage.getVerifiedReviews() : 
        await storage.getAllReviews();
      
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.get("/reviews/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.getReview(id);
      
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/reviews", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReviewSchema.parse(req.body);
      const newReview = await storage.createReview(validatedData);
      res.status(201).json(newReview);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/reviews/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedReview = await storage.updateReview(id, req.body);
      
      if (!updatedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.json(updatedReview);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.delete("/reviews/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteReview(id);
      
      if (!success) {
        return res.status(404).json({ message: "Review not found" });
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Site settings endpoints
  router.get("/settings", async (req: Request, res: Response) => {
    try {
      const settings = await storage.getSiteSettings();
      
      if (!settings) {
        return res.status(404).json({ message: "Site settings not found" });
      }
      
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  router.put("/settings/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedSettings = await storage.updateSiteSettings(id, req.body);
      
      if (!updatedSettings) {
        return res.status(404).json({ message: "Site settings not found" });
      }
      
      res.json(updatedSettings);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Register API routes
  app.use("/api", router);

  const httpServer = createServer(app);
  return httpServer;
}