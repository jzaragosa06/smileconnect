import { supabase } from "../configs/supabase-client";
import { procedureSchema, procedureToCaseLeadMatchSchema } from "../dto/procedure.dto";
import { stringifyObject } from "../utility/strings";

// procedure api
export const addProcedure = async (procedure) => {
    const parsedProcedure = procedureSchema.safeParse(procedure);

    if (!parsedProcedure.success) throw new Error(stringifyObject(parsedProcedure.error.issues));

    const { data, error } = await supabase
        .from("procedures")
        .insert([parsedProcedure.data])
        .select();

    if (error) throw error;
    return data;
}

export const updateProcedure = async (procedure_id, procedure) => {
    const parsedProcedure = procedureSchema.safeParse(procedure);

    if (!parsedProcedure.success) throw new Error(stringifyObject(parsedProcedure.error.issues));

    const { data, error } = await supabase
        .from("procedures")
        .update(parsedProcedure.data)
        .eq("procedure_id", procedure_id)
        .select();

    if (error) throw error;
    return data;
}

export const deleteProcedure = async (procedure_id) => {
    const { data, error } = await supabase
        .from("procedures")
        .delete()
        .eq("procedure_id", procedure_id)
        .select();

    if (error) throw error;
    return data;
}

export const getProcedures = async () => {
    const { data, error } = await supabase
        .from("procedures")
        .select(`
            *,
            dentists(
                dentist_id,
                first_name,
                last_name,
                email
            )
        `);

    if (error) throw error;
    return data || [];
};



export const getProcedure = async (procedure_id) => {
    const { data, error } = await supabase
        .from("procedures")
        .select(`
            *,
            dentists(
                dentist_id,
                first_name,
                last_name,
                email,
                contact_number
            )
        `)
        .eq("procedure_id", procedure_id)
        .single();

    if (error) throw error;
    return data;
};


// api for procedure to case-lead-match
export const addMatch = async (match) => {
    const parsedMatch = procedureToCaseLeadMatchSchema.safeParse(match);

    if (!parsedMatch.success) throw new Error(stringifyObject(parsedMatch.error.issues));

    const { data, error } = await supabase
        .from("procedure_to_case_lead_matches")
        .insert([parsedMatch.data])
        .select();

    if (error) throw error;
    return data;
}

export const updateMatch = async (match_id, match) => {
    const parsedMatch = procedureToCaseLeadMatchSchema.safeParse(match);

    if (!parsedMatch.success) throw new Error(stringifyObject(parsedMatch.error.issues));

    const { data, error } = await supabase
        .from("procedure_to_case_lead_matches")
        .update(parsedMatch.data)
        .eq("match_id", match_id)
        .select();

    if (error) throw error;
    return data;
}

export const deleteMatch = async (match_id) => {
    const { data, error } = await supabase
        .from("procedure_to_case_lead_matches")
        .delete()
        .eq("match_id", match_id)
        .select();

    if (error) throw error;
    return data;
}

export const getMatches = async () => {
    const { data, error } = await supabase
        .from("procedure_to_case_lead_matches")
        .select(`
            *,
            procedures(
                procedure_id,
                procedure_type,
                procedure_date,
                procedure_location,
                dentists(first_name, last_name)
            ),
            case_leads(
                case_lead_id,
                title,
                status,
                patients(first_name, last_name)
            ),
            case_progress(
                case_progress_id,
                status,
                appointment_date
            )
        `);

    if (error) throw error;
    return data || [];
};


export const getMatch = async (match_id) => {
    const { data, error } = await supabase
        .from("procedure_to_case_lead_matches")
        .select(`
            *,
            procedures(
                procedure_id,
                procedure_type,
                procedure_date,
                procedure_location,
                dentists(
                    dentist_id,
                    first_name,
                    last_name,
                    email
                )
            ),
            case_leads(
                case_lead_id,
                title,
                description,
                status,
                urgency,
                patients(
                    patient_id,
                    first_name,
                    last_name,
                    contact_number
                )
            ),
            case_progress(
                case_progress_id,
                status,
                notes,
                appointment_date
            )
        `)
        .eq("match_id", match_id)
        .single();

    if (error) throw error;
    return data;
};


export const getProceduresByDentist = async (dentist_id) => {
    const { data, error } = await supabase
        .from("procedures")
        .select(`
            *,
            dentists(first_name, last_name)
        `)
        .eq("dentist_id", dentist_id);

    if (error) throw error;
    return data || [];
};

export const getMatchesByProcedure = async (procedure_id) => {

    const { data, error } = await supabase
        .from("procedure_to_case_lead_matches")
        .select(`
            *,
            case_leads(title, status, patients(first_name, last_name)),
            case_progress(status, appointment_date)
        `)
        .eq("procedure_id", procedure_id);

    if (error) throw error;
    return data || [];
};

export const getMatchesByCaseLead = async (case_lead_id) => {
    const { data, error } = await supabase
        .from("procedure_to_case_lead_matches")
        .select(`
            *,
            procedures(procedure_type, procedure_date, dentists(first_name, last_name)),
            case_progress(status, appointment_date)
        `)
        .eq("case_lead_id", case_lead_id);

    if (error) throw error;
    return data || [];
};

