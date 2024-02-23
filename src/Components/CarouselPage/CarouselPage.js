import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import bliss1 from "../Assests/bliss1.jpeg";
import bliss2 from "../Assests/bliss2.jpg";
import bliss3 from "../Assests/bliss3.jpg";
import bliss4 from "../Assests/bliss4.jpg"
import "./CarouselPage.css"; // Import your custom CSS for carousel styling

export default function CarouselPage() {
    return (
        <div>

            <Carousel
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
                stopOnHover={true}
                transitionTime={500}
                emulateTouch={true}
                showArrows={false} // Removed arrows
                showStatus={false}
                swipeable={true}
                dynamicHeight={false}
                centerMode={true}
                centerSlidePercentage={100}
                className="carousel"
            >
                <div>
                    <img src={bliss1} alt="Slide 1" className="carousel-image" />
                    <p className="legend">Cupid Theatre</p>
                </div>
                <div>
                    <img src={bliss2} alt="Slide 2" className="carousel-image" />
                    <p className="legend">Luminous Theatre</p>
                </div>
                <div>
                    <img src={bliss3} alt="Slide 3" className="carousel-image" />
                    <p className="legend">Blossom Theatre</p>
                </div>
                <div>
                    <img src={bliss4} alt="Slide 3" className="carousel-image" />
                    <p className="legend">Tropix Theatre</p>
                </div>
            </Carousel>

        </div>
    );
}
