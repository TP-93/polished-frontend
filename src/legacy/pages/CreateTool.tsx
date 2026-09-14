// @ts-nocheck
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { Redirect, useParams } from 'react-router-dom';

import { getDesignsForProduct } from '../apollo/queries/products';
import { useUserProvider } from '../context/user';
import { CustomizationToolProvider } from '../context/customize';

import Loader from '../components/common/PageDetails/Loader';
import ToolOptions from '../components/CustomizeTool';
import { extractId } from '../utils/idUtils';
import { QueryProps } from '../interfaces/common';
import { CTChildProps } from '../interfaces/customize';
import { GUEST_TOKEN_NAME } from '../constants';
import CreationMutationWrapper from '../components/CustomizeTool/CreateMutation';

const CreateTool = () => {
  const { slug } = useParams<any>();

  const token = localStorage.getItem(GUEST_TOKEN_NAME);

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const contentText =
    'JORCUSTOM is the webshop where you can buy your streetwear clothing. ' +
    'From hoodies to sweaters and from tracksuits to jackets, you will always find the stylish item you are looking for.';

  const vars = { slug, lang, token, currency };

  return (
    <>
      <Helmet>
        <title>Customize create</title>
        <meta name="description" content={contentText} />
      </Helmet>

      <Query query={getDesignsForProduct} variables={{ ...vars }}>
        {({ data, loading, error }: QueryProps) => {
          if (loading) return <Loader />;
          if (error) return <Redirect to="/404" />;
          if (!data?.product) return <Redirect to="/404" />;

          const { product, colorThemes } = data;
          const { id, designs } = product;

          return (
            <CustomizationToolProvider
              editingExisting={false}
              editingInitState={undefined}
            >
              <CreationMutationWrapper
                designs={designs}
                currentProductId={extractId(id)}
              >
                {({
                  client,
                  finalizing,
                  processDesign,
                  removeDesignHandler,
                }: CTChildProps) => (
                  <ToolOptions
                    client={client}
                    product={product}
                    colorThemes={colorThemes}
                    finalizing={finalizing}
                    processDesign={processDesign}
                    removeDesignHandler={removeDesignHandler}
                  />
                )}
              </CreationMutationWrapper>
            </CustomizationToolProvider>
          );
        }}
      </Query>
    </>
  );
};

export default CreateTool;
