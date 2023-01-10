import "bootstrap/dist/css/bootstrap.min.css";
import {
    Container,
    InputGroup,
    FormControl,
    Button,
    Row,
    Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

import "../App.css";

const CLIENT_ID = "992fe6a21db045fe87842d5c44ba748d";
const CLIENT_SECRET = "e46d84a50b374429a75c6ccaaae53c91";

function Search() {
    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        // API Access Token
        var authParameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "grant_type=client_credentials&client_id=" +
                CLIENT_ID +
                "&client_secret=" +
                CLIENT_SECRET,
        };
        fetch("https://accounts.spotify.com/api/token", authParameters)
            .then((result) => result.json())
            .then((data) => setAccessToken(data.access_token));
    }, []);

    // Search

    async function search() {
        console.log("Search for " + searchInput); // Taylor Swift

        //Get request using search to get Artist ID
        var searchParameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + accessToken,
            },
        };
        var artistID = await fetch(
            "https://api.spotify.com/v1/search?q=" +
                searchInput +
                "&type=artist",
            searchParameters
        )
            .then((response) => response.json())
            .then((data) => {
                return data.artists.items[0].id;
            });

        console.log("Artist ID is " + artistID);
        // Get request with Artist ID grab all albums

        var albums = await fetch(
            "https://api.spotify.com/v1/artists/" +
                artistID +
                "/albums" +
                "?include_groups=album&market=US&limit=50",
            searchParameters
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setAlbums(data.items);
            });

        // display those albums to the user
    }
    console.log(albums);

    return (
        <div className="App">
            <Header></Header>
            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search For Artist"
                        type="input"
                        onKeyPress={(event) => {
                            if (event.key == "Enter") {
                                search();
                            }
                        }}
                        onChange={(event) => setSearchInput(event.target.value)}
                    />
                    <Button onClick={search}>Search</Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-4">
                    {albums.map((album, i) => {
                        console.log(album);
                        return (
                            <Card style={{backgroundColor: "rgba(238, 130, 238, 0.2)"}}>
                                <Card.Img src={album.images[0].url} />
                                <Card.Body>
                                    <Card.Title>{album.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
                <Footer></Footer>
            </Container>
        </div>
    );
}

export default Search;
