// Simple test App component
const React = window.React || {};
const { useState } = React;

const SimpleApp = () => {
  const [count, setCount] = useState ? useState(0) : [0, () => {}];

  if (!React.createElement) {
    return React.createElement('div', null, 'React not available');
  }

  return React.createElement('div', {
    style: {
      padding: '20px',
      backgroundColor: '#f0f0f0',
      border: '2px solid #333',
      borderRadius: '8px',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px'
    }
  },
    React.createElement('h1', { style: { color: '#333' } }, 'Simple Test App'),
    React.createElement('p', null, `Count: ${count}`),
    React.createElement('button', {
      onClick: () => setCount(count + 1),
      style: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }
    }, 'Increment'),
    React.createElement('div', {
      style: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px'
      }
    }, 'If you can see this, React is working correctly!')
  );
};

export default SimpleApp;

