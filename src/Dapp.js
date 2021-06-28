import { Box } from "@chakra-ui/react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Archive from "./Archive"
import Footer from "./Footer"
import Home from "./Home"
import Nav from "./Nav"
import Transact from "./Transact"
import Write from "./Write"

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
          <Route exact path="/archive">
            <Archive />
          </Route>
          <Route exact path="/transact">
            <Transact />
          </Route>
        </Switch>
      </Box>
      <Footer />
    </Router>
  )
}
export default Dapp
