import { useState } from "react";

const Home = () => {
  const [jokes, setJokes] = useState(null);

  const loadJokes = async () => {
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes/joke/random",
      );
      const data = await response.json();
      console.log("API Response:", data);
      setJokes(data);
    } catch (error) {
      console.error("Error fetching jokes:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          maxWidth: "600px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#2d3748",
              margin: "0 0 10px 0",
              fontWeight: "700",
            }}
          >
            😂 Random Joke Generator
          </h1>
          <p
            style={{
              color: "#718096",
              fontSize: "16px",
              margin: "0",
            }}
          >
            Click the button to get a hilarious joke!
          </p>
        </div>

        <button
          onClick={loadJokes}
          style={{
            backgroundColor: "#4299e1",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "15px 30px",
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(66, 153, 225, 0.4)",
            marginBottom: "30px",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#3182ce";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 20px rgba(66, 153, 225, 0.6)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#4299e1";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(66, 153, 225, 0.4)";
          }}
        >
          🎭 Click here to Laugh
        </button>

        {jokes && jokes.data && (
          <div
            style={{
              backgroundColor: "#f8f9fa",
              border: "2px solid #e9ecef",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              animation: "fadeIn 0.5s ease-in",
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                marginBottom: "15px",
              }}
            >
              😂
            </div>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.6",
                color: "#2d3748",
                fontWeight: "500",
                margin: "0",
                fontStyle: "italic",
              }}
            >
              {jokes.data.content || jokes.data.joke}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
