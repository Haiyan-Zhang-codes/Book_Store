import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete a book</h1>
      {loading ? (
        Spinner
      ) : (
        <div className="flex flex-col align-center border-2 border-sky-400 rounded-lg w-[600px] p-4 mx-auto">
          <h4 className="m-4 text-center">
            Are You Sure You want to delete this book
          </h4>
          <button className="p-2 m-8 bg-red-500 mx-8" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteBook;
