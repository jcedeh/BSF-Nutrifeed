import { record_environment } from "../services/environment_services.js";

export const record_environment_controller = async (req, res) => {
    const { batch_id, temperature, humidity, recorded_at } = req.body;
    const environment = await record_environment({ batch_id, temperature, humidity, recorded_at });
    res.status(200).json({ message: "Environment recorded", environment });
};