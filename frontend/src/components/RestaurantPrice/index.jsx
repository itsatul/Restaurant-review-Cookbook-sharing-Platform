function RestaurantPrice({ priceLevel }) {
    return (
        <p>
            Price Level: {"$".repeat(priceLevel || 1)}
        </p>
    );
}

export default RestaurantPrice;
