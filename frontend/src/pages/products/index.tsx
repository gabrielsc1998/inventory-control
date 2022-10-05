import ProductsScreen from "presentation/screens/Products";
import Layout from "presentation/components/templates/Layout";

const ProductsPage = (): JSX.Element => {
  return (
    <Layout title="Produtos">
      <ProductsScreen />
    </Layout>
  );
};

export default ProductsPage;
