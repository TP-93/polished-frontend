// @ts-nocheck
import { Query } from 'react-apollo';
import { Helmet } from 'react-helmet';
import { Redirect, useParams } from 'react-router-dom';

import { getUserDesignInfo } from '../apollo/queries/products';
import { useUserProvider } from '../context/user';
import { CustomizationToolProvider } from '../context/customize';

import {
  injectTextChanges,
  customizationsToRaw,
  makeCustomizedDesignMapping,
} from '../components/CustomizeTool/utils/customizationUtils';
import Loader from '../components/common/PageDetails/Loader';
import ToolOptions from '../components/CustomizeTool';
import { QueryProps } from '../interfaces/common';
import { CTChildProps } from '../interfaces/customize';
import EditMutationWrapper from '../components/CustomizeTool/EditMutation';
import { GUEST_TOKEN_NAME } from '../constants';
import { extractId, makeId } from '../utils/idUtils';

const EditSession = () => {
  const { id } = useParams<any>();
  const token = localStorage.getItem(GUEST_TOKEN_NAME);
  const designId = makeId('UserDesign', id);

  const {
    state: { currency, currentLanguage: lang },
  } = useUserProvider();

  const contentText =
    'JORCUSTOM is the webshop where you can buy your streetwear clothing. ' +
    'From hoodies to sweaters and from tracksuits to jackets, you will always find the stylish item you are looking for.';

  const vars = { lang, token, designId, currency };

  return (
    <>
      <Helmet>
        <title>Customize edit</title>
        <meta name="description" content={contentText} />
      </Helmet>

      <Query query={getUserDesignInfo} variables={{ ...vars }}>
        {({ data, loading, error }: QueryProps) => {
          if (loading) return <Loader />;
          if (error) return <Redirect to="/404" />;
          if (!data.userDesign) return <Redirect to="/404" />;

          const { userDesign, colorThemes } = data;
          const {
            id: currentProductId,
            name: userDesignName,
            product,
            changedTextLayers,
            customizedDesigns,
          } = userDesign;
          const { designs } = product;

          const images: any[] = [];
          const imageSide: string = 'A_2';
          const customizedImageGroups: any[] = [];

          if (customizedDesigns.length > 0) {
            const frontImg = customizedDesigns.find(
              (design: any) => design.projection === 'front',
            )?.customizedPngDesign;
            const backImg = customizedDesigns.find(
              (design: any) => design.projection === 'back',
            )?.customizedPngDesign;

            images.push(frontImg, backImg);

            customizedImageGroups.push({
              imageSide,
              images,
            });
          } else {
            customizedDesigns.forEach((design: any) => {
              const { customizedPngDesign } = design;

              customizedImageGroups.push({
                imageSide,
                images: customizedPngDesign,
              });
            });
          }

          const editingInitState = customizationsToRaw(
            customizedDesigns,
            designs,
          );

          const designMapping = makeCustomizedDesignMapping(customizedDesigns);

          if (changedTextLayers?.length)
            injectTextChanges(designs, changedTextLayers);

          return (
            <CustomizationToolProvider
              editingExisting={true}
              editingInitState={editingInitState}
            >
              <EditMutationWrapper
                designs={designs}
                userDesignId={designId}
                currentProductId={extractId(currentProductId)}
                customizedDesignMapping={designMapping}
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
                    designId={designId}
                    finalizing={finalizing}
                    colorThemes={colorThemes}
                    userDesignName={userDesignName}
                    customizedImageGroups={customizedImageGroups}
                    processDesign={processDesign}
                    removeDesignHandler={removeDesignHandler}
                  />
                )}
              </EditMutationWrapper>
            </CustomizationToolProvider>
          );
        }}
      </Query>
    </>
  );
};

export default EditSession;
