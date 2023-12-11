import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "../layouts/Container";
import ProductCard from "../components/cards/ProductCard";
import { SpecificCategoryDataContext } from "../App";

export function filterProductsByCategory(products, category) {
  const filteredProducts = products.flatMap((product) => {
    if (product.length > 0 && product[0].category === category) {
      return product;
    }
    return [];
  });

  return filteredProducts;
}

const Category = () => {
  const { category } = useParams();
  const [products, setProduct] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  const specificCategory = useContext(SpecificCategoryDataContext);

  useEffect(() => {
    const filteredProducts = filterProductsByCategory(
      specificCategory,
      category
    );
    setProduct(filteredProducts);
  }, [category, specificCategory]);

  return (
    <section className="w-full">
      <div className="my-[70px] px-[10px] flex flex-row items-center justify-center">
        <Container>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imgSrc={product.image}
              title={product.title}
              price={product.price}
              description={product.description}
              category={product.category}
            />
          ))}
        </Container>
      </div>
    </section>
  );
};

export default Category;
