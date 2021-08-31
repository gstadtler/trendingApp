import { useEffect, Component } from "react";
import { render } from "react-dom";
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll,
  scrollSpy,
} from "react-scroll";

const Section = (props) => {
  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    scrollSpy.update();
  }, []);

  // componentWillUnmount() {
  //   Events.scrollEvent.remove("begin");
  //   Events.scrollEvent.remove("end");
  // }

  return (
    <div>
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul className="nav navbar-nav">
              <li></li>
            </ul>
          </div>
        </div>
      </nav>

      <Link
        activeClass="active"
        to="firstInsideContainer"
        spy={true}
        smooth={true}
        duration={250}
        containerId="containerElement"
        style={{ display: "inline-block", margin: "20px" }}
      >
        Go to first element inside container
      </Link>

      <Link
        activeClass="active"
        to="secondInsideContainer"
        spy={true}
        smooth={true}
        duration={250}
        containerId="containerElement"
        style={{ display: "inline-block", margin: "20px" }}
      >
        Go to second element inside container
      </Link>
      <Element
        name="test7"
        className="element"
        id="containerElement"
        style={{
          position: "relative",
          height: "200px",
          overflow: "scroll",
          marginBottom: "100px",
        }}
      >
        test 7 (duration and container)
        <Element
          name="firstInsideContainer"
          style={{
            marginBottom: "200px",
          }}
        >
          first element inside container
        </Element>
        <Element
          name="secondInsideContainer"
          style={{
            marginBottom: "200px",
          }}
        >
          second element inside container
        </Element>
      </Element>

      <Element id="same" className="element">
        Two links point to this
      </Element>

      <a onClick={scrollToTop}>To the top!</a>
    </div>
  );
};

export default Section;
