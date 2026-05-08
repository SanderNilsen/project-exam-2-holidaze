import { useState } from "react";
import styled from "styled-components";

const Carousel = styled.section`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 16px;

  @media (max-width: 768px) {
    height: 260px;
  }
`;

const ControlButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $position }) => ($position === "left" ? "left: 14px;" : "right: 14px;")}

  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text);
  font-size: 24px;
  cursor: pointer;

  &:hover {
    background: #ffffff;
  }
`;

const Counter = styled.div`
  position: absolute;
  right: 14px;
  bottom: 14px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #ffffff;
  font-size: 13px;
`;

const ThumbnailRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
  overflow-x: auto;
`;

const ThumbnailButton = styled.button`
  width: 82px;
  height: 58px;
  padding: 0;
  border: 2px solid
    ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default function VenueImageCarousel({ media = [], title }) {
  const images = media.length
    ? media
    : [{ url: "/images/placeholder-venue.svg", alt: title }];

  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  function showPrevious() {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  function showNext() {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }

  return (
    <Carousel>
      <Image src={activeImage.url} alt={activeImage.alt || title} />

      {images.length > 1 && (
        <>
          <ControlButton
            type="button"
            $position="left"
            onClick={showPrevious}
            aria-label="Previous image"
          >
            ‹
          </ControlButton>

          <ControlButton
            type="button"
            $position="right"
            onClick={showNext}
            aria-label="Next image"
          >
            ›
          </ControlButton>

          <Counter>
            {activeIndex + 1} / {images.length}
          </Counter>

          <ThumbnailRow>
            {images.map((image, index) => (
              <ThumbnailButton
                key={`${image.url}-${index}`}
                type="button"
                $active={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show image ${index + 1}`}
              >
                <Thumbnail src={image.url} alt={image.alt || title} />
              </ThumbnailButton>
            ))}
          </ThumbnailRow>
        </>
      )}
    </Carousel>
  );
}