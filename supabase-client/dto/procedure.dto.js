import { z } from "zod";



export const procedureSchema = z.object({
    // procedure_id: z.number().int(),
    dentist_id: z.number().int(),
    procedure_type: z.string(),
    procedure_date: z.union([z.string().datetime(), z.date()]),
    procedure_location: z.string(),
    // created_at: z.union([z.string().datetime(), z.date()]),
    // updated_at: z.union([z.string().datetime(), z.date()]),
}).strip();


export const procedureToCaseLeadMatchSchema = z.object({
    //match_id: z.number().int(), 
    procedure_id: z.number().int(),
    case_lead_id: z.number().int(),
    case_progress_id: z.number().int(),
    // created_at: z.union([z.string().datetime(), z.date()]),
    // updated_at: z.union([z.string().datetime(), z.date()]),
}).strip();