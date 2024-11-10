import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "./bookSlice";
import logo from "./img/Book.svg";
import Searchform from "./searchform";
import Footer from "./footer";
import Book from "./book";
import LoadingCard from "./loadingCard";

const BookDetails = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.books.items);
  const status = useSelector((state) => state.books.status);
  const [term, setTerm] = useState("Goosebumps");
  const [visibleItems, setVisibleItems] = useState(10); // Initial number of items to show

  useEffect(() => {
    dispatch(fetchBooks(term));
    setVisibleItems(10); // Reset to initial items when search term changes
  }, [term, dispatch]);

  const loadMoreItems = () => {
    setVisibleItems((prev) => prev + 10); // Load 10 more items
  };

  return (
    <>
      <h2 style={{ textTransform: "capitalize", color: "#DB4437", fontSize: 40, marginTop: -40 }}>
        {term}
      </h2>
      <Searchform searchText={(text) => setTerm(text)} />
      {status === "loading" ? (
        <section className="container" style={{ padding: "2rem 0rem" }}>
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </section>
      ) : !details.length ? (
        <h1 className="loading-name" style={{
          background: "white", borderRadius: "1rem", color: "#DB4437",
          padding: "1rem", position: "absolute", top: "50%", left: "50%",
          fontSize: 33, transform: "translate(-50%,-50%)", textTransform: "capitalize"
        }}>
          😞 Couldn't find books about {term}
        </h1>
      ) : (
        <section>
          <section className="container" style={{ padding: "2rem 0rem" }}>
            {details.slice(0, visibleItems).map((book, index) => (
              <Book
                title={book.title}
                author_name={book.author_name}
                cover_i={book.cover_i}
                work_id={book.key}
                key={index}
              />
            ))}
            {visibleItems < details.length && (
              <button onClick={loadMoreItems} style={{ padding: "10px 20px", marginTop: "20px", fontSize: "16px" }}>
                Load More
              </button>
            )}
            <div className="custom-card">
              <h3 style={{ fontSize: "1.32rem", color: "white" }}>
                Didn't find the book you love?
              </h3>
              <br />
              <img style={{ width: "100%" }} src={logo} alt="A man reading a book" />
              <h3 style={{ fontSize: "1.21rem", color: "white" }}>
                Search for your favourite <span style={{ fontWeight: "bold", color: "black" }}>Genre</span> or <span style={{ fontWeight: "bold", color: "black" }}>Author</span> in the search box!!
              </h3>
            </div>
          </section>
          <Footer />
        </section>
      )}
    </>
  );
};

export default BookDetails;
