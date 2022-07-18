import styled from "@emotion/styled";

export const HeadingRow = styled.hr`
  margin: ${({ theme }) => theme.figure}px 0
    ${({ theme }) => theme.figure * 3}px;
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.black_30};
`;
export const HeadingFirst = styled.h1`
  color: ${({ theme }) => theme.colors.gray_blue_40};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  margin: ${({ theme }) => theme.figure * 3}px 0;

  ${({ theme }) => theme.typography.display_md};
`;

export const HeadingSecond = styled.h2`
  color: ${({ theme }) => theme.colors.gray_blue_40};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  margin: ${({ theme }) => theme.figure * 3}px 0;

  ${({ theme }) => theme.typography.display_sm}
`;
export const HeadingThird = styled.h3`
  color: ${({ theme }) => theme.colors.gray_blue_40};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  margin: ${({ theme }) => theme.figure * 3}px 0;

  ${({ theme }) => theme.typography.display_xs}
`;

export const HeadingFourth = styled.h4`
  color: ${({ theme }) => theme.colors.gray_blue_40};
  font-weight: ${({ theme }) => theme.typography.weight.medium};
  margin: ${({ theme }) => theme.figure * 3}px 0;

  ${({ theme }) => theme.typography.text_xl}
`;

export const Paragraph = styled.p`
  color: ${({ theme }) => theme.colors.black_80};
  font-weight: ${({ theme }) => theme.typography.weight.light};
  margin-bottom: ${({ theme }) => theme.figure * 4}px;

  ${({ theme }) => theme.typography.text_lg}
`;

export const Strong = styled.strong`
  font-weight: ${({ theme }) => theme.typography.weight.medium};
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure}px;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.figure * 3}px;
`;

export const Image = styled.img`
  max-width: ${({ theme }) => theme.figure * 100}px;
`;

export const ImageText = styled.span`
  color: ${({ theme }) => theme.colors.black_70};
  font-weight: ${({ theme }) => theme.typography.weight.light};

  ${({ theme }) => theme.typography.text_sm}
`;

export const BlockQuote = styled.blockquote`
  margin-bottom: ${({ theme }) => theme.figure * 3}px;
  padding: ${({ theme }) => theme.figure * 4}px
    ${({ theme }) => theme.figure * 5}px;
  border-radius: ${({ theme }) => theme.figure * 2}px;
  background-color: ${({ theme }) => theme.colors.gray_blue_50};

  p {
    margin-bottom: ${({ theme }) => theme.figure * 2}px;
    color: ${({ theme }) => theme.colors.white};

    &:last-of-type {
      margin: 0;
    }
  }

  a {
    color: ${({ theme }) => theme.colors.white_70};
  }
`;

export const Anchor = styled.a`
  color: ${({ theme }) => theme.colors.black};
`;

export const Preformatted = styled.pre`
  margin-bottom: ${({ theme }) => theme.figure * 3}px;
  padding: ${({ theme }) => theme.figure * 2}px;

  div {
    border-radius: ${({ theme }) => theme.figure * 2}px;
  }
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure}px;
  margin-bottom: ${({ theme }) => theme.figure * 3}px;
  color: ${({ theme }) => theme.colors.black_70};
  list-style: inside;

  ${({ theme }) => theme.typography.text_lg}

  ul, ol {
    margin-top: ${({ theme }) => theme.figure}px;
    margin-left: ${({ theme }) => theme.figure * 2}px;
  }
`;

export const OrderedList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.figure}px;
  margin-bottom: ${({ theme }) => theme.figure * 3}px;
  color: ${({ theme }) => theme.colors.black_70};
  list-style: inside;

  ${({ theme }) => theme.typography.text_lg}

  ul, ol {
    margin-top: ${({ theme }) => theme.figure}px;
    margin-left: ${({ theme }) => theme.figure * 2}px;
  }
`;