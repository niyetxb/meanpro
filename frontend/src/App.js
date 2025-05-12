import React, { lazy, Suspense, useEffect, useState, useMemo } from "react";
import { Button, Input, Switch } from "antd";
import { ThemeProvider } from "./contexts/ThemeContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const AggregatePage = lazy(() => import("./pages/AggregatePage"));

const App = () => {
  const [loggingEnabled, setLoggingEnabled] = useState(true);
  const [products, setProducts] = useState([
    { id: 1, name: "Футболка", price: 20 },
    { id: 2, name: "Джинсы", price: 50 },
    { id: 3, name: "Куртка", price: 100 },
  ]);

  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  useEffect(() => {
    if (loggingEnabled) console.log("App component mounted");
    return () => {
      if (loggingEnabled) console.log("App component unmounted");
    };
  }, [loggingEnabled]);

  const totalPrice = useMemo(() => {
    return products.reduce((acc, item) => acc + item.price, 0);
  }, [products]);

  const handleAddProduct = () => {
    if (newProduct.name.trim() !== "" && !isNaN(newProduct.price)) {
      const newId = products.length ? products[products.length - 1].id + 1 : 1;
      const product = {
        id: newId,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
      };

      setProducts([...products, product]);
      setNewProduct({ name: "", price: "" });
    }
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>LOG</h1>
      <div style={{ marginBottom: "10px" }}>
        <span>Logging: </span>
        <Switch checked={loggingEnabled} onChange={setLoggingEnabled} />
      </div>

      <ThemeProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <HomePage products={products} />
          <AggregatePage />
        </Suspense>
      </ThemeProvider>

      <div style={{ marginTop: "20px" }}>
        <h2>Общая стоимость товаров: ${totalPrice}</h2>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Добавить новый товар:</h2>
        <Input
          placeholder="Название товара"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Input
          placeholder="Цена"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          style={{ marginBottom: "10px" }}
        />
        <Button type="primary" onClick={handleAddProduct}>
          Добавить товар
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>Список товаров:</h2>
        {products.length > 0 ? (
          <ul>
            {products.map((product) => (
              <li key={product.id} style={{ marginBottom: "10px" }}>
                {product.name} — ${product.price}{" "}
                <Button
                  type="primary"
                  danger
                  onClick={() => handleDeleteProduct(product.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Удалить
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Товары отсутствуют.</p>
        )}
      </div>
    </div>
  );
};

export default App;
