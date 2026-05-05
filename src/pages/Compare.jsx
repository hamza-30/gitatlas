import React, { useEffect, useState } from "react";
import UsernameInput from "../components/UsernameInput";
import { MdCompareArrows } from "react-icons/md";
import ProfileCard from "../components/ProfileCard";

function Compare() {
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");
  const [user1Profile, setUser1Profile] = useState(null);
  const [user2Profile, setUser2Profile] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(false)

  function onCompareClick() {
    if (user1 && user2) {
      async function getUsersProfile() {
        try {
          setFetchError(false);
          setUser1Profile(null);
          setUser2Profile(null);

          const [user1ProfileResult, user2ProfileResult] = await Promise.all([
            fetch(`https://api.github.com/users/${user1}`),
            fetch(`https://api.github.com/users/${user2}`),
          ]);

          if (!user1ProfileResult.ok || !user2ProfileResult.ok) {
            throw new Error("Failed to fetch users data.");
          }

          let user1ProfileData = await user1ProfileResult.json();
          let user2ProfileData = await user2ProfileResult.json();

          setUser1Profile(user1ProfileData);
          setUser2Profile(user2ProfileData);
        } catch (error) {
          setFetchError(true);
          console.log(error);
        }
      }

      getUsersProfile();
    }
  }

  return (
    <div
      className={`w-full min-h-[calc(100vh-100px)] px-4 md:px-9 lg:px-20 flex flex-col items-center justify-center`}
    >
      <div className={`w-full md:w-160 lg:w-176`}>
        <h1 className={`text-[1.27rem] sm:text-[1.5rem] text-center mb-6`}>
          Compare profiles of two Github users.
        </h1>

        <div
          className={`bg-white rounded-xl p-5 border border-gray-200 flex flex-col items-center gap-y-5 mb-8`}
        >
          <div
            className={`w-full flex flex-col md:flex-row gap-y-1 md:gap-x-4 items-center`}
          >
            <UsernameInput
              title={"USER 1"}
              username={user1}
              setUsername={setUser1}
            />
            <div
              className={`py-2 px-2.5 bg-black text-white rounded-lg mt-4.5`}
            >
              VS
            </div>
            <UsernameInput
              title={"USER 2"}
              username={user2}
              setUsername={setUser2}
            />
          </div>

          <button
            className={`bg-black text-white w-fit px-4 py-1.5 flex items-center justify-center gap-x-1 active:scale-95 transition-transform ease-out duration-150 rounded-sm`}
            onClick={onCompareClick}
          >
            <MdCompareArrows className={`text-[1.3rem]`} />
            <p className={`text-[0.88rem]`}>Compare</p>
          </button>
        </div>
      </div>

      <div
        className={`w-full h-fit flex flex-col md:flex-row gap-y-2.5 gap-x-2`}
      >
        {user1Profile && (
          <ProfileCard
            imgSource={user1Profile.avatar_url}
            name={user1Profile.name}
            username={user1Profile.login}
            followers={user1Profile.followers}
            following={user1Profile.following}
            joinedDate={user1Profile.created_at}
            location={user1Profile.location}
            office={user1Profile.company}
          />
        )}
        <div className={`self-stretch w-1 bg-gray-200`}></div>
        {user2Profile && (
          <ProfileCard
            imgSource={user2Profile.avatar_url}
            name={user2Profile.name}
            username={user2Profile.login}
            followers={user2Profile.followers}
            following={user2Profile.following}
            joinedDate={user2Profile.created_at}
            location={user2Profile.location}
            office={user2Profile.company}
          />
        )}
      </div>
    </div>
  );
}

export default Compare;
