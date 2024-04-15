import Navbar from "@/components/Navbar";
import { authenticateJWT, updateProfile } from "@/redux/action/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilePage = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("example@example.com");
  const [profileImage, setProfileImage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(authenticateJWT());
    if (!user && !loading) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
      setProfileImage(user.profileImage);
    }
  }, []);

  const saveProfile = () => {
    dispatch(updateProfile({ username, email }));
    setEditMode(false);
  };

  const editProfile = () => {
    setEditMode(true);
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    dispatch(updateProfile(imageFile));
  };

  const handleClickImage = () => {
    document.getElementById("profileImage").click();
  };

  const handleImageClick = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      {loading ? (
        <>Loading..</>
      ) : (
        <div className="bg-gray-100 min-h-screen">
          <Navbar />
          <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <label className="block cursor-pointer">
                  {/* <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : "/profile-placeholder.png"
                }
                alt="Profile"
                onClick={handleClickImage}
              /> */}

                  <img
                    className="w-24 h-24 rounded-full mx-auto mb-4 cursor-pointer"
                    src={`${user?.avatar?.url}`}
                  ></img>

                  <input
                    type="file"
                    id="profileImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                <h2 className="text-xl font-semibold">{username}</h2>
                <p className="text-gray-600">{email}</p>
              </div>

              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Username
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!editMode}
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!editMode}
                  />
                </div>
                <div className="flex items-center justify-between">
                  {editMode ? (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={saveProfile}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={editProfile}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </form>
              <p className="text-center text-gray-500 text-xs mt-4">
                &copy;2024 Acme Corp. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
