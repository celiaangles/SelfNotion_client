import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

const CommentSection = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/comments?userId=${userId}`)
      .then((response) => {
        const fetchedComments = response.data || [];
        setComments(fetchedComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, [userId]);

  const handlePostComment = () => {
    if (comments.length === 0) {
      axios
        .post(`${API_URL}/api/comments`, { text: newComment, userId })
        .then((response) => {
          setComments([response.data]);
          setNewComment("");
        })
        .catch((error) => console.error("Error creating new comment:", error));
    } else {
      console.log("Cannot create a new comment. Existing comment found.");
    }
  };

  const handleUpdateComment = () => {
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
  };

  const handleCommentEdit = (commentId) => {
    const commentToEdit = comments.find((comment) => comment._id === commentId);
    setEditingCommentId(commentId);
    setNewComment(commentToEdit.text);
  };

  return (
    <div>
      {comments.length > 0 && !editingCommentId && (
        <div>
          {/* <div>{comments[0].text}</div> */}
          {/* <button onClick={() => handleCommentEdit(comments[0]._id)}>
            Edit Comment
          </button> */}
        </div>
      )}

      <textarea
        value={
          editingCommentId
            ? newComment
            : comments.length > 0
            ? comments[0].text
            : newComment
        }
        onChange={(e) => setNewComment(e.target.value)}
      />

      {comments.length === 0 && (
        <button onClick={handlePostComment}>Post Comment</button>
      )}
      {editingCommentId && (
        <button onClick={handleUpdateComment}>Update Comment</button>
      )}
      {editingCommentId && (
        <button onClick={() => setEditingCommentId(null)}>Cancel Edit</button>
      )}
      {comments.map((comment) => (
        <div key={comment._id}>
          {comment._id !== editingCommentId && (
            <button onClick={() => handleCommentEdit(comment._id)}>
              Edit Comment
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

//   return (
//     <div>
//       <textarea
//         value={newComment}
//         onChange={(e) => setNewComment(e.target.value)}
//       />

//       {comments.length === 0 && (
//         <button onClick={handlePostComment}>Post Comment</button>
//       )}
//       {editingCommentId && (
//         <button onClick={handleUpdateComment}>Update Comment</button>
//       )}
//       {editingCommentId && (
//         <button onClick={() => setEditingCommentId(null)}>Cancel Edit</button>
//       )}
//       {comments.map((comment) => (
//         <div key={comment._id}>
//           {/* {comment.text}{" "} */}
//           <button onClick={() => handleCommentEdit(comment._id)}>
//             Edit Comment
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

export default CommentSection;
