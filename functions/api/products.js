export async function onRequestGet(context) {
  const { env } = context;

  const result = await env.DB
    .prepare("SELECT * FROM products ORDER BY id DESC")
    .all();

  return Response.json(result);
}
