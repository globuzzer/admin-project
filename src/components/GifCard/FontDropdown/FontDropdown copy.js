// a select with dynamically created options
const options = [
  "Select an Option",
  "First Option",
  "Second Option",
  "Third Option",
];

class SelectBox2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "Select an Option" };
  }
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    return (
      <div className="form-group">
        <label htmlFor="select2">Select2</label>
        <select
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          className="form-control"
        >
          {options.map((option) => {
            return (
              <option value={option} key={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

const App = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-4 col-sm-push-4">
          <SelectBox1 />
          <SelectBox2 />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));


































const fonts = [
  "Arial",
  "Helvetica",
  "Times",
  "Palatino",
  "Times New Roman",
  "Arial Black",
  "Gadget",
  "Comic Sans MS",
  "cursive",
  "Impact",
  "Charcoal",
  "Tahoma",
  "Geneva",
  "Verdana",
];

class Dropdown extends React.Component {
  render() {
    const { show, value, handleToggle, handleBlur, handleChange } = this.props;

    console.log("show: ", show);

    return (
      <div className="dropdown-container">
        <label className="arrow">
          <input
            type="button"
            value={value}
            className="dropdown-btn"
            style={{ fontFamily: value }}
            onClick={handleToggle}
            onBlur={handleBlur}
          />
        </label>
        <ul className="dropdown-list" hidden={!show}>
          {fonts.map((font) => (
            <li
              className="option"
              style={{ fontFamily: font }}
              onClick={handleChange(font)}
            >
              {font}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Arial",
      show: false,
    };
  }

  handleChange = (font) => () => {
    this.setState({ value: font, show: false });
  };

  handleToggle = (e) => {
    e.target.focus();
    this.setState({ show: !this.state.show });
  };

  handleBlur = (e) => {
    // firefox onBlur issue workaround
    if (
      e.nativeEvent.explicitOriginalTarget &&
      e.nativeEvent.explicitOriginalTarget === e.nativeEvent.originalTarget
    ) {
      return;
    }

    if (this.state.show) {
      setTimeout(() => {
        this.setState({ show: false });
      }, 200);
    }
  };

  render() {
    return (
      <div className="container">
        <h1>React Dropdown (onBlur)</h1>
        <Dropdown
          show={this.state.show}
          value={this.state.value}
          handleToggle={this.handleToggle}
          handleBlur={this.handleBlur}
          handleChange={this.handleChange}
        />
        <article className="article" style={{ fontFamily: this.state.value }}>
          React makes it painless to create interactive UIs. Design simple views
          for each state in your application, and React will efficiently update
          and render just the right components when your data changes.
          <br />
          <br />
          Declarative views make your code more predictable and easier to debug.
          Build encapsulated components that manage their own state, then
          compose them to make complex UIs.
          <br />
          <br />
          Since component logic is written in JavaScript instead of templates,
          you can easily pass rich data through your app and keep state out of
          the DOM. We don’t make assumptions about the rest of your technology
          stack, so you can develop new features in React without rewriting
          existing code.
          <br />
          <br />
          React can also render on the server using Node and power mobile apps
          using React Native. React components implement a render() method that
          takes input data and returns what to display. This example uses an
          XML-like syntax called JSX. Input data that is passed into the
          component can be accessed by render() via this.props.
          <br />
          <br />
          JSX is optional and not required to use React. Try the Babel REPL to
          see the raw JavaScript code produced by the JSX compilation step.
          <br />
          <br />
          In addition to taking input data (accessed via this.props), a
          component can maintain internal state data (accessed via this.state).
          When a component’s state data changes, the rendered markup will be
          updated by re-invoking render().
        </article>
      </div>
    );
  }
}

React.render(<Application />, document.getElementById("app"));
