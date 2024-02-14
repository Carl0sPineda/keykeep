export const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.status === 404) {
    return res.status(404).json({ error: "Not Found" });
  }

  res.status(500).json({ error: "Internal Server Error" });
};
