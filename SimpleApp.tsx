// Simple test App component
const React = window.React || {};
const { useState } = React;

const SimpleApp = () => {
  const [count, setCount] = useState ? useState(0) : [0, () => {}];

  if (!React.createElement) {
    return React.createElement("div", {
      style: {
        color: "red",
        fontSize: "24px",
        fontWeight: "bold",
        padding: "20px",
        backgroundColor: "yellow",
        border: "5px solid red"
      }
    }, "React not available");
  }

  return React.createElement("div", {
    style: {
      padding: "40px",
      backgroundColor: "#ffffff",
      border: "5px solid #ff0000",
      borderRadius: "8px",
      minHeight: "400px",
      minWidth: "600px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 10000,
      boxShadow: "0 0 20px rgba(0,0,0,0.5)"
    }
  },
    React.createElement("h1", { 
      style: { 
        color: "#000000", 
        fontSize: "32px",
        margin: "0",
        textAlign: "center"
      } 
    }, "SIMPLE TEST APP - REACT IS WORKING!"),
    React.createElement("p", { 
      style: { 
        fontSize: "24px",
        color: "#333",
        margin: "10px 0"
      } 
    }, `Count: ${count}`),
    React.createElement("button", {
      onClick: () => setCount(count + 1),
      style: {
        padding: "15px 30px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "18px",
        fontWeight: "bold"
      }
    }, "INCREMENT COUNTER"),
    React.createElement("div", {
      style: {
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#28a745",
        color: "white",
        borderRadius: "4px",
        fontSize: "18px",
        textAlign: "center",
        fontWeight: "bold"
      }
    }, "SUCCESS: React is rendering correctly!"),
    React.createElement("div", {
      style: {
        marginTop: "10px",
        padding: "10px",
        backgroundColor: "#ffc107",
        color: "#000",
        borderRadius: "4px",
        fontSize: "14px",
        textAlign: "center"
      }
    }, "If you can see this box, the extension UI is working")
  );
};

export default SimpleApp;


