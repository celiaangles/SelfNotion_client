// // CommentSection.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const API_URL = "http://localhost:5005";

// const CommentSection = ({ userId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     // Fetch comments for the specific user
//     axios
//       .get(`/api/comments?userId=${userId}`)
//       .then((response) => {
//         const fetchedComments = response.data.comments || [];
//         setComments(fetchedComments);
//       })
//       .catch((error) => console.error("Error fetching comments:", error));
//   }, [userId]);

//   const handleCommentSubmit = () => {
//     // Submit the new comment to the server
//     axios
//       .post(`${API_URL}/api/comments`, { text: newComment, userId })
//       .then((response) => {
//         setComments([...comments, response.data]);
//         setNewComment("");
//       })
//       .catch((error) => console.error("Error posting comment:", error));
//   };

//   // Concatenate comments with line breaks
//   const allComments = comments.map((comment) => comment.text).join("\n");

//   return (
//     <div>
//       <h2>Comments</h2>
//       <textarea
//         value={allComments}
//         readOnly // Set to readOnly to prevent editing
//       />
//       <textarea
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//       />
//       <button onClick={handleCommentSubmit}>Post Comment</button>
//     </div>
//   );
// };

// export default CommentSection;

// CommentSection.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

const CommentSection = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch comments for the specific user
    axios
      .get(`/api/comments?userId=${userId}`)
      .then((response) => {
        const fetchedComments = response.data.comments || [];
        setComments(fetchedComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [userId]);

  const handleCommentSubmit = () => {
    // Submit the new comment to the server
    axios
      .post(`${API_URL}/api/comments`, { text: newComment, userId })
      .then((response) => {
        setComments([...comments, response.data]);
        setNewComment("");
      })
      .catch((error) => console.error("Error posting comment:", error));
  };

  // Concatenate existing comments and the new comment with line breaks
  const allComments =
    comments.map((comment) => comment.text).join("\n") + "\n" + newComment;

  return (
    <div>
      <h2>Comments</h2>
      <textarea
        value={allComments}
        readOnly // Set to readOnly to prevent editing
      />
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>Post Comment</button>
    </div>
  );
};

export default CommentSection;
