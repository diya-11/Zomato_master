// hoc
import HomeLayout from "./Layout/Home.layout";
import HomeLayoutHOC from "./HOC/Home.Hoc";

// components
import Temp from "./Components/temp";


function App() {
  return (
  <>
  <HomeLayoutHOC path="/" exact component={Temp} />
  </>
  );
}

export default App;
