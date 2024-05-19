# Web Titles Server

This is a Node.js server that responds to a single route: `GET /I/want/title`. This route expects a list of website addresses in query string format and returns the titles of these websites in HTML format.

## Setup

1. Ensure you have Node.js and npm installed. Download and install them from [nodejs.org](https://nodejs.org/).

2. Clone this repository and navigate into the project directory:

    ```bash
    git clone <repository_url>
    cd web-titles-server
    ```

3. Install the necessary packages:

    ```bash
    npm install axios jsdom async rxjs
    ```

## Running the Server

### Plain Node.js Callbacks

1. Create a file `server_callbacks.js` and add the provided code.
2. Run the server:

    ```bash
    node server_callbacks.js
    ```

### Using `async.js`

1. Create a file `server_async.js` and add the provided code.
2. Run the server:

    ```bash
    node server_async.js
    ```

### Using Promises with `axios`

1. Create a file `server_promises.js` and add the provided code.
2. Run the server:

    ```bash
    node server_promises.js
    ```

### Using RxJs Streams

1. Create a file `server_rxjs.js` and add the provided code.
2. Run the server:

    ```bash
    node server_rxjs.js
    ```

## Testing the Server

You can test the server by visiting the appropriate URL in your browser or using a tool like `curl` or Postman. For example:

```bash
curl "http://localhost:3000/I/want/title?address=google.com&address=http://yahoo.com"
