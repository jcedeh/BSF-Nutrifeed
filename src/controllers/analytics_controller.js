import { get_analytics } from "../services/analytics_services.js";

export const analytics = async (req, res) => {
  const analytics_data = await get_analytics();
  res.status(200).json({ message: "Analytics retrieved", analytics_data });
};
