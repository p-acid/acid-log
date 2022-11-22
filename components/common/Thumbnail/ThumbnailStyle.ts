import styled from "@emotion/styled";

import Image from "next/future/image";

export const ThumbnailImage = styled(Image)`
  aspect-ratio: 1/1;
  object-fit: cover;
  transition: 0.3s;
`;

export const ThumbnailVideo = styled.video`
  aspect-ratio: 1/1;
  object-fit: cover;
  transition: 0.3s;
`;
