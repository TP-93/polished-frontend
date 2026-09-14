// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import themes from '../../assets/images/home_page/Customize/2.jpg';
import generator from '../../assets/images/home_page/Customize/1.jpg';
import colorWheel from '../../assets/images/home_page/Customize/3.jpg';
import colorPicker from '../../assets/images/home_page/Customize/4.jpg';
import {
  black,
  tablet,
  desktop,
  cocoBold,
  cocoRegular,
} from '../../styles/constants';
import { useUserProvider } from '../../context/user';

export default function CustomizeInfo() {
  const {
    state: { languages, currentLanguage: lang },
  } = useUserProvider();

  const { Home } = languages[lang];
  const { customiseInfo } = Home;
  const { header, body } = customiseInfo;

  React.useEffect(() => {
    const customizeStep: any = document.getElementById('customize-step-1');
    const customizeInfo: any = document.getElementById('customize-description');

    customizeInfo.scroll({
      top: 0,
      left: customizeStep.width / 2,
    });
  }, []);

  const options = [
    header.list.item1,
    header.list.item2,
    header.list.item3,
    header.list.item4,
  ];

  const descriptions = [
    {
      img: generator,
      title: body.section1.title,
      description: {
        p1: body.section1.description.p1,
        p2: body.section1.description.p2,
      },
    },
    {
      img: themes,
      title: body.section2.title,
      description: {
        p1: body.section2.description.p1,
      },
    },
    {
      img: colorWheel,
      title: body.section3.title,
      description: {
        p1: body.section3.description.p1,
        p2: body.section3.description.p2,
      },
    },
    {
      img: colorPicker,
      title: body.section4.title,
      description: {
        p1: body.section4.description.p1,
        p2: body.section4.description.p2,
      },
    },
  ];

  return (
    <Container>
      <Header>
        <Row1>
          <div>
            <p>{header.p1}</p>
            <p>{header.p2}</p>
          </div>
          <p>{header.mainTitle.part1}</p>
        </Row1>

        <Row2>
          <List>
            {options.map((option, index) => (
              <li key={option}>{`${index + 1}. ${option}`}</li>
            ))}
          </List>

          <p>{header.mainTitle.part2}</p>
        </Row2>

        <Row3>
          <div>
            <p>{header.p3}</p>
            <p>{header.p4}</p>
          </div>

          <p>{header.mainTitle.part3}</p>
        </Row3>
      </Header>

      <Descriptions id="customize-description">
        {descriptions.map(({ img, title, description }, index) => (
          <Description key={title}>
            <Image src={img} id={`customize-step-${index}`} />
            <InfoWrapper>
              <Info>
                <h3>{`${index + 1}. ${title}`}</h3>
                {Object.values(description).map((value) => (
                  <p key={value}>{value}</p>
                ))}
              </Info>
            </InfoWrapper>
          </Description>
        ))}
      </Descriptions>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.8rem;
  background-color: #000;

  @media ${desktop} {
    padding: 2rem 0.5rem;
  }
`;

const Row = styled.div`
  display: grid;
  align-items: center;
  width: 100%;

  * {
    color: #fff;
    ${cocoRegular};
  }

  > div > p,
  > ul > li {
    font-size: 0.4rem;
    line-height: 0.44rem;

    @media ${desktop} {
      font-size: 0.75rem;
      line-height: 1rem;
    }
  }

  > p {
    font-size: 2rem;
    line-height: 1.4rem;
    ${cocoBold};
    justify-self: end;
    text-transform: uppercase;

    @media ${desktop} {
      font-size: 4rem;
      line-height: 3rem;
    }
  }
`;

const Row1 = styled(Row)`
  grid-template-columns: 70% 30%;

  > p {
    align-self: end;
  }
`;

const Row2 = styled(Row)`
  grid-template-columns: 50% 50%;
`;

const Row3 = styled(Row)`
  grid-template-columns: 75% 25%;

  > p {
    align-self: start;
  }
`;

const List = styled.ul`
  margin: 0.5rem 0;
  list-style: none;

  @media ${desktop} {
    margin: 1rem 0;
  }
`;

const Descriptions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: auto;
`;

const Description = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 50%;
  flex-basis: 50%;

  @media ${tablet} {
    min-width: 25%;
    flex-basis: 25%;
  }

  @media ${desktop} {
    min-width: 25%;
    flex-basis: 25%;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin: auto;
  transition: transform 0.3s ease-in-out;
  transform-origin: 0;

  :hover {
    transform: translateY(-1%);
  }
`;

const InfoWrapper = styled.div`
  flex-grow: 1;
  padding: 1.5rem 2rem 1rem 1rem;

  @media ${desktop} {
    padding-bottom: 3rem;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h3 {
    margin-bottom: 1rem;
    color: ${black};
    ${cocoBold};
    font-size: calc(0.5em + 1vmin);
    text-transform: uppercase;
  }

  p {
    ${cocoRegular};
    color: ${black};
    font-size: 0.4rem;
    line-height: 0.44rem;

    @media ${desktop} {
      font-size: 0.75rem;
      line-height: 1rem;
    }
  }
`;
