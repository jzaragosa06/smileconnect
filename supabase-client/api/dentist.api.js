import { supabase } from "../configs/supabase-client"
import { dentistInfoSchema, dentistSchema } from "../dto/dentist.dto";
import { stringifyObject } from "../utility/strings";


export const addDentist = async (dentist) => {
    const parsedDentist = dentistSchema.safeParse(dentist);

    if (!parsedDentist.success) {
        throw new Error(`Validation failed: ${stringifyObject(parsedDentist.error.issues)}`);
    }

    const { data, error } = await supabase
        .from("dentists")
        .insert([parsedDentist.data])
        .select();

    if (error) throw error;
    return data;
};


export const addDentistInfo = async (dentistInfo) => {
    const parsedDentistInfo = dentistInfoSchema.safeParse(dentistInfo);

    if (!parsedDentistInfo.success) throw new Error(stringifyObject(parsedDentistInfo.error.issues));

    const { data, error } = await supabase.from("dentist_infos").insert([parsedDentistInfo.data]).select();
    if (error) throw error;
    return data;
};

export const getDentists = async () => {
    const { data, error } = await supabase
        .from("dentists")
        .select(`
            *,
            dentist_infos(
                dentist_info_id,
                university,
                year_of_study,
                specialties
            )
        `);

    if (error) throw error;
    return data || [];
};

export const getActiveDentists = async () => {
    const { data, error } = await supabase
        .from("dentists")
        .select(`
            *,
            dentist_infos(
                dentist_info_id,
                university,
                year_of_study,
                specialties
            )
        `)
        .eq("status", true);

    if (error) throw error;
    return data || [];
};

export const getDentist = async (dentist_id) => {
    const { data, error } = await supabase
        .from("dentists")
        .select(`
            *,
            dentist_infos(
                dentist_info_id,
                university,
                year_of_study,
                specialties
            )
        `)
        .eq("dentist_id", dentist_id)
        .single();

    if (error) throw error;
    return data;
};




export const updateDentist = async (dentist_id, dentist) => {
    const parsedDentist = dentistSchema.safeParse(dentist);

    if (!parsedDentist.success) throw new Error(stringifyObject(parsedDentist.error.issues));

    const { data, error } = await supabase
        .from("dentists")
        .update(parsedDentist.data)
        .eq("dentist_id", dentist_id)
        .select();

    if (error) throw error;
    return data;
};

export const updateDentistInfo = async (dentist_info_id, dentistInfo) => {
    const parsedDentistInfo = dentistInfoSchema.safeParse(dentistInfo);

    if (!parsedDentistInfo.success) {
        throw new Error(`Validation failed: ${stringifyObject(parsedDentistInfo.error.issues)}`);
    }

    const { data, error } = await supabase
        .from("dentist_infos")
        .update(parsedDentistInfo.data)
        .eq("dentist_info_id", dentist_info_id)
        .select();

    if (error) throw error;
    return data;
};


export const deleteDentist = async (dentist_id) => {
    // Delete the parent - orphaned children become invisible
    const { data, error } = await supabase
        .from("dentists")
        .delete()
        .eq("dentist_id", dentist_id)
        .select();

    if (error) throw error;
    return data;
};