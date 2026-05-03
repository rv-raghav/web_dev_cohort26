import { useEffect, useState } from "react";
import "./Products.css";

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
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={images[imageIndex]} alt={product.title} />
        {images.length > 1 && (
          <div className="carousel-controls">
            <button
              className="carousel-button"
              onClick={prevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="carousel-indicator">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`carousel-dot ${idx === imageIndex ? "active" : ""}`}
                />
              ))}
            </div>
            <button
              className="carousel-button"
              onClick={nextImage}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div className="product-body">
        <div className="product-heading">
          <h2>{product.title || product.name || "Untitled Product"}</h2>
          <div className="product-meta">
            <span className="product-badge">
              {product.category || "General"}
            </span>
            <span className="product-badge">{product.brand || "Brand"}</span>
          </div>
        </div>

        <p className="product-description">
          {product.description || "No description available."}
        </p>

        <div className="product-footer">
          <span className="product-price">
            ${product.price?.toFixed(2) || "0.00"}
          </span>
          <span className="product-rating">
            <span>★</span> {product.rating?.toFixed(1) || "0.0"}
          </span>
        </div>
      </div>
    </article>
  );
}

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async function () {
      try {
        const response = await fetch(
          "https://api.freeapi.app/api/v1/public/randomproducts",
        );
        const data = await response.json();
        console.log(data);
        setProducts(data.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="products-page">
      <header className="products-header">
        <h1>Product Listing Interface</h1>
        <p>
          Browse an elegant product gallery with carousel previews, rich
          metadata, and a clean card layout.
        </p>
      </header>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="loading-message">Loading products...</div>
        )}
      </div>
    </section>
  );
}

export default Products;
