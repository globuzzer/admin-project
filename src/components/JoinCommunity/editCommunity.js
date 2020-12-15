import { firestore } from "../utils/firebase.utils";
import FeaturedArticlePage from "../components/FeaturedArticle/FeaturedArticlePage";
import { EditContext } from '../contexts/editContext';
import useLocalStorage from '../utils/useLocalStorage';

const Home = ({ contentEditable }) => {
  const [query, setQuery] = useState("");
  const [moreJoinCity, setMoreJoinCity] = useState(false);
  const [joinCity, setJoinCity] = useState([]);
  const [articles, setArticles] = useState([]);
  // const [name, setName] = useLocalStorage('headerOne', 'Bob');

  let headerOne = useRef('');
  let headerTwo = useRef('');
  let city = useRef('');
  const {
    texts, handleForm, handleSubmit,
    handleCancel, details, editMode
  } = useContext(EditContext);

  let [hO, setO] = useState('');
  let [hT, setT] = useState('');
  let [c, setC] = useState('');
  let header_1 = useRef('');
  let header_2 = useRef('');
  let place = useRef('');

  const { texts, handleForm, handleSubmit, handleCancel, details, editMode } = useContext(EditContext);
  const handleChange = (e) => {
    e.target.id.current.innerText = e.target.value
  }


  // edited fields
   let [newHeaderOne, setHeaderOne] = useState(texts[0].textOne.content);
   let [newHeaderTwo, setHeaderTwo] = useState(texts[0].textTwo.content);
   let [newPlace, setPlace] = useState(details.text);

  //tials with local storage
  // let [newHeaderOne, setHeaderOne] = useLocalStorage('newHeaderOne', '');
  // let [newHeaderTwo, setHeaderTwo] = useLocalStorage('newHeaderTwo', '');
  // let [newPlace, setPlace] = useLocalStorage('newPlace',texts.newPlace);

   // console.log(newHeaderOne, newHeaderTwo, newPlace)

  const formStyle = !editMode? {display: "none"} : {};
  const editStyle =
    editMode ? {
    border: "2px solid #F26678",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "8px" } : {};
    padding: "8px"
    } : {};


  useEffect(() => {const Home = ({ contentEditable }) => {
        // console.log(newCity);
      });
  }, []);
// const gogu = firestore.collection("cities").doc();
// console.log("firestore:", gogu)
// console.log(joinCity)

  const one = `Globuzzer is a global network that provides the full relocating experience.
Find topics, join communities, attend events, book flights, and much more. `;
@@ -68,35 +90,47 @@ Everything from visa requirements and local documentation to valuable tips.`;
  const three = `We are locals. We are expats.
We are travelers. We are students.
Most importantly, we have been in the same spot, and we can support you. `;

  return (
    <div className="home-page">

  {/*Start form for headers edit on the banner*/}

    <div className={edit.title} style={formStyle}>
    <div className={edit.arrowDown}></div>
    <p>14</p>
    <p>B</p>
    <input type="color" />
    <img src="/images/sizer.png" alt="" />
    </div>
    
    {/*Start forms for city edit on the banner*/}
    <div className={edit.place} style={formStyle}>
      <p className={edit.head}>Place</p>
      <hr color="#E4E4E4" />
      <form className={edit.form} onSubmit={handleSubmit}>
      <div className={edit.formContainer}>
        <form className={edit.form} onSubmit={handleSubmit}>
          <label htmlFor="color">Color</label>
          <input type="text"
                 value={details.color}
                 id="color"
                 onChange={handleForm}
                 style={{marginLeft: "20px"}}
          />
          <label htmlFor="text">Text</label>
          <input type="text"
                 value={details.text}
                 id="text"
                 onChange={handleForm}
                 style={{marginLeft: "20px"}}
          />
          <label htmlFor="link">Link</label>
          <p className={details.place}>{newPlace}</p>
          <p></p>
          <input type="text"
                 value={details.link}
                 id="link"
                 onChange={handleForm}
                 style={{position:"relative", left:"-45px", width:"120%"}}
          />
      </form>
        </form>
      </div>
      <div className={edit.command}>
      <p id="apply" onClick={handleSubmit}>Apply</p>
      <p id="cancel" onClick={handleCancel}>Cancel</p>
@@ -108,36 +142,36 @@ Most importantly, we have been in the same spot, and we can support you. `;
          <p id="header_1"
             contentEditable={contentEditable}
             suppressContentEditableWarning="true"
             ref={headerOne}
             onChange={(e) => headerOne.current.innerText = e.target.value}
             onBlur={() => setO(headerOne.current.innerText)}
             ref={header_1}
             onChange={handleChange}
             onBlur={() => setHeaderOne(header_1.current.innerText)}
          >
             {texts.textOne}
             {texts[0].textOne.content}
          </p>
          <p id="header_2"
             contentEditable={contentEditable}
             suppressContentEditableWarning="true"
             ref={headerTwo}
             onChange={(e) => headerTwo.current.innerText = e.target.value}
             onBlur={() => setT(headerTwo.current.innerText)}
             ref={header_2}
             onChange={handleChange}
             onBlur={() => setHeaderTwo(header_2.current.innerText)}
          >
             {texts.textTwo}
             {texts[0].textTwo.content}
          </p>
        </div>
          <SearchCity />
          <p id="header_suggestion">
            Maybe{" "}
            <a href="https://globuzzer.mn.co/groups/195831/feed"
            <a href={details.link}
               contentEditable={contentEditable}
               suppressContentEditableWarning="true"
               style={editStyle}
               id="town"
               ref={city}
               onChange={(e) => city.current.innerText = e.target.value}
               onBlur={() => setC(city.current.innerText)}
               style={{ ...editStyle, color: details.color }}
               id="place"
               ref={place}
               onChange={handleChange}
               onBlur={() => setPlace(place.current.innerText)}
            >
               {texts.newPlace}
            </a>,
               {details.text}
            </a>,{" "}
            <Link to="/section">Helsinki</Link> or{" "}
            <a href="https://globuzzer.mn.co/groups/195834/feed">Paris</a>?
          </p>