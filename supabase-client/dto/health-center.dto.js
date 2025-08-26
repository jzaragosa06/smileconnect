import { z } from "zod";

export const healthCenterSchema = z.object({
    // health_center_id: z.number().int(), // Uncomment if needed
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    contact_number: z.string(),
    point_person_name: z.string().min(1, "Point person name is required"),
    barangay: z.string().min(1, "Barangay is required"),
    municipality: z.string().min(1, "Municipality is required"),
    province: z.string().min(1, "Province is required"),
    // created_at: z.union([z.string().datetime(), z.date()]).optional(),
    // updated_at: z.union([z.string().datetime(), z.date()]).optional(),
}).strict();
