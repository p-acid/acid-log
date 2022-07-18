import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import {
  HeadingFirst,
  Paragraph,
  Image,
  ImageWrapper,
  ImageText,
  HeadingRow,
  BlockQuote,
  HeadingSecond,
  Anchor,
  HeadingThird,
  HeadingFourth,
  Preformatted,
  UnorderedList,
  OrderedList,
  Strong,
} from "./postSyntaxStylerStyle";

const postSyntaxStyler = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <ReactSyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        PreTag="div"
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  hr: ({ className, ...props }) => (
    <HeadingRow className={className} {...props} />
  ),
  h1: ({ className, children, ...props }) => (
    <HeadingFirst className={className} {...props}>
      {children}
    </HeadingFirst>
  ),
  h2: ({ className, children, ...props }) => (
    <HeadingSecond className={className} {...props}>
      {children}
    </HeadingSecond>
  ),
  h3: ({ className, children, ...props }) => (
    <HeadingThird className={className} {...props}>
      {children}
    </HeadingThird>
  ),
  h4: ({ className, children, ...props }) => (
    <HeadingFourth className={className} {...props}>
      {children}
    </HeadingFourth>
  ),
  p: ({ className, children, ...props }) => (
    <Paragraph className={className} {...props}>
      {children}
    </Paragraph>
  ),
  strong: ({ className, children, ...props }) => (
    <Strong className={className} {...props}>
      {children}
    </Strong>
  ),
  img: ({ className, alt, ...props }) => (
    <ImageWrapper>
      <Image className={className} {...props} alt={alt} />
      {alt && <ImageText>{alt}</ImageText>}
    </ImageWrapper>
  ),
  blockquote: ({ className, children, ...props }) => (
    <BlockQuote className={className} {...props}>
      {children}
    </BlockQuote>
  ),
  a: ({ className, children, ...props }) => (
    <Anchor className={className} {...props}>
      {children}
    </Anchor>
  ),
  pre: ({ className, children, ...props }) => (
    <Preformatted className={className} {...props}>
      {children}
    </Preformatted>
  ),
  ul: ({ className, children, ...props }) => (
    <UnorderedList className={className} {...props}>
      {children}
    </UnorderedList>
  ),
  ol: ({ className, children, ...props }) => (
    <OrderedList className={className} {...props}>
      {children}
    </OrderedList>
  ),
};

export default postSyntaxStyler;
