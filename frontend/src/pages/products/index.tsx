import { GetServerSideProps, GetServerSidePropsContext, Redirect } from "next";

import { SCREEN_ROUTES } from "presentation/routes";
import ProductsScreen from "presentation/screens/Products";
import Layout from "presentation/components/templates/Layout";
import { makeDomainStorageGateway } from "main/infra/gateways/domain-storage";

const ProductsPage = (): JSX.Element => {
  return (
    <Layout title="Produtos">
      <ProductsScreen />
    </Layout>
  );
};

export default ProductsPage;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
): Promise<
  | {
      props: {};
    }
  | {
      redirect: Redirect;
    }
> => {
  const domainStorage = makeDomainStorageGateway();
  const token = domainStorage.get({ key: "token", ctx: ctx });
  if (!token) {
    return {
      redirect: {
        permanent: true,
        destination: SCREEN_ROUTES.LOGIN,
      },
    };
  }
  return {
    props: {},
  };
};
