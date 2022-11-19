import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

function App() {
  return (
    <div className="App">
      <TawkMessengerReact
        propertyId="63765154daff0e1306d7f24d"
        widgetId="1gi32rd0v"
        style={{
          position: 'fixed',
          bottom: '0',
          left: '0',
          width: '300px',
          height: '400px',
          zIndex: '9999',
        }}
      />
    </div>
  );
}

export default App;
