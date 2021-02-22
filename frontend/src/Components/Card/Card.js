import React from 'react';
import { Card } from "react-bootstrap";

class CardContent extends React.Component {
    render() {
        return (
            <Card className='text-center'>
                {/*<Card.Img variant='top' src={this.props.img} className='overflow'/>*/}
                <Card.Body>
                    <Card.Title >{this.props.title}</Card.Title>
                    <Card.Text className='text-secondary'>
                        {this.props.text}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}
export default CardContent;