import React from "react";
import { Row, Container } from "react-bootstrap";
import {FaHeart} from "react-icons/all";

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <hr className="mb-4" />
                <Container>
                    <Row>
                      <div className="credits ml-auto">
                        <span className="copyright">
                          © {new Date().getFullYear()}, made with{" "}
                          <FaHeart /> by Michał Stelwach
                        </span>
                      </div>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;
