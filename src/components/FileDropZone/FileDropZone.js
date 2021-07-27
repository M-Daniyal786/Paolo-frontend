import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useDropzone } from "react-dropzone";
import { uploadAdded, uploadEnded, uploadStarted } from "../../store/uploads";
import { bytesToSize } from "../../utils/utilityFunctions";

const FileDropZone = () => {
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    let totalSizeInBytes = 0;
    dispatch(uploadStarted());
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      totalSizeInBytes += file.size;
      reader.readAsDataURL(file);
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        dispatch(
          uploadAdded({
            path: file.path,
            name: file.name,
            url: reader.result,
            selected: false,
          })
        );
      };
    });
    console.log(bytesToSize(totalSizeInBytes), "Total Size");
    dispatch(uploadEnded());
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

export default FileDropZone;
