import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import CardColumns from "react-bootstrap/CardColumns";
import Card from 'react-bootstrap/Card';
import Spinner from "react-bootstrap/Spinner";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_RESULT_LIST } from "../utils/actions";
import API from "../utils/API"; 
import { Link } from "react-router-dom";
import "./assets/result.css";




const Results = () => {
    const [state, dispatch] = useStoreContext();


    useEffect(() => {
        getResults(state.searchTerm);
    }, []);


    const getResults = (search) => {

        API.searchProductWalmart(search)
        .then(res =>{ 
            console.log("HELLO",res.data.totalResults);
            if(res.data.totalResults !== 0 && res.data.totalResults){
                console.log("GOODBYE",res)
                dispatch({ type: UPDATE_RESULT_LIST, productList: res.data.items})
            } else {
                dispatch({type: UPDATE_RESULT_LIST, productList: []});
            }
        })
        .catch(err => console.log(err));
      
    };


    // const trackProduct = () => {
    //     dispatch({ type: TRACK_PRODUCT, trackedList: state.currentProduct });
    // };


    return (
        <div id="background">
        <Container id="search-result-container" >

            <div>
            <a id="S3">S</a><a id="search-result-text">earch</a>
            <a id="S3">R</a> <a id="search-result-text">esults</a>
            </div>
            {state.loading ? (<Spinner animation="border" />):
                (
                    <Col className="md-4">
                        {!state.productList.length ? (
                            <h1>No products to display</h1>
                        ) : (<Container>
                            <CardColumns>
                                {state.productList.map(product => {
                                    return (
                                        <Card key={product.name} id="result-card" >
                                            <Card.Img id="view-product-image" variant="top" src={product.mediumImage}/>
                                            <Card.Body className="text-center">
                                                <Card.Title>{product.name}</Card.Title>
                                                
                                                <Row>
                                                    <Col>
                                                        <Card.Text id="results-card-text">
                                                            <strong>Price: </strong>
                                                            ${product.salePrice}
                                                        </Card.Text>
                                                    </Col>
                                                    <Col>
                                                        <Card.Text id="results-card-text">
                                                            <strong>Rating: </strong>
                                                            {product.customerRating}/5
                                                        </Card.Text>
                                                    </Col>
                                                </Row>

                                                <Link id="view-product-button" to={"/product/" + product.itemId + "/" + product.upc}>
                                                    <i id="results-view-product-logo" className="fas fa-seedling"></i> 
                                                     View Product
                                                </Link>
                                                {/* <Button variant="success" onClick={trackProduct}>Track Product</Button> */}
                                            </Card.Body>
                                        </Card>
                                    );
                                })}
                            </CardColumns>
                        </Container>
                            )}
                    </Col>
                )
            }
        </Container>

        </div>
    )
}



export default Results;