import React, { useState, useEffect } from "react";

import "./style.css";

const getLocalData = () => {
  const List = localStorage.getItem("mytodolist");
  if (List) {
    return JSON.parse(List);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setinputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [isEditItem, setEditItem] = useState("");
  const [toggleButton, settoggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("please add the items");
    } else if (inputData && toggleButton) {
      setItems(
        items.map((currElem) => {
          if (currElem.id == isEditItem) {
            return { ...currElem, name: inputData };
          }
          return currElem;
        })
      );
      setinputData("");
      setEditItem(null);
      settoggleButton(false);
    } else {
      const mynewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, mynewInputData]);
      setinputData("");
    }
  };

  // editItem section

  const editItem = (index) => {
    const item_todo_edited = items.find((currElem) => {
      return currElem.id == index;
    });
    setinputData(item_todo_edited.name);
    setEditItem(index);
    settoggleButton(true);
  };

  // how to delete your item
  const delelteItem = (index) => {
    const updatedItems = items.filter((currElem) => {
      return currElem.id !== index;
    });
    setItems(updatedItems);
  };

  // Remove ALL data function
  const removeAll = () => {
    setItems([]);
  };
  // adding to localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="" alt="" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setinputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          {/* {show your items} */}
          <div className="showItems">
            {items.map((currElem) => {
              return (
                <div className="eachItem" key={currElem.id}>
                  <h3>{currElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit  add-btn"
                      onClick={() => editItem(currElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => delelteItem(currElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          {/* {remove all Item} */}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
