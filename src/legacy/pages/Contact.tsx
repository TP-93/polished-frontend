// @ts-nocheck
import styled, { css } from 'styled-components';
import { Helmet } from 'react-helmet';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

import { useUserProvider } from '../context/user';

import PageTitle from '../components/common/PageDetails/PageTitle';
import PageWrapper from '../components/common/PageDetails/PageWrapper';
import { renderStars } from '../components/TheFooter/Feedback';
import {
  cocoRegular,
  grey,
  black,
  noTablet,
  tablet,
} from '../styles/constants';

const GoogleMap = GoogleApiWrapper({
  apiKey: 'AIzaSyBW1uNYoZK-QEYdrrjJXMCFB94aGfmNIBA',
})(({ google }) => {
  const coords: any = { lat: 51.7280248, lng: 5.2798693 };

  return (
    <Map zoom={16} google={google} initialCenter={coords}>
      <Marker position={coords} />
    </Map>
  );
});

export default () => {
  const {
    state: { languages, currentLanguage },
  } = useUserProvider();
  const {
    Contact: {
      article1,
      article2,
      pageTitle,
      title1,
      title2,
      title3,
      table: {
        tableRow1,
        tableRow2,
        tableRow3,
        tableRow4,
        tableRow5,
        tableRow6,
        tableRow7,
      },
    },
  } = languages[currentLanguage];

  return (
    <PageWrapper>
      <Helmet>
        <title>JORCUSTOM - Make It Personal</title>
        <meta
          name="description"
          content="JORCUSTOM is the webshop where you can buy your streetwear clothing. From hoodies to sweaters and from tracksuits to jackets, you will always find the stylish item you are looking for. Streetwear is undoubtedly the style that has formed its own culture."
        />
      </Helmet>

      <PageTitle title={pageTitle} />

      <Wrapper>
        <FormWrapper>
          <Title>{title1}</Title>
          <Article>
            {article1.title}
            <ul>
              <li>{article1.li1}</li>
              <li>{article1.li2}</li>
              <li>{article1.li3}</li>
            </ul>
            {article1.endThanks}
          </Article>

          <Title>{title2}</Title>
          <Article>
            {article2.description} <strong>9.1!</strong>
            <StarsWrapper>{renderStars()}</StarsWrapper>
            {article2.question}
            <A href="src/pages/Contact">
              {article2.startTextLink} &quot;{article2.endTextLink}
              &quot;
            </A>
          </Article>
        </FormWrapper>

        <MapWrapper>
          <Title>{title3}</Title>
          <Table>
            <TableRow>
              <Cell>{tableRow1.cell1}</Cell>
              <Cell>{tableRow1.cell2}</Cell>
            </TableRow>
            <TableRow>
              <Cell />
              <Cell>{tableRow1.cell3}</Cell>
            </TableRow>
            <TableRow>
              <Cell>{tableRow2.cell1}</Cell>
              <Cell>{tableRow2.cell2}</Cell>
            </TableRow>
            <TableRow>
              <Cell>{tableRow3.cell1}</Cell>
              <Cell>{tableRow3.cell2}</Cell>
            </TableRow>
            <TableRow>
              <Cell>{tableRow4.cell1}</Cell>
              <Cell>{tableRow4.cell2}</Cell>
            </TableRow>
            <TableRow>
              <Cell>{tableRow5.cell1}</Cell>
              <Cell>{tableRow5.cell2}</Cell>
            </TableRow>
            <TableRow>
              <Cell>{tableRow6.cell1}</Cell>
              <Cell>{tableRow6.cell2}</Cell>
            </TableRow>
            <TableRow>
              <Cell>{tableRow7.cell1}</Cell>
              <Cell>{tableRow7.cell2}</Cell>
            </TableRow>
          </Table>

          <MapContainer>
            <GoogleMap />
          </MapContainer>
        </MapWrapper>
      </Wrapper>
    </PageWrapper>
  );
};

const textStyles = css`
  font-size: 12px;
  line-height: 19.6px;
  text-align: left;
  ${cocoRegular};

  @media ${tablet} {
    width: 50%;
    font-size: 16px;
  }
`;

const columnStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 40px 85px;

  @media ${noTablet} {
    flex-direction: column;
    padding: 10px;
  }
`;

const FormWrapper = styled.div`
  ${columnStyles};

  @media ${noTablet} {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const MapWrapper = styled.div`
  ${columnStyles};

  @media ${noTablet} {
    width: 100%;
  }
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const A = styled.a`
  display: block;
  ${textStyles};
  color: ${black};

  &:hover {
    color: ${grey};
  }
`;

const Article = styled.article`
  margin-bottom: 40px;
  ${textStyles};

  &:last-child {
    margin-bottom: 0;
  }

  @media ${noTablet} {
    width: 100%;
  }
`;

const Title = styled.h4`
  margin-bottom: 20px;
  padding-bottom: 0;
  font-size: 32px;
  ${cocoRegular};
`;

const Table = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
  width: 100%;
  height: 33px;
  border-bottom: 1px solid ${grey};
`;

const Cell = styled.div`
  display: block;
  ${textStyles};
  line-height: 33px;
`;

const StarsWrapper = styled.div`
  margin: 20px 0 30px;

  @media ${noTablet} {
    width: 100%;
  }
`;
