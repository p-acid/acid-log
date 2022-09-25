import Link from "next/link";
import { Prism as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

import {
  HeadingFirst,
  Paragraph,
  MediaWrapper,
  NextImage,
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
  ListItem,
  Video,
} from "./postSyntaxStylerStyle";

import { getFileExtension, getPostHeadLinkId } from "../../../utils/post";

const postSyntaxStyler = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <ReactSyntaxHighlighter
        children={String(children).replace(/\n$/, "")}
        language={match[1]}
        PreTag="pre"
        style={vscDarkPlus}
        {...props}
      />
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  hr: ({ ...props }) => <HeadingRow {...props} />,
  h1: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <HeadingFirst {...props} id={getPostHeadLinkId(children)}>
        {children}
      </HeadingFirst>
    </Link>
  ),
  h2: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <HeadingSecond {...props} id={getPostHeadLinkId(children)}>
        {children}
      </HeadingSecond>
    </Link>
  ),
  h3: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <HeadingThird {...props} id={getPostHeadLinkId(children)}>
        {children}
      </HeadingThird>
    </Link>
  ),
  h4: ({ children, ...props }) => (
    <Link href={`#${getPostHeadLinkId(children)}`}>
      <HeadingFourth {...props} id={getPostHeadLinkId(children)}>
        {children}
      </HeadingFourth>
    </Link>
  ),
  p: ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>,
  strong: ({ children, ...props }) => <Strong {...props}>{children}</Strong>,
  img: ({ src, alt, ...props }) => {
    const isMp4 = getFileExtension(src) === "mp4";

    return (
      <MediaWrapper>
        {isMp4 ? (
          <Video autoPlay loop muted playsInline>
            <source src={src} type="video/mp4" />
          </Video>
        ) : (
          <NextImage {...props} src={src} alt={alt} width={560} height={350} />
        )}
        {alt && <ImageText>{alt}</ImageText>}
      </MediaWrapper>
    );
  },
  blockquote: ({ children, ...props }) => (
    <BlockQuote {...props}>{children}</BlockQuote>
  ),
  a: ({ children, ...props }) => <Anchor {...props}>{children}</Anchor>,
  pre: ({ children, ...props }) => (
    <Preformatted {...props}>{children}</Preformatted>
  ),
  ul: ({ children, ...props }) => (
    <UnorderedList {...props}>{children}</UnorderedList>
  ),
  ol: ({ children, ...props }) => (
    <OrderedList {...props}>{children}</OrderedList>
  ),
  li: ({ children, ...props }) => <ListItem {...props}>{children}</ListItem>,
};

export default postSyntaxStyler;
