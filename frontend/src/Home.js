import { useEffect, useState, useRef } from "react";
import {Container, Row, Col } from "react-bootstrap"
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap"
import MovieList from "./MovieList";
import AddMovies from "./AddMovies";

const Home = () => {
  const [movieData,setMovieData] = useState(null);
  const [filter,setFilter] = useState({"query":null,"watched":null})
  const [trigger,setTrigger] = useState(0)
  const searchRef = useRef(null);
  const [selectedMovie,setSelectedMovie] = useState(null)

  const handleSearch = () => {
    let query = searchRef.current.firstElementChild.value;
    setFilter({
      ...filter,
      query: query,
    })
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Backspace' && (searchRef.current.firstElementChild.value.length===1 || searchRef.current.firstElementChild.value.length===0)){
      setFilter({
        ...filter,
        query: null,
      })
    }
    if(e.key === 'Enter'){
      e.preventDefault();
      handleSearch();
    }
  }

  useEffect(() => {
    const controller = new AbortController()

    fetch('http://localhost:5000/movies', {
        signal: controller.signal,
    })
        .then(res => res.json())
        .then(data => {
          let newData = data.sort((a, b) => {
            return a.id - b.id;
        });
          setMovieData(newData)}
          )
        .catch(error => {
            if (error.name !== 'AbortError') {
                console.error(error.message)
            }
        })

    return () => controller.abort()
}, [trigger])

  return ( 
    <Container className='py-2'>
      <Row>
        <Col lg={6} md={6} sm={6}>
          <Form className="d-flex" ref={searchRef} onKeyDown={(e)=>handleKeyDown(e)} >
            <Form.Control 
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-dark" onClick={()=>handleSearch()}>Search</Button>
          </Form>
          <AddMovies trigger={trigger} setTrigger={setTrigger}/>
        </Col>
      </Row>
      {movieData && <MovieList movieData={movieData} selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} filter={filter} setFilter={setFilter} trigger={trigger} setTrigger={setTrigger}/>}
      
      
    </Container>
  );
}
 
export default Home;