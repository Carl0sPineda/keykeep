export const errorHandler = (res, error, message) => {
  console.error(error.message);
  res.status(500).json({ error: message });
};

export const notFoundHandler = (res, id) => {
  res.status(404).json({ error: `id ${id} not found` });
};

export const successHandler = (res, id, message) => {
  res.json({ id: id, message: message });
};
