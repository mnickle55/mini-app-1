import { Row, Col, Container, Button, ButtonGroup, Card } from "react-bootstrap";

const MovieList = ({ filter, setFilter, movieData, trigger, setTrigger, selectedMovie,setSelectedMovie }) => {

  const handleDelete = (e) => {
    e.stopPropagation()
    let id = e.target.getAttribute('db-key');
    fetch(`http://localhost:5000/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        let newCount = trigger + 1;
        setTrigger(newCount)
        return res
      }
      )
      .catch(err => console.log(err))
  }

  const handleWatched = (e, watched) => {
    e.stopPropagation()
    let id = e.target.getAttribute('db-key');
    fetch(`http://localhost:5000/movies/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        watched: watched,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then(res => {
        let newCount = trigger + 1;
        setTrigger(newCount)
        return res
      }
      )
      .catch(err => console.log(err))

  }

  const handleFilterWatched = (bool) => {
    if (filter.watched === bool) {
      setFilter({
        ...filter,
        watched: null,
      })
    } else {
      setFilter({
        ...filter,
        watched: bool,
      })
    }
  }

  const handleSelect = (id) =>{
    if(id === selectedMovie){
      setSelectedMovie(null)
    } else {
      setSelectedMovie(id)
    }
  }

  let filteredMovies = movieData;

  if (filter.query) {
    filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(filter.query.toLowerCase()))
  }

  if (filter.watched !== null) {
    filteredMovies = filteredMovies.filter(movie => movie.watched === filter.watched)
  }

  return (
    <Container className='py-2'>
      <Row>
        <Col>
          <h1>My Movie List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup aria-label="Basic example">
            {filter.watched === true &&
              <>
                <Button onClick={() => handleFilterWatched(true)} variant="primary"> Show Watched</Button>
                <Button onClick={() => handleFilterWatched(false)} variant="secondary"> Show Unwatched</Button>
              </>}
            {filter.watched === false &&
              <>
                <Button onClick={() => handleFilterWatched(true)} variant="secondary"> Show Watched</Button>
                <Button onClick={() => handleFilterWatched(false)} variant="primary"> Show Unwatched</Button>
              </>}
            {filter.watched === null &&
              <>
                <Button onClick={() => handleFilterWatched(true)} variant="secondary"> Show Watched</Button>
                <Button onClick={() => handleFilterWatched(false)} variant="secondary"> Show Unwatched</Button>
              </>}
          </ButtonGroup>
        </Col>
      </Row>
      <Row className='px-2'>
        {(filter.query || filter.watched !== null) &&
          <Row>
            {filteredMovies.map((movie) =>
            <Row className='py-2'>
                <Card onClick={()=>handleSelect(movie.id)}>
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    {movie.id === selectedMovie && 
                        <Card.Text>
                          {movie.description}
                        </Card.Text>}
                    <Button db-key={movie.id} onClick={(e) => handleDelete(e)} variant="danger">Delete</Button>
                    {movie.watched ? <Button db-key={movie.id} onClick={(e) => handleWatched(e, movie.watched)} variant="warning">Mark Not Watched</Button> : <Button db-key={movie.id} onClick={(e) => handleWatched(e, movie.watched)} variant="primary">Mark Watched</Button>}
                  </Card.Body>
                </Card>
              </Row>
            )}
          </Row>}
        {filteredMovies === movieData &&
          <Row>
            {movieData.map((movie) =>
              <Row className='py-2'>
                <Card onClick={()=>handleSelect(movie.id)}>
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    {movie.id === selectedMovie && 
                        <Card.Text>
                          {movie.description}
                        </Card.Text>}
                    <Button db-key={movie.id} onClick={(e) => handleDelete(e)} variant="danger">Delete</Button>
                    {movie.watched ? <Button db-key={movie.id} onClick={(e) => handleWatched(e, movie.watched)} variant="warning">Mark Not Watched</Button> : <Button db-key={movie.id} onClick={(e) => handleWatched(e, movie.watched)} variant="primary">Mark Watched</Button>}
                  </Card.Body>
                </Card>
              </Row>
            )}
          </Row>
        }
      </Row>
    </Container>
  );
}

export default MovieList;