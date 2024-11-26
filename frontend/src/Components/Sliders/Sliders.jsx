import React from "react";
import Slider from 'infinite-react-carousel';
import CardCat from "./CardCat";
import { cards } from "../data";
import "./Sliders.scss";
import { Link } from "react-router-dom";
import Carousel from 'infinite-react-carousel';

const Sliders = () => {
    // Split the cards array into chunks of 5
    const chunks = Array.from(Array(Math.ceil(cards.length / 5)), (_, i) =>
        cards.slice(i * 5, i * 5 + 5)
    );

    return (
        <div className="slide">
            <div className="container">
                <Slider>
                    {/* Map through each chunk and render as a slide */}
                    {chunks.map((chunk, index) => (
                        <div key={index}>
                            {chunk.map(card => (
                                <Link to="/gigcards">
                                <CardCat item={card} key={card.id} />
                                </Link>
                            ))}
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Sliders;
