import { z } from "zod";


export const patientSchema = z.object({
    // patient_id: z.number().int(),
    first_name: z.string(),
    last_name: z.string(),
    birth_date: z.string(),
    gender: z.string(),
    address: z.string(),
    barangay: z.string(),
    municipality: z.string(),
    contact_number: z.string(),
    healthcare_id: z.number().int(),
    notes: z.string().optional(),
    // created_at: z.union([z.string().datetime(), z.date()]),
    // updated_at: z.union([z.string().datetime(), z.date()]),
}).strip();
