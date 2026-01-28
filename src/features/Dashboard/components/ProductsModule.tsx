import React from 'react';

export const ProductsModule: React.FC = () => {
  return (
    <div className="container py-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {/* Product Category Card */}
        <div className="col">
          <a href="#" className="text-decoration-none">
            <div className="card h-100 text-center border-0 shadow-lg module-card">
              <div className="card-body p-4">
                <div className="icon-container mb-3">
                  <i className="bi bi-tags"></i>
                </div>
                <h5 className="card-title">Product Category</h5>
              </div>
            </div>
          </a>
        </div>

        {/* Products Card */}
        <div className="col">
          <a href="#" className="text-decoration-none">
            <div className="card h-100 text-center border-0 shadow-lg module-card">
              <div className="card-body p-4">
                <div className="icon-container mb-3">
                  <i className="bi bi-box-seam"></i>
                </div>
                <h5 className="card-title">Products</h5>
              </div>
            </div>
          </a>
        </div>

        {/* Product Store Card */}
        <div className="col">
          <a href="#" className="text-decoration-none">
            <div className="card h-100 text-center border-0 shadow-lg module-card">
              <div className="card-body p-4">
                <div className="icon-container mb-3">
                  <i className="bi bi-shop-window"></i>
                </div>
                <h5 className="card-title">Product Store</h5>
              </div>
            </div>
          </a>
        </div>

        {/* Product Orders Card */}
        <div className="col">
          <a href="#" className="text-decoration-none">
            <div className="card h-100 text-center border-0 shadow-lg module-card">
              <div className="card-body p-4">
                <div className="icon-container mb-3">
                  <i className="bi bi-bag-check"></i>
                </div>
                <h5 className="card-title">Product Orders</h5>
              </div>
            </div>
          </a>
        </div>

        {/* Product Services Card */}
        <div className="col">
          <a href="#" className="text-decoration-none">
            <div className="card h-100 text-center border-0 shadow-lg module-card">
              <div className="card-body p-4">
                <div className="icon-container mb-3">
                  <i className="bi bi-briefcase"></i>
                </div>
                <h5 className="card-title">Services</h5>
              </div>
            </div>
          </a>
        </div>
      </div>

      <style>{`
        .container {
          background-color: #f5f7fa;
          border-radius: 15px;
          padding: 2rem;
        }

        .card {
          border-radius: 15px;
          transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out;
          background-color: #fff;
        }

        .card:hover {
          transform: translateY(-10px);
          background-color: #f0f4f8;
        }

        .icon-container {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--bs-warning);
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto;
        }

        .bi {
          font-size: 2rem;
          color: #fff;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 10px;
          color: #333;
        }

        .module-card {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};
