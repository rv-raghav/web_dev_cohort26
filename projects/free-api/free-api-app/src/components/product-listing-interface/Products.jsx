import { useEffect, useState } from "react";

function ProductCard({ product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = product.images?.length ? product.images : [product.thumbnail];

  const prevImage = () => {
    setImageIndex((current) => (current - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setImageIndex((current) => (current + 1) % images.length);
  };

  return (
    <article className="neo-card" style={{ padding: 0 }}>
      <div style={{ position: 'relative', borderBottom: 'var(--border-width) solid var(--border-color)', height: '250px' }}>
        <img 
          src={images[imageIndex]} 
          alt={product.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {images.length > 1 && (
          <div style={{ position: 'absolute', bottom: '10px', left: '0', width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
            <button
              onClick={prevImage}
              style={{ padding: '0.25rem 0.5rem', minWidth: '40px' }}
            >
              ‹
            </button>
            <button
              onClick={nextImage}
              style={{ padding: '0.25rem 0.5rem', minWidth: '40px' }}
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.title || product.name || "Untitled Product"}</h2>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge">
              {product.category || "General"}
            </span>
            <span className="badge" style={{ background: 'var(--text-primary)' }}>
              {product.brand || "Brand"}
            </span>
          </div>
        </div>

        <p style={{ marginBottom: '1.5rem', flex: 1, fontSize: '0.9rem' }}>
          {product.description || "No description available."}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: 'var(--border-width) solid var(--border-color)' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Syne' }}>
            ${product.price?.toFixed(2) || "0.00"}
          </span>
          <span className="badge" style={{ background: 'var(--accent-color)' }}>
            ★ {product.rating?.toFixed(1) || "0.0"}
          </span>
        </div>
      </div>
    </article>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async function () {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomproducts",
        );
        const data = await response.json();
        setProducts(data.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="badge" style={{ marginBottom: '0.5rem' }}>COMMERCE</p>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Products Gallery</h1>
          <p>Browse a collection of random products with a clean layout.</p>
        </div>
        <button onClick={() => window.location.reload()}>
          Refresh Products
        </button>
      </div>

      <div className="grid-container">
        {loading ? (
          <div className="loading-text">Loading products...</div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="neo-card">No products available.</div>
        )}
      </div>
    </div>
  );
}

export default Products;
