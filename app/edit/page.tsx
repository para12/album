import EditProvider from "../context/EditContext";
import Delete from "./delete";
import TextareaAndTag from "./textareaAndTag";
import ImageUpload from "./imageUpload";
import UploadButton from "./uploadButton";

export default function Edit() {
  return (
    <div className="container mx-auto">
      <EditProvider>
        <ImageUpload />
        <TextareaAndTag />
        <UploadButton />
        <Delete />
      </EditProvider>
    </div>
  );
}
