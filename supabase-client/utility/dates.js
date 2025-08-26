export const getIsoUTCNow = () => {
    return new Date().toISOString();
}

export const getCreatedAtUpdatedAtIsoUtcNow = () => {
    const now = new Date().toISOString();
    return { created_at: now, updated_at: now };
};