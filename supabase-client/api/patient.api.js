import { supabase } from "../configs/supabase-client";
import { patientSchema } from "../dto/patient.dto";
import { stringifyObject } from "../utility/strings";

export const addPatient = async (patient) => {
    const parsedPatient = patientSchema.safeParse(patient);

    if (!parsedPatient.success) throw new Error(stringifyObject(parsedPatient.error.issues));

    const { data, error } = await supabase
        .from("patients")
        .insert([parsedPatient.data])
        .select();

    if (error) throw error;
    return data;
};


export const updatePatient = async (patient_id, patient) => {
    const parsedPatient = patientSchema.safeParse(patient);

    if (!parsedPatient.success) throw new Error(stringifyObject(parsedPatient.error.issues));

    const { data, error } = await supabase
        .from("patients")
        .update(parsedPatient.data)
        .eq("patient_id", patient_id)
        .select();

    if (error) throw error;
    return data;
};

export const getPatients = async () => {
    const { data, error } = await supabase
        .from("patients")
        .select(`
            *,
            health_centers(
                health_center_id,
                name,
                address,
                municipality,
                province
            )
        `);

    if (error) throw error;
    return data || [];
};

export const getPatient = async (patient_id) => {
    const { data, error } = await supabase
        .from("patients")
        .select(`
            *,
            health_centers(
                health_center_id,
                name,
                address,
                contact_number,
                point_person_name,
                municipality,
                province
            )
        `)
        .eq("patient_id", patient_id)
        .single();

    if (error) throw error;
    return data;
};

export const getPatientsByHealthCenter = async (health_center_id) => {
    const { data, error } = await supabase
        .from("patients")
        .select(`
            *,
            health_centers(name, municipality)
        `)
        .eq("health_center_id", health_center_id);

    if (error) throw error;
    return data || [];
};


export const deletePatient = async (patient_id) => {
    const { data, error } = await supabase
        .from("patients")
        .delete()
        .eq("patient_id", patient_id)
        .select();

    if (error) throw error;
    return data;
};