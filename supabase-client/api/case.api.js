import { supabase } from "../configs/supabase-client";
import { caseLeadSchema, caseProgressSchema } from "../dto/case.dto";
import { stringifyObject } from "../utility/strings";

//api for case lead
export const addCaseLead = async (caseLead) => {
    const parsedCaseLead = caseLeadSchema.safeParse(caseLead);

    if (!parsedCaseLead.success) throw new Error(stringifyObject(parsedCaseLead.error.issues));

    const { data, error } = await supabase
        .from("case_leads")
        .insert([parsedCaseLead.data])
        .select();

    if (error) throw error;
    return data;
};

export const updateCaseLead = async (case_lead_id, caseLead) => {
    const parsedCaseLead = caseLeadSchema.safeParse(caseLead);

    if (!parsedCaseLead.success) throw new Error(stringifyObject(parsedCaseLead.error.issues));

    const { data, error } = await supabase
        .from("case_leads")
        .update(parsedCaseLead.data)
        .eq("case_lead_id", case_lead_id)
        .select();

    if (error) throw error;
    return data;
};


export const deleteCaseLead = async (case_lead_id) => {

    const { data, error } = await supabase
        .from("case_leads")
        .delete()
        .eq("case_lead_id", case_lead_id)
        .select();

    if (error) throw error;
    return data;
};

export const getCaseLeads = async () => {
    const { data, error } = await supabase
        .from("case_leads")
        .select(`
            *,
            patients(
                patient_id,
                first_name,
                last_name,
                contact_number
            ),
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

export const getCaseLead = async (case_lead_id) => {
    const { data, error } = await supabase
        .from("case_leads")
        .select(`
            *,
            patients(
                patient_id,
                first_name,
                last_name,
                contact_number,
                address,
                health_centers(name, address)
            ),
            dentists(
                dentist_id,
                first_name,
                last_name,
                email,
                contact_number
            )
        `)
        .eq("case_lead_id", case_lead_id)
        .single();

    if (error) throw error;
    return data;
};


// api for case progress
export const addCaseProgress = async (caseProgress) => {
    const parsedCaseProgress = caseProgressSchema.safeParse(caseProgress);

    if (!parsedCaseProgress.success) throw new Error(stringifyObject(parsedCaseProgress.error.issues));

    const { data, error } = await supabase
        .from("case_progress")
        .insert([parsedCaseProgress.data])
        .select();

    if (error) throw error;
    return data;
}

export const updateCaseProgress = async (case_progress_id, caseProgress) => {
    const parsedCaseProgress = caseProgressSchema.safeParse(caseProgress);

    if (!parsedCaseProgress.success) throw new Error(stringifyObject(parsedCaseProgress.error.issues));


    const { data, error } = await supabase
        .from("case_progress")
        .update(parsedCaseProgress.data)
        .eq("case_progress_id", case_progress_id)
        .select();

    if (error) throw error;
    return data;
}

export const deleteCaseProgress = async (case_progress_id) => {

    const { data, error } = await supabase
        .from("case_progress")
        .delete()
        .eq("case_progress_id", case_progress_id)
        .select();

    if (error) throw error;
    return data;
};


export const getCaseProgresses = async () => {
    const { data, error } = await supabase
        .from("case_progress")
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


export const getCaseProgress = async (case_progress_id) => {
    const { data, error } = await supabase
        .from("case_progress")
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
        .eq("case_progress_id", case_progress_id)
        .single();

    if (error) throw error;
    return data;
};


export const getCaseProgressesByDentist = async (dentist_id) => {
    const { data, error } = await supabase
        .from("case_progress")
        .select("*")
        .eq("dentist_id", dentist_id);

    if (error) throw error;
    return data || [];
};

export const getCaseLeadsByStatus = async (status) => {
    const { data, error } = await supabase
        .from("case_leads")
        .select("*")
        .eq("status", status);

    if (error) throw error;
    return data || [];
};
