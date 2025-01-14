"use client";

import { UploadDropzone } from "@/app/utils/UploadthingComponents";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Atom } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { SubmitButton } from "../SubmitButtons";
import TailwindEditor from "../EditorWrapper";
import { useActionState, useState } from "react";
import { JSONContent } from "novel";
import { CreatePostAction, EditPostActions } from "@/app/action";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema } from "@/app/utils/zodSchemas";
import slugify from "react-slugify";

interface iAppProps {
  data: {
    title: string;
    slug: string;
    smallDescription: string;
    articleContent: any;
    id: string;
    image: string;
  };
  siteId: string;
}
export default function EditArticleForm({ data, siteId }: iAppProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(
    data.articleContent
  );
  const [title, setTitle] = useState<string | undefined>(data.title);
  const [slug, setSlugValue] = useState<string | undefined>(data.slug);
  const [lastResult, action] = useActionState(EditPostActions, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: PostSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  function handleSlugGeneration() {
    const titleInput = title;
    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error("Please create a title first");
    }
    setSlugValue(slugify(titleInput));
    return toast.success("Slug has been Created");
  }
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle> Article Details</CardTitle>
        <CardDescription>
          First Upload Your Image then Proceed With Others
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-6"
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
        >
          <Input type="hidden" name="siteId" value={siteId} />
          <Input type="hidden" name="articleId" value={data.id} />
          <div className="grid gap-2">
            <Label>Title</Label>
            <Input
              placeholder="Nextjs Blogging Application"
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <p className="text-red-500 text-sm">{fields.title.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Slug</Label>
            <Input
              placeholder="Article Slug"
              key={fields.slug.key}
              name={fields.slug.name}
              defaultValue={fields.slug.initialValue}
              onChange={(e) => setSlugValue(e.target.value)}
              value={slug}
            />
            <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            <Button
              onClick={handleSlugGeneration}
              className="w-fit"
              variant={"secondary"}
              type="button"
            >
              <Atom className="size-4 mr-2" />
              Generate Slug
            </Button>
          </div>
          <div className="grid gap-2">
            <Label>Small Description</Label>
            <Textarea
              placeholder="Small Description for your blog article..."
              className="h-32 text-start "
              key={fields.smallDescription.key}
              name={fields.smallDescription.name}
              defaultValue={data.smallDescription}
            />

            <p className="text-red-500 text-sm">
              {fields.smallDescription.errors}
            </p>
          </div>
          <div className="grid gap-2">
            <Label>Cover Image</Label>
            <Input
              type="hidden"
              name={fields.coverImage.name}
              key={fields.coverImage.key}
              defaultValue={fields.coverImage.initialValue}
              value={imageUrl}
            />
            {imageUrl ? (
              <Image
                src={imageUrl}
                width={200}
                height={200}
                alt="Uploaded Image"
                className="object-cover w-[200px] h-[200px] rounded-lg"
              />
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].url);
                  toast.success("Image has Been Uploaded");
                }}
                onUploadError={() => {
                  toast.error("Something went Wrong");
                }}
                endpoint="imageUploader"
              />
            )}
            <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
          </div>
          <div className="grid gap-2">
            <Label>Article Content</Label>
            <Input
              type="hidden"
              name={fields.articleContent.name}
              key={fields.articleContent.key}
              defaultValue={fields.articleContent.initialValue}
              value={JSON.stringify(value)}
            />
            <TailwindEditor onChange={setValue} initialValue={value} />
            <p className="text-red-500 text-sm">
              {fields.articleContent.errors}
            </p>
          </div>
          <SubmitButton text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
}
