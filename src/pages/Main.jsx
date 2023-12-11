// import Community from "../assets/images/Community.svg";
// import peaceOfMind from "../assets/images/peaceOfMind.svg";
// import Support from "../assets/images/Support.svg";
import { decorationCardsData } from "../Utils/LocalData";
import Container from "../layouts/Container";
import ProductCard from "../components/cards/ProductCard";
import Carousel from "../layouts/Carousel";
import CategoryCard from "../components/cards/CategoryCard";
import LoadingScreen from "../services/LoadingScreen";
import MainCarousel from "../layouts/MainCarousel";
import MainCategoryCard from "../components/cards/MainCategryCard";
import { useState, useEffect } from "react";
import { useContext } from "react";
import {
  ProductsContext,
  // CategoriesContext,
  SpecificCategoryDataContext,
} from "../App";
import DecorationCard from "../components/cards/DecorationCard";

const Main = () => {
  const products = useContext(ProductsContext);
  const category = useContext(SpecificCategoryDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  return (
    <section className="w-full">
      {isLoading ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <div className="w-xl m-auto flex flex-col items-center justify-center pt-[50px]">
          <MainCarousel>
            {category.map((array, index) => (
              <div key={index}>
                {array.length > 0 &&
                  array.map(
                    (categoryProd, index) =>
                      index < 1 && (
                        <MainCategoryCard
                          key={array[index].id}
                          id={array[index].id}
                          imgSrc={array[index].image}
                          type={array[index].category}
                        ></MainCategoryCard>
                      )
                  )}
              </div>
            ))}
          </MainCarousel>
          <div className="flex flex-wrap items-center justify-center gap-[30px] flex-row max-w-screen-2xl p-[20px] py-[100px]">
            {decorationCardsData.map((decData, index) => (
              <DecorationCard
                key={index}
                title={decData.title}
                description={decData.description}
                imgSrc={decData.imgSrc}
              ></DecorationCard>
            ))}
          </div>
          <Carousel>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imgSrc={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
              ></ProductCard>
            ))}
          </Carousel>
          {/* <h2 className="my-[100px] text-4xl text-start max-w-screen-xl font-medium">
            Categories
          </h2>
          <Container>
            {category.map((array, index) => (
              <div key={index}>
                {array.length > 0 &&
                  array.map(
                    (categoryProd, index) =>
                      index < 1 && (
                        <CategoryCard
                          key={array[index].id}
                          id={array[index].id}
                          imgSrc={array[index].image}
                          type={array[index].category}
                        ></CategoryCard>
                      )
                  )}
              </div>
            ))}
          </Container> */}
        </div>
      )}
    </section>
  );
};

export default Main;
