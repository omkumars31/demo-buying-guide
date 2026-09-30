import { useState } from "react";
import axios from "axios";

const questions = [
  {
    id: "category",
    question: "What type of product are you looking for?",
    options: [
      {
        label: "Dental Chair",
        value: "dental-chair"
      },
      {
        label: "Dental Handpiece",
        value: "handpiece"
      },
      {
        label: "Dental Compressor",
        value: "compressor"
      }
    ]
  },

  {
    id: "budget",
    question: "What is your budget?",
    options: [
      {
        label: "Below ₹1 Lakh",
        value: "below-1l"
      },
      {
        label: "₹1 Lakh - ₹2 Lakh",
        value: "1-2l"
      },
      {
        label: "Above ₹2 Lakh",
        value: "above-2l"
      }
    ]
  },

  {
    id: "requirement",
    question: "What is your primary requirement?",
    options: [
      {
        label: "Basic",
        value: "basic"
      },
      {
        label: "Advanced Features",
        value: "advanced"
      },
      {
        label: "Premium",
        value: "premium"
      }
    ]
  }
];

function App() {

  const [currentStep, setCurrentStep] = useState(0);

  const [answers, setAnswers] = useState({});

  const [recommendations, setRecommendations] = useState([]);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleOptionSelect = (value) => {

    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion.id]: value
    }));

    setError("");
  };

  const handleNext = async () => {

    const selectedAnswer =
      answers[currentQuestion.id];

    // Validation
    if (!selectedAnswer) {

      setError(
        "Please select an option before continuing."
      );

      return;
    }

    // Move to next question
    if (currentStep < questions.length - 1) {

      setCurrentStep(
        (previousStep) => previousStep + 1
      );

      return;
    }

    // Last question
    await getRecommendations();
  };

  const getRecommendations = async () => {

    try {

      setLoading(true);

      setError("");

      // Build API payload
      const payload = {
        category: answers.category,
        budget: answers.budget,
        requirement: answers.requirement
      };

      console.log(
        "Sending payload:",
        payload
      );

      // API request
      const response = await axios.post(
        "http://localhost:5100/api/buying-guide/recommend",
        payload
      );

      console.log(
        "API response:",
        response.data
      );

      // Store recommendations
      setRecommendations(
        response.data.products
      );

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);
    }
  };

  // Results screen
  if (recommendations.length > 0) {

    return (
      <div style={styles.container}>

        <h1>
          Recommended Products
        </h1>

        <p>
          Based on your requirements:
        </p>

        <pre>
          {JSON.stringify(
            answers,
            null,
            2
          )}
        </pre>

        {recommendations.map(
          (product) => (

            <div
              key={product.id}
              style={styles.product}
            >

              <h2>
                {product.name}
              </h2>

              <p>
                {product.description}
              </p>

              <strong>
                ₹{product.price}
              </strong>

            </div>
          )
        )}

      </div>
    );
  }

  return (
    <div style={styles.container}>

      <h1>
        DentalKart Buying Guide
      </h1>

      <p>
        Step {currentStep + 1} of{" "}
        {questions.length}
      </p>

      <h2>
        {currentQuestion.question}
      </h2>

      <div>

        {currentQuestion.options.map(
          (option) => (

            <button
              key={option.value}
              onClick={() =>
                handleOptionSelect(
                  option.value
                )
              }
              style={{
                ...styles.button,

                background:
                  answers[
                    currentQuestion.id
                  ] === option.value
                    ? "#333"
                    : "#eee",

                color:
                  answers[
                    currentQuestion.id
                  ] === option.value
                    ? "white"
                    : "black"
              }}
            >
              {option.label}
            </button>

          )
        )}

      </div>

      {error && (

        <p style={styles.error}>
          {error}
        </p>

      )}

      <button
        onClick={handleNext}
        disabled={loading}
        style={styles.nextButton}
      >
        {loading
          ? "Finding Products..."
          : currentStep ===
            questions.length - 1
            ? "Get Recommendations"
            : "Next"}
      </button>

    </div>
  );
}

const styles = {

  container: {
    maxWidth: "700px",
    margin: "50px auto",
    padding: "30px",
    fontFamily: "Arial"
  },

  button: {
    display: "block",
    width: "100%",
    padding: "15px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  },

  nextButton: {
    marginTop: "20px",
    padding: "15px 30px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px"
  },

  error: {
    color: "red",
    marginTop: "15px"
  },

  product: {
    border: "1px solid #ddd",
    padding: "20px",
    marginTop: "15px",
    borderRadius: "10px"
  }
};

export default App;