import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../assets/search-icon.png";
import editIcon from "../assets/edit-icon.png";
import viewIcon from "../assets/view-icon.png";
import deleteIcon from "../assets/delete-icon.png";
import copyIcon from "../assets/copy-icon.png";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { fetchPastes, removeFromPastes } from "../redux/pasteSlice";

const Paste = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const pastes = useSelector((state) => state.paste.pastes);
  const pasteLoading = useSelector((state) => state.paste.status === 'loading');

  useEffect(() => {
    dispatch(fetchPastes()); // Fetch pastes from MongoDB when component mounts
  }, [dispatch]);

  const highlightMatch = (text, term) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, "gi");
    return text.replace(regex, "<mark>$1</mark>");
  };

  const filteredData = pastes
    .map((paste) => {
      const matchTitle = paste.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchContent = paste.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (matchTitle || matchContent) {
        return {
          ...paste,
          highlightedTitle: highlightMatch(paste.title, searchTerm),
          highlightedContent: highlightMatch(paste.content, searchTerm),
          matchedContent: matchContent ? paste.content.match(new RegExp(`.{0,20}${searchTerm}.{0,20}`, "i"))?.[0] || paste.content : ""
        };
      }
      return null;
    })
    .filter(Boolean)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted successfully!");
  }

  return (
    <div className="relative w-[60vw]">
      <br />
      <img
        className="w-6 mt-3 absolute left-3 top-0.85"
        src={searchIcon}
        alt="Search Icon"
      />
      <input
        className="p-3 pl-12 rounded-3xl w-full"
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        disabled={pasteLoading}
      />
      <div className="flex flex-col mt-7 gap-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border border-gray-600 p-4 rounded-3xl shadow-xl"
            >
              <div className="flex flex-col sm:flex-row justify-between">
                <div
                  className="text-2xl font-bold text-lg mb-2"
                  dangerouslySetInnerHTML={{ __html: paste.highlightedTitle }}
                ></div>
                <div className="flex gap-4 justify-evenly mt-2 sm:mt-0">
                  <button className="p-2 rounded-full hover:bg-gray-700" title="Edit">
                    <NavLink to={`/?pasteId=${paste?._id}`}>
                      <img className="h-6 w-6" src={editIcon} alt="Edit" />
                    </NavLink>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-700" title="View">
                    <NavLink to={`/pastes/${paste?._id}`}>
                      <img className="h-6 w-6" src={viewIcon} alt="View" />
                    </NavLink>
                  </button>
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
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="p-2 rounded-full hover:bg-gray-700"
                    title="Delete"
                  >
                    <img className="h-6 w-6" src={deleteIcon} alt="Delete" />
                  </button>
                </div>
              </div>
              <br />
              <div
                className="text-gray-400 mb-4 text-left overflow-hidden text-ellipsis"
                dangerouslySetInnerHTML={{ __html: highlightMatch(paste.matchedContent, searchTerm) }}
              ></div>
              <div className="mt-4 text-gray-400 text-left flex place-content-between">
                <div>{new Date(paste.createdAt).toLocaleDateString("en-IN")}</div>
                <div>
                  {new Date(paste.createdAt).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No Saved Pastes</div>
        )}
      </div>
    </div>
  );
};

export default Paste;
