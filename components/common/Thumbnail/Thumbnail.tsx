import { ImageProps } from "next/image";
import { HTMLAttributes, useMemo } from "react";
import { getFileExtension } from "../../../utils/post";
import { ThumbnailImage, ThumbnailVideo } from "./ThumbnailStyle";

type ThumbnailExtendTypes = ImageProps & HTMLAttributes<HTMLVideoElement>;

interface ThumbnailProps extends ThumbnailExtendTypes {
  src: string;
  alt?: string;
}

const Thumbnail = ({ src, alt, ...restProps }: ThumbnailProps) => {
  const isMp4 = useMemo(
    () => getFileExtension(src) === "mp4",
    [getFileExtension, src]
  );

  if (isMp4)
    return (
      <ThumbnailVideo autoPlay loop muted playsInline {...restProps}>
        <source src={src} type="video/mp4" />
      </ThumbnailVideo>
    );

  return <ThumbnailImage src={src} alt={alt} loading="eager" {...restProps} />;
};

export default Thumbnail;
