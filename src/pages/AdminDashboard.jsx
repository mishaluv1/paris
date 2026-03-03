import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function AdminDashboard() {

  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Main");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // Modal State
const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // 🔐 Protect Route
  useEffect(() => {
    if (localStorage.getItem("admin") !== "true") {
      navigate("/admin");
    }
    loadMenu();
  }, []);

  // ================= LOAD MENU =================
  const loadMenu = async () => {
    try {
      const res = await axios.get("https://paris-backend-1q8j.onrender.com/api/menuItems");
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {

    if (!name || !price || !description || !category || (!image && !editId)) {
      alert("Please fill all fields including image");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);

    if (image) {
      formData.append("image", image);
    }

    try {
      if (editId) {
        await axios.put(
          `https://paris-backend-1q8j.onrender.com/api/menuItems/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "https://paris-backend-1q8j.onrender.com/api/menuItems",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      clearForm();
      loadMenu();

    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const editItem = (item) => {
    setEditId(item._id);
    setName(item.name);
    setPrice(item.price);
    setDescription(item.description);
    setCategory(item.category);
    setImage(null);
  };

  // ================= DELETE =================
  const deleteItem = async (id) => {
    await axios.delete(`https://paris-backend-1q8j.onrender.com/api/menuItems/${id}`);
    loadMenu();
  };

  // ================= CLEAR FORM =================
  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setCategory("Main");
    setImage(null);
    setEditId(null);
  };

  const logout = () => {
    localStorage.removeItem("admin");
    navigate("/admin");
  };

  return (
    <div className="px-4 sm:px-8 py-6 max-w-7xl mx-auto">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

        <h1 className="text-2xl font-bold text-center sm:text-left">
          Admin Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto"
        >
          Logout
        </button>

      </div>

      {/* ================= FORM ================= */}
      <div className="bg-gray-100 p-4 sm:p-6 rounded-xl mb-10 space-y-4">

        <input
          placeholder="Food Name"
          className="border p-3 w-full rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-3 w-full rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-3 w-full rounded resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

       <div className="relative w-full">
  
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="w-full border p-3 rounded text-left bg-white"
  >
    {category}
  </button>

  {isOpen && (
    <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-lg max-h-48 overflow-y-auto">
      
      {[
        "Soups(veg)", "Soups", "Starters(veg)", "Starters",
        "BBQ", "Noodles", "Tandoori items", "Shawarma",
        "Fresh juice", "Pure juice", "Lemonade/soda",
        "Shakes", "Special shake", "Mojitos",
        "Lassi", "Icecream shake", "Falooda",
        "Avil milk", "Icecream scoops", "Freach fries",
        "Burger", "Sandwich"
      ].map((cat) => (
        <div
          key={cat}
          onClick={() => {
            setCategory(cat);
            setIsOpen(false);
          }}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        >
          {cat}
        </div>
      ))}

    </div>
  )}

</div>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-black text-white py-2 rounded"
          >
            {editId ? "Update Item" : "Add Item"}
          </button>

          {editId && (
            <button
              onClick={clearForm}
              className="flex-1 bg-gray-500 text-white py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>

      </div>

      {/* ================= SEARCH ================= */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full sm:w-1/2">

          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-full py-3 pl-12 pr-4 shadow-md
                       focus:outline-none focus:ring-2 focus:ring-black"
          />

        </div>
      </div>
{/* ================= MODAL ================= */}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50">

          <div className="bg-white p-6 rounded-xl max-w-lg w-full">

            <h2 className="text-2xl font-bold mb-3">
              {selectedItem.name}
            </h2>

            <img
              src={`https://paris-backend-1q8j.onrender.com${selectedItem.image}`}
              className="w-full h-56 object-cover rounded mb-4"
            />

           <p className="text-gray-500 text-xs sm:text-sm break-words whitespace-normal mb-1">
  {selectedItem.description}
</p>
            <div className="flex justify-end">
              <button
                onClick={()=>setSelectedItem(null)}
                className="bg-black text-white px-5 py-2 rounded"
              >
                Close
              </button>
            </div>

          </div>

        </div>
      )}
      {/* ================= GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {menu
          .filter((item) =>
            item.name?.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (

            <div
              key={item._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col"
            >

              <img
  src={
    item.image
      ? `https://paris-backend-1q8j.onrender.com${item.image}`
      : "https://via.placeholder.com/300"
  }
  className="w-full h-40 object-cover"
/>

              <div className="p-3 flex flex-col flex-grow">

                <h2 className="font-bold text-base truncate">
                  {item.name}
                </h2>

               <p className="text-gray-500 text-sm  overflow-hidden text-clip break-words whitespace-pre-line">
 {item.description?.slice(0,10)}...
</p>

<button
 onClick={()=>setSelectedItem(item)}
 className="text-blue-500 text-sm mt-1  self-start overflow-hidden text-ellipsis"
>
 Read more
</button>
                <p className="font-bold mt-2">
                  ${item.price}
                </p>

                <p className="text-xs text-gray-400 mb-2">
                  {item.category}
                </p>

                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => editItem(item)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteItem(item._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </div>

              </div>

            </div>

        ))}

      </div>

    </div>
  );
}

export default AdminDashboard;