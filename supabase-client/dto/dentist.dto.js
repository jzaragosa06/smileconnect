import { z } from "zod";

// Dentist Schema
export const dentistSchema = z.object({
    email: z.string().email("Invalid email format"),
    first_name: z.string().min(1, "First name is required"),
    middle_name: z.string().optional(),
    contact_number: z.string(),
    weekly_schedule: z
        .array(z.string().min(1))
        .nonempty("Weekly schedule must have at least one entry"),
}).strip();

// Dentist Info Schema
export const dentistInfoSchema = z.object({
    dentist_id: z.number().int().positive("Invalid dentist ID"),
    university: z.string().min(1, "University is required"),
    year_of_study: z
        .number()
        .int()
        .min(1, "Year must be at least 1")
        .max(10, "Year must be reasonable"),
    specialties: z
        .array(z.string().min(1))
        .nonempty("At least one specialty is required"),
}).strip();



// //we din't included the dto export for typing. 
// // Since this is not ts