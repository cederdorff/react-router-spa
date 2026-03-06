export default function ProductCard({ product }) {
  return (
    <article key={product.id} className="product-card">
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Price:</strong> {product.price} DKK
      </p>
    </article>
  );
}
