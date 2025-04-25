import AppRoutes from "./components/AppRoutes";
import { useClarityTags } from "./hooks/useClarityTags";

const App = () => {
  useClarityTags()
  return <AppRoutes />;
};

export default App;
