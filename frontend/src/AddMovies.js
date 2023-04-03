import { Form, Button, Row } from "react-bootstrap";
import { useRef } from "react";

const AddMovies = ({trigger,setTrigger}) => {

  const inputRef = useRef(null);

  const handlePost = (e) => {
    let movieTitle = inputRef.current.firstElementChild.value;
    inputRef.current.firstElementChild.value = '';
    if(movieTitle){
      e.preventDefault();
      fetch('http://localhost:5000/movies', {
        method: "POST",
        body: JSON.stringify({
          title: movieTitle, 
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
  }

  const handleKeyDown = (e) => {
    if(e.key === 'Enter' && inputRef.current.firstElementChild.value){
      e.preventDefault();
      handlePost(e);
    }
  }

  return ( 
    <Row className = 'py-2'>
        <Form className="d-flex" ref={inputRef} onKeyDown={(e) => handleKeyDown(e)} >
          <Form.Control
            type="search"
            placeholder="Add Movie"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="success" onClick={(e) => handlePost(e)}>Add Movie</Button>
        </Form>
    </Row>
   );
}
 
export default AddMovies;