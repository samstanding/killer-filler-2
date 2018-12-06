import React, { Component, Fragment } from "react";
import {
  Dropdown,
  Header,
  Container,
  Form,
  Radio,
  Divider,
  Grid,
  Button
} from "semantic-ui-react";
import { KillerFiller } from "killer-filler";

const heroOptions = [
  {
    text: "Rogue",
    value: "rogue",
    key: 0,
    image: { avatar: true, src: "/images/avatars/rogue.png" }
  },
  {
    text: "Spider Man",
    value: "spider-man",
    key: 1,
    image: { avatar: true, src: "/images/avatars/spiderman.png" }
  },
  {
    text: "Captain America",
    value: "captain-america",
    key: 2,
    image: { avatar: true, src: "/images/avatars/cap.png" }
  },
  {
    text: "Gamora",
    value: "gamora",
    key: 3,
    image: { avatar: true, src: "./images/avatars/gamora.png" }
  },
  {
    text: "Wolverine",
    value: "wolverine",
    key: 4,
    image: { avatar: true, src: "./images/avatars/wolverine.png" }
  },
  {
    text: "Black Widow",
    value: "black-widow",
    key: 5,
    image: { avatar: true, src: "./images/avatars/black widow.png" }
  },
  {
    text: "Hulk",
    value: "hulk",
    key: 6,
    image: { avatar: true, src: "./images/avatars/hulk.png" }
  },
  {
    text: "Iron Man",
    value: "iron-man",
    key: 7,
    image: { avatar: true, src: "./images/avatars/iron-man.png" }
  },
  {
    text: "Scarlet Witch",
    value: "scarlet-witch",
    key: 8,
    image: { avatar: true, src: "./images/avatars/scarlet-witch.png" }
  },
  {
    text: "Thor",
    value: "thor",
    key: 9,
    image: { avatar: true, src: "./images/avatars/thor.png" }
  }
];

class App extends Component {
  state = {
    selectedHero: null,
    contentType: null,
    fillerText: null,
    amount: null
  };

  handleChangeFor = propertyName => (event, data) => {
    this.setState(
      prevState => ({ ...prevState, [propertyName]: data.value }),
      () => console.log(this.state)
    );
  };

  handleCheck = (e, { value }) => this.setState({ contentType: value });

  onGenerate = () => {
    console.log(this.state);
    const { selectedHero, contentType, amount } = this.state;
    const newFiller = new KillerFiller(
      selectedHero,
      { min: 4, max: 15 },
      { min: 4, max: 15 }
    );

    let ipsumLorem;

    if (contentType === "words") {
      ipsumLorem = newFiller.generateWords(amount);
    } else if (contentType === "sentences") {
      ipsumLorem = newFiller.generateSentences(amount);
    } else if (contentType === "paragraphs") {
      ipsumLorem = newFiller.generateParagraphs(amount);
    }

    this.setState(
      {
        fillerText: ipsumLorem
      },
      () => console.log(this.state.fillerText)
    );
  };

  render() {
    const { fillerText, contentType } = this.state;

    return (
      <Fragment>
        <Container
          text
          style={{
            backgroundColor: "#22262a",
            margin: "50px",
            padding: "25px"
          }}
        >
          <Header
            as="h1"
            textAlign="center"
            content="Killer Filler!!!"
            inverted
          />
          <Dropdown
            fluid
            placeholder="Choose a hero"
            selection
            options={heroOptions}
            onChange={this.handleChangeFor("selectedHero")}
          />
          <Divider hidden />

          <Form inverted>
            <Form.Group inline>
              <Form.Radio
                label="Words"
                name="contentType"
                value="words"
                checked={this.state.contentType === "words"}
                onChange={this.handleCheck}
              />

              <Form.Radio
                label="Sentences"
                name="contentType"
                value="sentences"
                checked={this.state.contentType === "sentences"}
                onChange={this.handleCheck}
              />
              <Form.Radio
                label="Paragraphs"
                name="contentType"
                value="paragraphs"
                checked={this.state.contentType === "paragraphs"}
                onChange={this.handleCheck}
              />
              {contentType && (
                <Form.Input
                  onChange={this.handleChangeFor("amount")}
                  inverted
                  placeholder={`# of ${this.state.contentType}`}
                />
              )}
            </Form.Group>
          </Form>
          <Divider hidden />
          <Button fluid inverted onClick={this.onGenerate}>
            Go!
          </Button>
          <Divider hidden />
          {fillerText &&
          contentType === "paragraphs" &&
          Array.isArray(fillerText) ? (
            fillerText.map(paragraph => (
              <Fragment>
                <p
                  style={{ color: "#fff" }}
                  key={fillerText.indexOf(paragraph)}
                >
                  {paragraph}{" "}
                </p>{" "}
                <Divider inverted />{" "}
              </Fragment>
            ))
          ) : (
            <p style={{ color: "#fff" }}>{fillerText}</p>
          )}
        </Container>
      </Fragment>
    );
  }
}

export default App;
