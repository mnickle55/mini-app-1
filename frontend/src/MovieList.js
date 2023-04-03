import {Row, Col, ListGroup, Button, ButtonGroup } from "react-bootstrap";

const MovieList = ({filter,setFilter,movieData,trigger,setTrigger}) => {

  const handleDelete = (e) => {
    let id = e.target.getAttribute('db-key');
    fetch(`http://localhost:5000/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(res=> {
      let newCount = trigger+1;
      setTrigger(newCount)
      return res}
      )
    .catch(err=>console.log(err))
    }

  const handleWatched = (e,watched) => {
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
      .then(res=> {
        let newCount = trigger+1;
        setTrigger(newCount)
        return res}
        )
      .catch(err=>console.log(err))

  }

  const handleFilterWatched = (bool) => {
    if(filter.watched===bool){
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

  let filteredMovies = movieData;

  if(filter.query){
    filteredMovies = filteredMovies.filter(movie=>movie.title.toLowerCase().includes(filter.query.toLowerCase()))
  }

  if(filter.watched !== null){
    filteredMovies = filteredMovies.filter(movie=>movie.watched === filter.watched)
  }

  return ( 
    <Row className='py-2'>
      <Row>
        <Col>
          <h1>Movie List</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ButtonGroup aria-label="Basic example">
            {filter.watched === true &&
            <>
              <Button onClick={()=>handleFilterWatched(true)} variant="primary"> Show Watched</Button>
              <Button onClick={()=>handleFilterWatched(false)} variant="secondary"> Show Unwatched</Button>
            </>}
            {filter.watched === false &&
            <>
              <Button onClick={()=>handleFilterWatched(true)} variant="secondary"> Show Watched</Button>
              <Button onClick={()=>handleFilterWatched(false)} variant="primary"> Show Unwatched</Button>
            </>}
            {filter.watched === null &&
            <>
              <Button onClick={()=>handleFilterWatched(true)} variant="secondary"> Show Watched</Button>
              <Button onClick={()=>handleFilterWatched(false)} variant="secondary"> Show Unwatched</Button>
            </>}
          </ButtonGroup>
        </Col>
      </Row>

      {(filter.query || filter.watched !== null ) && 
      <Col lg={6} md={6} sm={6}>
        <ListGroup >
        {filteredMovies.map((movie) => 
              <Row key={movie.id}>
                <Col>
                  <ListGroup.Item >{movie.title}</ListGroup.Item>
                </Col>
                <Col>
                  <Button db-key={movie.id} onClick={(e)=>handleDelete(e)}variant="danger">Delete</Button>
                </Col>
                <Col>
                { movie.watched ? <Button db-key={movie.id} onClick={(e)=>handleWatched(e,movie.watched)} variant="warning">Mark Not Watched</Button> :  <Button db-key={movie.id} onClick={(e)=>handleWatched(e,movie.watched)} variant="primary">Mark Watched</Button>}
                </Col>
              </Row>
          )}
        </ListGroup>
      </Col> }

      {filteredMovies === movieData && 
      <Col lg={6} md={6} sm={6}>
        <ListGroup>
          {movieData.map((movie)=>
          <Row key={movie.id}>
            <Col>
              <ListGroup.Item >{movie.title}</ListGroup.Item>
            </Col>
            <Col>
              <Button db-key={movie.id} onClick={(e)=>handleDelete(e)}variant="danger">Delete</Button>
            </Col>
            <Col>
            { movie.watched ? <Button db-key={movie.id} onClick={(e)=>handleWatched(e,movie.watched)} variant="warning">Mark Not Watched</Button> :  <Button db-key={movie.id} onClick={(e)=>handleWatched(e,movie.watched)} variant="primary">Mark Watched</Button>}
            </Col>
          </Row>
          )}
        </ListGroup> 
      </Col> }
      </Row>
   );
}
 
export default MovieList;