import { useMemo } from "react";
import { getFileExtension } from "../../../utils/post";
import { ThumbnailImage, ThumbnailVideo } from "./ThumbnailStyle";

interface ThumbnailProps {
  src: string;
  alt?: string;
}

const Thumbnail = ({ src, alt }: ThumbnailProps) => {
  const isGif = useMemo(
    () => getFileExtension(src) === "gif",
    [getFileExtension, src]
  );

  if (isGif)
    return (
      <ThumbnailVideo autoPlay loop muted playsInline>
        <source src={src} type="video/mp4" />
      </ThumbnailVideo>
    );

  return <ThumbnailImage src={src} alt={alt} />;
};

export default Thumbnail;
