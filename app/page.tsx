"use client";

import {LinkIcon} from "@heroicons/react/24/solid";
import {usePostUrlMutation} from "@/utils/use-fetch";
import {FormEventHandler} from "react";

export default function Page() {
  const postUrl = usePostUrlMutation();
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const url = event.target.url.value;
    const response = await postUrl.trigger({url});
    console.log(`The new id is`, response.id);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(postUrl.data?.url)
  };

  return (
    <div className="h-screen w-screen bg-zinc-100 grid place-items-center">
      <div className="bg-white w-full max-w-sm rounded-xl p-5 flex flex-col items-center space-y-5">
        <div
          className=" bg-purple-600 bg-gradient-to-br from-[#5885e0] to-[#EC7951] via-[#CF4D9E] p-3 rounded-3xl mt-6">
          <LinkIcon className="h-14 w-14 text-white"/>
        </div>
        <h1 className="text-xl mb-10 font-semibold">Make a Short Link</h1>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="url"
            id="url"
            name="url"
            required
            className="w-full border rounded-lg border-gray-200 leading-[2.75rem] indent-4"
            value="https://instagram.com/jvmusin"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 mt-4 bg-gradient-to-r from-blue-500 to-fuchsia-500 h-12 font-bold text-white rounded-lg hover:text-opacity-70"
          >
            Shorten it
          </button>
        </form>
        <div
          onClick={handleCopy}
          className="group bg-zinc-50 w-full border border-dashed border-zinc-300 hover:border-zinc-400 hover:bg-zinc-100 hover:cursor-pointer rounded-lg flex flex-col items-center"
        >
          <p className="mt-10">
            {postUrl.isMutating
              ? "Loading..."
              : postUrl.data?.url ?? "Shortened link will be here"}
          </p>
          <p className="text-sm text-gray-400 mt-6 mb-6 group-hover:underline">
            Click to copy
          </p>
        </div>
      </div>
    </div>
  );
}
