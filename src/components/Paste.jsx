import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../assets/search-icon.png";
import editIcon from "../assets/edit-icon.png";
import viewIcon from "../assets/view-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import copyIcon from "../assets/copy-icon.png";
import shareIcon from "../assets/share-icon.png";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div className="relative min-w-[50vw] max-w-[50vw]">
      <br />
      <img
        className="w-6 mt-3 absolute left-3"
        src={searchIcon}
        alt="Search Icon"
      />
      <input
        className="p-3 pl-12 rounded-3xl w-full"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col mt-7 gap-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="border border-gray-400 p-4 rounded-3xl shadow-xl"
              >
                <div className="flex justify-between">
                  <div className="text-2xl font-bold text-lg mb-2">{paste.title.length > 12 ? paste.title.slice(0,12)+'..' : paste.title}</div>

                  <div className="flex gap-4 justify-evenly">
                    {/* Edit Button */}
                    <button
                      className="p-2 rounded-full hover:bg-gray-700"
                      title="Edit"
                    >
                      <NavLink to={`/?pasteId=${paste?._id}`}>
                        <img className="h-6 w-6" src={editIcon} alt="Edit" />
                      </NavLink>
                    </button>
                    {/* View Button */}
                    <button
                      className="p-2 rounded-full hover:bg-gray-700"
                      title="View"
                    >
                      <NavLink to={`/pastes/${paste?._id}`}>
                        <img className="h-6 w-6" src={viewIcon} alt="View" />
                      </NavLink>
                    </button>
                    {/* Copy Button */}
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to clipboard!");
                      }}
                      className="p-2 rounded-full hover:bg-gray-700"
                      title="Copy"
                    >
                      <img className="h-6 w-6" src={copyIcon} alt="Copy" />
                    </button>
                    {/* Share Button */}
                    <button
                      onClick={() => {
                        if(navigator.share){
                          navigator.share({url:window.location.href});
                        } else {
                          toast.error("Unable to Share")
                        }
                      }}
                      className="p-2 rounded-full hover:bg-gray-700"
                      title="Share"
                    >
                      <img className="h-6 w-6" src={shareIcon} alt="Share" />
                    </button>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="p-2 rounded-full hover:bg-gray-700"
                      title="Delete"
                    >
                      <img className="h-6 w-6" src={deleteIcon} alt="Delete" />
                    </button>
                  </div>
                </div>

                <div className="text-gray-400 mb-4 text-left overflow-hidden text-ellipsis">
                  {paste.content.length > 0
                    ? paste.content.length > 28
                      ? paste.content.slice(0, 28) + "..."
                      : paste.content
                    : "No content"}
                </div>

                <div className="mt-4 text-gray-400 text-left flex place-content-between">
                  <div>
                    {new Date(paste.createdAt).toLocaleString().slice(0, 10)}
                  </div>
                  <div>
                    {new Date(paste.createdAt).toLocaleString().slice(11)}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-gray-400">No Saved Pastes</div>
        )}
      </div>
    </div>
  );
};

export default Paste;
