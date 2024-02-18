import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import bliss1 from "../Assests/bliss1.jpg"

export default function CarouselPage() {
    return (
        <Carousel>
            <div>
                <img src="bliss1" />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src="assets/2.jpeg" />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src="assets/3.jpeg" />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    )
}