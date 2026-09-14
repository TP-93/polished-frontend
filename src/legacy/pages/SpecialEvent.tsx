// @ts-nocheck
import { Helmet } from 'react-helmet';

import PageWrapper from '../components/common/PageDetails/PageWrapper';
import SpecialEvent from '../components/SpecialEvent';

export default function SpecialEventPage() {
  return (
    <PageWrapper isFooterHidden={true}>
      <Helmet>
        <title>JORCUSTOM - Make It Personal</title>
        <meta
          name="description"
          content="JORCUSTOM is the webshop where you can buy your streetwear clothing. From hoodies to sweaters and from tracksuits to jackets, you will always find the stylish item you are looking for. "
        />
      </Helmet>

      <SpecialEvent />
    </PageWrapper>
  );
}
