import AppComponent from './App.svelte';
import { RequestContentTypes, RequestCredentials, RequestMethods, RequestModes } from './enum';

if (localStorage.getItem("initialized") == null
  && localStorage.getItem("requests") == null) {
    localStorage.setItem("requests", JSON.stringify([
      {
        name: "Get Users (Aufgabe)",
        url: "http://localhost:4269/api/users",
        routeParam: {},
        queryParam: {},
        bodyParam: {},
        method: RequestMethods.GET,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.OMIT,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "CORS Blocked",
        url: "https://bosch.de/",
        routeParam: {
          amet: ""
        },
        queryParam: {
          dolor: "sit"
        },
        bodyParam: {
          lorem: "ipsum"
        },
        method: RequestMethods.POST,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Opaque Response",
        url: "https://bosch.de/",
        routeParam: {},
        queryParam: {},
        bodyParam: {},
        method: RequestMethods.GET,
        mode: RequestModes.NO_CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Get All Posts",
        url: "https://jsonplaceholder.typicode.com/posts",
        routeParam: {},
        queryParam: {},
        bodyParam: {},
        method: RequestMethods.GET,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Get One Post (Route Param)",
        url: "https://jsonplaceholder.typicode.com/posts/[:id]",
        routeParam: {
          id: 1
        },
        queryParam: {},
        bodyParam: {},
        method: RequestMethods.GET,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Get All Comments (Query Param)",
        url: "https://jsonplaceholder.typicode.com/comments",
        routeParam: {},
        queryParam: {
          postId: 1
        },
        bodyParam: {},
        method: RequestMethods.GET,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Create New Post",
        url: "https://jsonplaceholder.typicode.com/comments",
        routeParam: {},
        queryParam: {},
        bodyParam: {
          title: "Title",
          body: "Lorem ipsum dolor sit Amet.",
          userId: 1,
        },
        method: RequestMethods.POST,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Updating Post",
        url: "https://jsonplaceholder.typicode.com/posts/[:id]",
        routeParam: {
          id: 1
        },
        queryParam: {},
        bodyParam: {
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        method: RequestMethods.PUT,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Updating Post (single field)",
        url: "https://jsonplaceholder.typicode.com/posts/[:id]",
        routeParam: {
          id: 1
        },
        queryParam: {},
        bodyParam: {
          title: 'foo',
        },
        method: RequestMethods.PATCH,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
      {
        name: "Deleting Post",
        url: "https://jsonplaceholder.typicode.com/comments/[:id]",
        routeParam: {
          id: 1
        },
        queryParam: {},
        bodyParam: {},
        method: RequestMethods.DELETE,
        mode: RequestModes.CORS,
        credentials: RequestCredentials.INCLUDE,
        contentType: RequestContentTypes.JSON
      },
    ] as App.Request[], null, 4));
    localStorage.setItem("initialized", "Delete me and `requests` to restore default requests.")
}

const app = new AppComponent({
  target: document.getElementById('app')
})

export default app
