import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


function Home() {

  const [menu, setMenu] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null); // Modal State
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const res = await axios.get("https://paris-backend-1q8j.onrender.com/api/menuItems");
      setMenu(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= FILTER LOGIC =================

  const filtered = menu
    .filter(item =>
      filter === "All" || item.category === filter
    )
    .filter(item =>
      (item.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="p-6 ">
      

      <Navbar />
      

      {/* ================= SEARCH BAR ================= */}

      <div className="flex  justify-center   mb-4 mt-6">

        <div
        
          className={`relative transition-all duration-500 ${
            searchFocus ? "w-full md:w-1/2" : "w-64"
          }`}
        >

         
<div className="relative w-full">

  {/* Icon */}
  <FontAwesomeIcon
    icon={faSearch}
    className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
      searchFocus ? "text-black scale-110" : "text-gray-400"
    }`}
  />

  {/* Input */}
  <input
    type="text"
    placeholder="Search delicious food..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onFocus={() => setSearchFocus(true)}
    onBlur={() => setSearchFocus(false)}
    className="w-full border rounded-full py-3 pl-12 pr-4 shadow-md
               focus:outline-none focus:ring-2 focus:ring-black"
  />

</div>

        </div>
     
              </div>

   {/* ================= CATEGORY FILTER ================= */}
<div className="mb-6 px-4  flex justify-center">

  <div className="relative w-48 max-w-xs">

    {/* Centered Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-40 py-3 rounded-full bg-black text-white shadow-md justify-center"
    >
      {filter} ▼
    </button>

    {/* Dropdown */}
    {isOpen && (
      <div className="absolute left-0 right-0 mt-2 bg-white shadow-xl rounded-xl max-h-48 overflow-y-auto z-50">
        {["All","Soups(veg)","Soups","Starters(veg)","Starters","Starters(egg)","Bread","Rotti&Nan","Veg gravy","Gravy","Rice items","Fried rice","BBQ","Noodles","Tandoori items","Shawarma","Fresh juice","Pure juice","Lemonade/soda","Shakes","Special shake","Mojitos","Lassi","Icecream shake","Falooda","Avil milk","Icecream scoops","Freach fries","Burger","Sandwich"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            {cat}
          </button>
        ))}
      </div>
    )}

  </div>

</div>
 

      {/* ================= MENU GRID ================= */}

<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-6 ">
        {filtered.map(item=>(
          <div
 key={item._id}
 className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transition "
>

<img
 src={
   item.image
   ? `https://paris-backend-1q8j.onrender.com${item.image}`
   : "https://via.placeholder.com/300"
 }
 className="w-full w-full h-40 sm:h-40 md:h-48 object-cover object-cover overflow-hidden text-clip"
/>

<div className="p-1 flex flex-col flex-grow w-full h-24 sm:h-32 md:h-32 ">

<h2 className="font-bold text-md">
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

<p className="font-bold mt-1">
 ${item.price}
</p>

</div>
</div>
        ))}

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
      
        <Footer/>

    </div>
  );
}

export default Home;