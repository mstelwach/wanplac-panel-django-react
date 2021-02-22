import React from 'react';
import {CardDeck, Container, Jumbotron, Button} from "react-bootstrap";
import CardContent from "../Card/Card";
import images from "../../assets/images";
import strings from "../../assets/strings";
import Footer from "../Footer/Footer";


class Home extends React.Component {
    render() {
        const cards = strings.card
        return (
            <>
                <Jumbotron className='text-center'>
                    <Container>
                        <h1 className='jumbotron-heading'>WanPlac Rezerwacja</h1>
                        <p className='lead text-muted'>
                            WanPlac Rezerwacja to panel, dzięki któremu zabukowanie kajaku stanie się łatwiejsze i szybsze.
                        </p>
                        <Button variant='outline-primary' href='#' size='lg' color='default'>
                            Zarejestruj się już dziś!
                        </Button>
                    </Container>
                </Jumbotron>
                <Container>
                    <CardDeck>
                        <CardContent
                            img={images.form}
                            title={cards.form.title}
                            text={cards.form.text}
                        />
                        <CardContent
                            img={images.payu}
                            title={cards.payu.title}
                            text={cards.payu.text}
                        />

                    </CardDeck>
                    <br />
                    <CardDeck>
                        <CardContent
                            img={images.email}
                            title={cards.email.title}
                            text={cards.email.text}
                        />
                        <CardContent
                            img={images.questions}
                            title={cards.questions.title}
                            text={cards.questions.text}
                        />
                    </CardDeck>
                    <br />
                    <CardDeck>
                        <CardContent
                            img={images.list}
                            title={cards.list.title}
                            text={cards.list.text}
                        />
                        <CardContent
                            img={images.kayaks}
                            title={cards.kayaks.title}
                            text={cards.kayaks.text}
                        />

                    </CardDeck>
                </Container>
                <Footer
                />
            </>
        )
    }
}

export default Home