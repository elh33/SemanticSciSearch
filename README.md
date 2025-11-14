# SemanticSciSearch

SemanticSciSearch is a semantic search engine designed for scientific articles. This application leverages modern web technologies to provide an efficient and user-friendly interface for searching and retrieving scientific literature.

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

The frontend is built using React.js and TypeScript. It consists of the following key components:

- **SearchBar**: A component for user input to search for articles.
- **SearchResults**: Displays the list of articles returned from the search.
- **ArticleCard**: Represents an individual article in the search results.

The frontend communicates with the backend through API calls defined in the `services/api.ts` file.

### Backend

The backend is built using FastAPI and interacts with Elasticsearch for data storage and retrieval. The key components include:

- **API Routes**: Handles incoming search requests and processes them.
- **Services**: Contains the logic for searching and embedding articles.
- **Models**: Defines the data structure for articles.

## Setup Instructions

### Prerequisites

- Node.js and npm for the frontend
- Python 3.7+ for the backend
- Docker for containerization (optional)

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install the required Python packages:
   ```
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```
   uvicorn app.main:app --reload
   ```

### Running with Docker

To run the application using Docker, you can use the provided `docker-compose.yml` file. This will set up both the frontend and backend services along with Elasticsearch.

1. Run the following command in the root directory:
   ```
   docker-compose up
   ```

## Usage

Once the application is running, you can access the frontend at `http://localhost:3000` and use the search functionality to find scientific articles.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.