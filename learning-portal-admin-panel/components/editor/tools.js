import Header from "@editorjs/header";
import List from "@editorjs/list";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from '@editorjs/image'
import Raw from "@editorjs/raw";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";
import { API_URL } from "../../config/constants";


// const ImageTool = window.Image;
export const tools = {
  header: {
    class: Header,
    inlineToolbar: ["link"],
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  embed: Embed,
  table: Table,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: {
    class: Image,
    inlineToolbar: true,
    config: {
      endpoints: {
        byFile: API_URL+'courses/upload_image.php', // Your backend file uploader endpoint
        // byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
      }
    }
  },
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
