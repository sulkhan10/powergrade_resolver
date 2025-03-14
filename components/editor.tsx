"use client"; // Ensures this component runs on the client side
import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // Quill's default styles
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

// Dynamically import ReactQuill to avoid SSR errors
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const Editor = ({ onChange, value }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [editorValue, setEditorValue] = useState(value);
  const [file, setFile] = useState<any>(null);

  const quillRef = useRef(null); // Create a ref to access the Quill instance
  const inputRef = useRef(null); // Ref for the file input

  const handleChange = (content) => {
    setEditorValue(content);
    onChange(content);
  };

  const handleImageUpload = async (file) => {
    if (!file) {
      console.warn("No file provided to handleImageUpload");
      return;
    }
    const formData = new FormData();
    formData.append("files", file.files);
    console.log("files", file);
    // // Verify FormData contents
    // console.log('FormData contents: image');
    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.status !== 200) {
        console.error("Image upload failed with status:", res.status);
        return;
      }

      const imageUrl = res.data.url;
      const quill = quillRef.current?.getEditor(); // Access the Quill instance
      if (quill) {
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", imageUrl); // Insert the image at the current cursor position
      } else {
        console.error("Quill editor not available");
      }
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };
  const handleFileChange = async (e: any) => {
    const selectedFile = e.target.files[0];

    console.log(e.target.files, "e.target.files");
    console.log(selectedFile, "selectedFile");

    const formData = new FormData();
    formData.append("file", selectedFile);

    // Inspect FormData contents
    console.log("FormData contents:");
    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      console.log("FormData contents:", formData);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Parse the JSON response
        const responseData = await response.json();

        // Access the data from the server
        console.log("Image uploaded successfully", responseData);
      } else {
        console.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  // const handleFileChange = async (event) => {
  //   console.log('File change event triggered');
  //   const file = event.target.files;
  //   if (file) {
  //     console.log('File selected: file', file);
  //     console.log('File selected: file.files' , file.files);
  //     await handleImageUpload(file);
  //   } else {
  //     console.warn('No file selected');
  //   }
  // };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleFileChange,
      },
    },
  };

  // Handle clicking the image upload button and triggering the file input
  const handleImageButtonClick = () => {
    inputRef.current && inputRef.current.click();
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", file);

    console.log(formData, "formdata");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Parse the JSON response
        const responseData = await response.json();

        // Access the data from the server
        console.log("Image uploaded successfully", responseData);
      } else {
        console.error("Error uploading image");
      }
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };
  return (
    <div>
      <ReactQuill
        ref={quillRef} // Attach the ref to the ReactQuill component
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={["bold", "italic", "underline", "link"]}
      />

      {/* Image upload button   */}
      {/* <button onClick={handleImageButtonClick}>Upload Image</button>   */}

      {/* Hidden input field for image upload */}
      {/* <input  
        ref={inputRef}  
        type="file"  
        accept="image/*"  
        multiple={true}
        style={{ display: 'none' }} // Hide the input field from view  
        onChange={handleFileChange}  
      />   */}

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Editor;
