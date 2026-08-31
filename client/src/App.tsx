// Sea Glass Editorial — one focused route for a single-person keepsake.
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

export default function App() {
  return <Switch><Route path="/" component={Home}/><Route path="/preview-after" component={Home}/><Route component={NotFound}/></Switch>;
}
