import React from "react";

const promoData = [
  {
    id: 1,
    image: "https://static.insales-cdn.com/r/jiHDpcsvPXg/rs:fill-down:688:286:1/q:100/plain/files/1/2197/18679957/original/1267%D1%85595.jpg@jpg",
    bgColor: "#DFF6F0",
  },
  {
    id: 2,
    image: "https://static.insales-cdn.com/r/1ARUXU3f-Hw/rs:fill-down:688:286:1/q:100/plain/files/1/2195/18679955/original/1267%D1%85595__1_.jpg@jpg",
    bgColor: "#E9EAFD",
  },
  {
    id: 3,
    image: "https://static.insales-cdn.com/r/AS0nJZPj4wI/rs:fill-down:688:286:1/q:100/plain/files/1/2196/18679956/original/1267%D1%85595__2_.jpg@jpg",
    bgColor: "#D6EEFD",
  },
  {
    id: 4,
    image: "https://static.insales-cdn.com/r/U_Vx2DEwKPw/rs:fill-down:688:286:1/q:100/plain/files/1/2194/18679954/original/1267%D1%85595__3_.jpg@jpg",
    bgColor: "#E9F7E6",
  },
];

const PromoSection = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "16px",
        padding: "16px",
        backgroundColor: "#F8FAFC",
      }}
    >
      {promoData.map((item) => (
        <div
          key={item.id}
          style={{
            backgroundColor: item.bgColor,
            borderRadius: "8px",
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%",
              height: "150px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <h3 style={{ fontSize: "18px", color: "#333", marginBottom: "8px" }}>
            {item.title}
          </h3>
          {item.discount && (
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#FF5733",
                marginBottom: "8px",
              }}
            >
              {item.discount}
            </span>
          )}
          {item.buttonText && (
            <button
              style={{
                padding: "8px 16px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
              }}
            >
              {item.buttonText}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default PromoSection;
