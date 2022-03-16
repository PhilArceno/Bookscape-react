import { useState } from "react";

const SearchAPIBook = ({ searchText }) => {
  const [text, setText] = useState("");
  const [showValidTextModal, setShowValidTextModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text === "" || !text.trim()) {
      setShowValidTextModal(true);
      return;
    }
    searchText(text);
  };

  const onChangevalue = (e) => {
    e.preventDefault();
    setText(e.target.value);
    searchText(e.target.value);
    if (e.target.value === "") {
      setText("Elmo");
      searchText("Elmo");
    }
  };

  return (
    <div>
      <br />
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search Spiderman, Batman etc.."
          onChange={onChangevalue}
          style={{
            float: "left",
            width: "80%",
            padding: "10px",
            color: "black",
            border: "1px solid grey",
            background: "#f1f1f1"
          }}
        />
        <button
          style={{
            float: "left",
            width: "20%",
            padding: "10px",
            background: "#2196F3",
            color: "black",
            border: "1px solid grey",
            cursor: "pointer",
          }}
          type="submit"
        >
          Search
        </button>
      </form>
      <div
        id="popup1"
        class={showValidTextModal ? "overlay modal-active" : "overlay"}
      >
        <div class="popup">
          <div class="close" onClick={() => setShowValidTextModal(false)}>
            &times;
          </div>
          <h3 class="content">Please Enter the valid text</h3>
        </div>
      </div>
    </div>
  );
};

export default SearchAPIBook;