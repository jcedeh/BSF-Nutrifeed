import Environment from "../models/environment.js";

export const record_environment = async (data) => {
    const {
        batch_id,
        temperature,
        humidity,
        recorded_at
    } = data;
    if (!batch_id || !temperature || !humidity || !recorded_at) {
        throw new Error("All fields are required");
    }
    const environment = new Environment({
        batch_id,
        temperature,
        humidity,
        recorded_at
    });
    return await environment.save();
};  