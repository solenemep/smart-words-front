import { Box } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Read from "./components/Read"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Nav from "./components/Nav"
import Write from "./components/Write"
import Account from "./components/Account"

const Dapp = () => {
  return (
    <Router>
      <Nav />
      <Box minH={"100vh"}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/write">
            <Write />
          </Route>
          <Route exact path="/read">
            <Read />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
        </Switch>
      </Box>
      <Footer />
    </Router>
  )
}
export default Dapp
