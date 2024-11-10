import React from "react";
import { BiLinkExternal } from "react-icons/bi";
import defaultBook from "./img/defaultBook.png";
import "../src/sass/style.css";
import { motion } from "framer-motion";

const Book = ({ title, author_name, publisher, cover_i, work_id}) => {
  // Set default values for missing data
  title = title || "Title is not available";
  const authors = author_name ? author_name.join(", ") : "Author(s) not available";
  const publisherText = publisher ? publisher[0] : "Publisher not available";
  const coverURL = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : defaultBook;
  

  return (
    <section className="loading-card">
      <div>
        <motion.img
          src={coverURL}
          width="100px"
          alt="Book-cover"
          whileHover={{ scale: 1.7, boxShadow: "0px 0px 8px #000" }}
        />
        <div>
          <h3 className="inline">{title}</h3>
        </div>
        <div>
          <h4 style={{ paddingBottom: "1rem", color: "black" }}>
            Author: <span style={{ fontWeight: "bold", color: "#3B3B3B" }}>{authors}</span>
          </h4>
        </div>
        <div>
          <h5 style={{ paddingBottom: "1rem", color: "black" }}>
            Published by: <span style={{ fontWeight: "bold", color: "#3B3B3B" }}>{publisherText}</span>
          </h5>
        </div>
        <div>
          <h5
            style={{
              fontWeight: "bold",
              color: "black",
              paddingBottom: "1rem",
            }}
          >
            Read more on Open Library :{" "}
            <a href={`https://openlibrary.org/${work_id}/${title}`} target="_blank" rel="noreferrer">
              Open Library <BiLinkExternal />
            </a>
          </h5>
        </div>
      </div>
    </section>
  );
};

export default Book;


