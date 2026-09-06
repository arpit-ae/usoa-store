export async function onRequestGet(context) {
  try {
    const result = await context.env.DB
      .prepare(`
        SELECT
          p.id,
          p.sku,
          p.name,
          p.slug,
          p.category_id,
          c.name AS category_name,
          p.description,
          p.price,
          p.mrp,
          p.stock,
          p.hsn,
          p.gst_rate,
          p.image_url,
          p.status
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE p.status = 'active'
        ORDER BY p.id ASC
      `)
      .all();

    return Response.json({
      success: true,
      products: result.results || []
    });

  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error
          ? error.message
          : String(error)
      },
      { status: 500 }
    );
  }
}
