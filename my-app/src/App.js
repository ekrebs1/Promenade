import React from // { useState, useEffect }
"react";
import { Navbar } from "./components";

// import { getSomething } from "./api";

const App = () => {
  // const [message, setMessage] = useState("");

  // useEffect(() => {
  //   getSomething()
  //     .then((response) => {
  //       setMessage(response.message);
  //     })
  //     .catch((error) => {
  //       setMessage(error.message);
  //     });
  // });

  return (
    <div>
      <main>
        <div className='App'>
          <Navbar />
        </div>
      </main>
    </div>
  );
};

export default App;
