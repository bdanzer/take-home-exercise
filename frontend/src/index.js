import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import thunkMiddleware from "redux-thunk"
import { createStore, applyMiddleware } from "redux"
import { hot } from "react-hot-loader"
import Home from "./Containers/Home"
import Recipe from "./Containers/Recipe"
import reducers from "./reducers"
import { BrowserRouter, useRoutes } from "react-router-dom"

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

const RouteComponent = () => {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/recipe/:id",
      element: <Recipe />,
    },
  ])
}

const WrappedHome = () => (
  <Provider store={store}>
    <BrowserRouter>
      <RouteComponent />
    </BrowserRouter>
  </Provider>
)

const HotHome = hot(module)(WrappedHome)

ReactDOM.render(<HotHome />, document.getElementById("home"))
