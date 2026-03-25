export const validateRequest = (schema) => (req, res, next) => {
  const { success, data, error } = schema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      errors: error.issues.map(e => ({
        field: e.path.join("."),
        message: e.message
      }))
    });
  }

  req.body = data;
  next();
};