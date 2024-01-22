// CommentSection.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

// CommentSection.jsx
// ... (imports and constants)

const CommentSection = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    // Fetch comments for the specific user
    axios
      .get(`${API_URL}/api/comments?userId=${userId}`)
      .then((response) => {
        const fetchedComments = response.data || [];
        setComments(fetchedComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [userId]);

  const handleCommentSubmit = () => {
    if (editingCommentId) {
      // Editing existing comment
      axios
        .post(`${API_URL}/api/comments`, {
          text: newComment,
          userId,
          commentId: editingCommentId,
        })
        .then((response) => {
          const updatedComments = comments.map((comment) =>
            comment._id === editingCommentId ? response.data : comment
          );
          setComments(updatedComments);
          setEditingCommentId(null);
          setNewComment("");
        })
        .catch((error) =>
          console.error("Error updating existing comment:", error)
        );
    } else {
      // Creating a new comment
      axios
        .post(`${API_URL}/api/comments`, { text: newComment, userId })
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch((error) => console.error("Error creating new comment:", error));
    }
  };

  const handleCommentEdit = (commentId) => {
    // Set the comment to edit and populate the textarea with its content
    const commentToEdit = comments.find((comment) => comment._id === commentId);
    setEditingCommentId(commentId);
    setNewComment(commentToEdit.text);
  };

  return (
    <div>
      <textarea
        value={comments.map((comment) => comment.text).join("\n")}
        readOnly // Set to readOnly to prevent editing
      />
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>
        {editingCommentId ? "Update Comment" : "Post Comment"}
      </button>
      {editingCommentId && (
        <button onClick={() => setEditingCommentId(null)}>Cancel Edit</button>
      )}
      {/* Add buttons or UI to trigger editing of existing comments */}
      {comments.map((comment) => (
        <div key={comment._id}>
          {comment.text}{" "}
          <button onClick={() => handleCommentEdit(comment._id)}>
            Edit Comment
          </button>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
