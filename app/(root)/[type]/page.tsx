import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/files.actions";
import { getFileTypesParams } from "@/lib/utils";
import { Section } from "lucide-react";
import { Models } from "node-appwrite";
import React from "react";

const Page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await params)?.query as string) || "";
  const sort = ((await params)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const files = await getFiles({ types,searchText,sort });
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>

      {/* Render the files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
            // <h1 key={file.$id}>{file.name}</h1>
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;
