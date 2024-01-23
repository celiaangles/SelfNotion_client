import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
const API_URL = "http://localhost:5005";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState(() => {
    // Retrieve notification from localStorage on component mount
    return localStorage.getItem("birthdayNotification") || null;
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState({
    bio: "",
    location: "",
    birthday: "", // Add the new field

    // Add more fields as needed
  });

  // Retrieve profile picture URL and additional info from local storage on component mount
  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("profilePicture");
    const storedAdditionalInfo = JSON.parse(
      localStorage.getItem("additionalInfo")
    );

    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }

    if (storedAdditionalInfo) {
      setAdditionalInfo(storedAdditionalInfo);
    }
  }, []);

  const { user } = useContext(AuthContext);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdditionalInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleUpload = () => {
    // Check if a photo is already uploaded before attempting to upload another
    if (!profilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", selectedFile);
      const storedToken = localStorage.getItem("authToken");

      axios
        .post(`${API_URL}/auth/upload-profile-picture`, formData, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data);
          // Save the profile picture URL in local storage
          localStorage.setItem(
            "profilePicture",
            response.data.user.profilePicture
          );
          setProfilePicture(response.data.user.profilePicture);
        })
        .catch((error) => {
          console.error("Error uploading profile picture:", error);
        });
    }
  };

  const handleInfoUpdate = () => {
    // Update additional user information
    const storedToken = localStorage.getItem("authToken");

    axios
      .put(
        `${API_URL}/auth/update-user-info`,
        { bio: additionalInfo.bio, location: additionalInfo.location },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // Save the additional user information in local storage
        localStorage.setItem("additionalInfo", JSON.stringify(additionalInfo));
        setAdditionalInfo({ bio: "", location: "" });
        // Exit edit mode
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
      });
  };

  const handleChangeProfilePicture = () => {
    // Allow the user to change the profile picture
    setProfilePicture(null);
  };

  useEffect(() => {
    // Check if birthday month matches current month
    const currentDate = new Date();
    const birthdayDate = additionalInfo.birthday
      ? new Date(additionalInfo.birthday)
      : null;

    if (
      birthdayDate &&
      currentDate.getMonth() === birthdayDate.getMonth() &&
      currentDate.getDate() === birthdayDate.getDate()
    ) {
      setNotification(`Happy Birthday, ${user.name}! 🎉`);
    } else {
      setNotification(null);
    }
  }, [additionalInfo.birthday, user.name]);

  return (
    <div>
      <h1>{user && `${user.name}'s session`}</h1>
      {notification && <div>{notification}</div>}
      {profilePicture && (
        <div>
          <img src={`/uploads/${profilePicture}`} alt="Profile" />
          <button onClick={handleChangeProfilePicture}>
            Change Profile Picture
          </button>
        </div>
      )}
      {!profilePicture && (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload Profile Picture</button>
        </div>
      )}
      <hr />
      <form>
        <label>Bio:</label>
        {editMode ? (
          <textarea
            name="bio"
            value={additionalInfo.bio}
            onChange={handleInputChange}
          ></textarea>
        ) : (
          <div>{additionalInfo.bio}</div>
        )}
        <hr />
        <label>Location:</label>
        {editMode ? (
          <input
            type="text"
            name="location"
            value={additionalInfo.location}
            onChange={handleInputChange}
          />
        ) : (
          <div>{additionalInfo.location}</div>
        )}
        <hr />
        {/* New input field for birthday date */}
        <label>Birthday:</label>
        {editMode ? (
          <input
            type="date"
            name="birthday"
            value={additionalInfo.birthday}
            onChange={handleInputChange}
          />
        ) : (
          <div>{additionalInfo.birthday}</div>
        )}
        <hr />
        {editMode && (
          <button type="button" onClick={handleInfoUpdate}>
            Update Information
          </button>
        )}

        <button type="button" onClick={() => setEditMode(!editMode)}>
          {editMode ? "Cancel Edit" : "Edit Information"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
