import "./featuredProperties.css";

import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/hotels?featured=true&limit=4");

  
  return (
    <div className="fp">
      {loading ? (
        "Loading...Pls wait" // if loading = true is loading... pls wait : else = fale = data
      ) : (
        <>
          {data.map((item, idx) => 
           (
            <>
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              <div className="fpRating">
                <button>{item.rating}</button>
                <span>{item.rating === 5 ? "Good" : "Medium"}</span>
              </div>
            </div>
          </>
            )
          )}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
