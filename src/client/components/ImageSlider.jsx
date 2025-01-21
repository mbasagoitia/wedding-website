import Carousel from 'react-bootstrap/Carousel';

function ImageSlider () {
  return (
    <Carousel>
      <Carousel.Item interval={4000}>
        <img src="/images/home/hp-img-1.jpg" alt="people pushing airplane" />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src="/images/home/hp-img-2.jpg" alt="aerial view of cliffs" />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src="/images/home/hp-img-3.png" alt="doctors working with patients" />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src="/images/home/hp-img-4.jpg" alt="volunteers and people outside" />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src="/images/home/hp-img-5.jpg" alt="group of doctors and volunteers" />
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src="/images/home/hp-img-7.jpg" alt="CALO team standing in front of airport" />
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageSlider;