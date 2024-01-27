import {Outlet} from "react-router-dom";
import {NavigationBar} from "./components/navigation-bar/navbar";
import "./app-styles.css";
import {Footer} from "./components/footer/footer";


export function App() {
  return (
      <div>
          <NavigationBar />
          <Outlet />
          <Footer />
      </div>
  )
}


