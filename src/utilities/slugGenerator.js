export default function generateSlug(name, id) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")   // Replace spaces and special chars with hyphens
    .replace(/^-+|-+$/g, "");      // Trim hyphens from start/end

  return `${slug}-${id}`;
}
