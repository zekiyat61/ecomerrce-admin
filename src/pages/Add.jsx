import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Lipstic");

  const handleImageUpload = (file, setImage) => {
    if (file && file.progress == 100) {
      console.log(file.allEntries[0].cdnUrl);
      setImage(file.allEntries[0].cdnUrl);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        { name, description, price, category, image1, image2, image3, image4 },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label
            htmlFor="image1"
            className="border-spacing-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-200 w-40 flex items-center justify-center"
          >
            <FileUploaderRegular
              onChange={(file) => handleImageUpload(file, setImage1)}
              sourceList="local, camera, facebook, gdrive"
              cameraModes="photo, video"
              classNameUploader="uc-light"
              pubkey="68196083e86668defa3b"
            />

            {/* <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/> */}
          </label>
          <label
            htmlFor="image2"
            className="border-spacing-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-200 w-40 flex items-center justify-center"
          >
            <FileUploaderRegular
              onChange={(file) => handleImageUpload(file, setImage2)}
              sourceList="local, camera, facebook, gdrive"
              cameraModes="photo, video"
              classNameUploader="uc-light"
              pubkey="68196083e86668defa3b"
            />

            {/* <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/> */}
          </label>
          <label
            htmlFor="image3"
            className="border-spacing-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-200 w-40 flex items-center justify-center"
          >
            <FileUploaderRegular
              onChange={(file) => handleImageUpload(file, setImage3)}
              sourceList="local, camera, facebook, gdrive"
              cameraModes="photo, video"
              classNameUploader="uc-light"
              pubkey="68196083e86668defa3b"
            />

            {/* <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/> */}
          </label>
          <label
            htmlFor="image4"
            className="border-spacing-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-200 w-40 flex items-center justify-center"
          >
            <FileUploaderRegular
              onChange={(file) => handleImageUpload(file, setImage4)}
              sourceList="local, camera, facebook, gdrive"
              cameraModes="photo, video"
              classNameUploader="uc-light"
              pubkey="68196083e86668defa3b"
            />

            {/* <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/> */}
          </label>
        </div>
        <div className="flex gap-2">
          {image1 && (
            <img
              src={image1}
              alt="Game preview"
              className="mt-2 rounded-md h-40 w-40 object-cover"
            />
          )}
          {image2 && (
            <img
              src={image2}
              alt="Game preview"
              className="mt-2 rounded-md h-40 w-40 object-cover"
            />
          )}
          {image3 && (
            <img
              src={image3}
              alt="Game preview"
              className="mt-2 rounded-md h-40 w-40 object-cover"
            />
          )}
          {image4 && (
            <img
              src={image4}
              alt="Game preview"
              className="mt-2 rounded-md h-40 w-40 object-cover"
            />
          )}
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value=" Lipstic"> Lipstic</option>
            <option value="Foundation">Foundation</option>
            <option value="Powder">Powder</option>
            <option value="Mascara">Mascara</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="Number"
            placeholder="25"
          />
        </div>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-pink-500 text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
