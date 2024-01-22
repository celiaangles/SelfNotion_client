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

//   // Concatenate existing comments and the new comment with line breaks
//   const allComments =
//     comments.map((comment) => comment.text).join("\n") + "\n" + newComment;

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
      .get(`${API_URL}/api/comments?userId=${userId}`)
      .then((response) => {
        const fetchedComments = response.data || [];
        setComments(fetchedComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [userId]);

  const handleCommentSubmit = () => {
    // Check if there are existing comments
    const lastComment =
      comments.length > 0 ? comments[comments.length - 1] : null;

    // Submit the new comment or update the last comment to the server
    axios
      .post(`${API_URL}/api/comments`, {
        text: newComment,
        userId,
        commentId: lastComment ? lastComment._id : null,
      })
      .then((response) => {
        const updatedComments = [...comments];

        // If the comment was updated, replace the last comment
        if (lastComment) {
          updatedComments[updatedComments.length - 1] = response.data;
        } else {
          updatedComments.push(response.data);
        }

        setComments(updatedComments);
        setNewComment("");
      })
      .catch((error) =>
        console.error("Error posting/updating comment:", error)
      );
  };

  // Concatenate existing comments with line breaks
  const allComments = comments.map((comment) => comment.text).join("\n");

  return (
    <div>
      <textarea
        value={allComments}
        readOnly // Set to readOnly to prevent editing
      />
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>Post</button>
    </div>
  );
};

export default CommentSection;
