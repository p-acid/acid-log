import { useMemo } from "react";
import { getFileExtension } from "../../../utils/post";
import { ThumbnailImage, ThumbnailVideo } from "./ThumbnailStyle";

interface ThumbnailProps {
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

  return <ThumbnailImage src={src} alt={alt} {...restProps} />;
};

export default Thumbnail;
