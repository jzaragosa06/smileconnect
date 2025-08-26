import { supabase } from "../configs/supabase-client";
import { healthCenterSchema } from "../dto/health-center.dto";
import { stringifyObject } from "../utility/strings";

export const addHealthCenter = async (healthCenter) => {
    const parsedHealthCenter = healthCenterSchema.safeParse(healthCenter);

    if (!parsedHealthCenter.success) throw new Error(stringifyObject(parsedHealthCenter.error.issues));

    const { data, error } = await supabase
        .from("health_centers")
        .insert([parsedHealthCenter.data])
        .select();

    if (error) throw error;
    return data;
};

export const updateHealthCenter = async (health_center_id, healthCenter) => {
    const parsedHealthCenter = healthCenterSchema.safeParse(healthCenter);

    if (!parsedHealthCenter.success) throw new Error(stringifyObject(parsedHealthCenter.error.issues));

    const { data, error } = await supabase
        .from("health_centers")
        .update(parsedHealthCenter.data)
        .eq("health_center_id", health_center_id)
        .select();

    if (error) throw error;
    return data;
}

export const deleteHealthCenter = async (health_center_id) => {


    const { data, error } = await supabase
        .from("health_centers")
        .delete()
        .eq("health_center_id", health_center_id)
        .select();

    if (error) throw error;
    return data;
};


export const getHealthCenters = async () => {
    const { data, error } = await supabase
        .from("health_centers")
        .select("*");

    if (error) throw error;
    return data || [];
};

export const getHealthCenter = async (health_center_id) => {
    const { data, error } = await supabase
        .from("health_centers")
        .select("*")
        .eq("health_center_id", health_center_id)
        .single();

    if (error) throw error;
    return data;
};
